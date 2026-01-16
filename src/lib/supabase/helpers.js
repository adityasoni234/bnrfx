import { supabase } from './client'
import { supabaseAdmin } from './admin'

// Get site URL from environment or use default
const SITE_URL = process.env.REACT_APP_SITE_URL || 'bnrfx.com'

// ============================================
// AUTHENTICATION
// ============================================

export async function registerUser({ email, password, firstName, lastName, phone, referralCode , reffered_by }) {
  try {
    console.log('🚀 Starting registration for:', email)
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          role: 'client'
        },
        emailRedirectTo: `${SITE_URL}/login`
      }
    })

    if (authError) {
      console.error('❌ Auth signup error:', authError)
      throw authError
    }

    if (!authData.user) {
      throw new Error('No user data returned from signup')
    }

    console.log('✅ Auth user created:', authData.user.id)

    await new Promise(resolve => setTimeout(resolve, 1000))

    const { data: profileResult, error: profileError } = await supabase.rpc('create_user_profile', {
      p_user_id: authData.user.id,
      p_email: email,
      p_first_name: firstName,
      p_last_name: lastName,
      p_phone: phone
    })

    if (profileError) {
      console.error('❌ Profile creation error:', profileError)
      throw new Error(`Profile creation failed: ${profileError.message}`)
    }

    console.log('✅ Profile and wallet created successfully!')

    // Update profile with referred_by if provided
    if (reffered_by) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ referred_by: reffered_by })
        .eq('id', authData.user.id)

      if (updateError) {
        console.error('⚠️ Warning: Failed to update referred_by:', updateError)
        // Don't throw error, just log warning
      } else {
        console.log('✅ Referral link updated successfully!')
      }
    }

    console.log('🎉 Registration completed!')

    return { 
      success: true, 
      user: authData.user, 
      profile: profileResult 
    }

  } catch (error) {
    console.error('💥 Registration failed:', error)
    return { 
      success: false, 
      error: error.message || 'Registration failed. Please try again.'
    }
  }
}

export async function loginUser({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    return { success: true, user: data.user, profile, session: data.session }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: error.message }
  }
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Logout error:', error)
  return !error
}

export async function getCurrentUser() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return null

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    return { user: session.user, profile }
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/reset-password`
  })
  return !error
}

// ============================================
// PROFILE MANAGEMENT
// ============================================

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateUserProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

// ============================================
// KYC MANAGEMENT
// ============================================

export async function uploadKYCDocument({ userId, documentType, file, documentNumber }) {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${documentType}-${Date.now()}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('kyc-documents')
      .upload(fileName, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('kyc-documents')
      .getPublicUrl(fileName)

    const { data, error } = await supabase
      .from('kyc_documents')
      .insert([
        {
          user_id: userId,
          document_type: documentType,
          document_number: documentNumber,
          document_url: publicUrl,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) throw error

    return { success: true, document: data }
  } catch (error) {
    console.error('KYC upload error:', error)
    return { success: false, error: error.message }
  }
}

export async function getUserKYCDocuments(userId) {
  const { data, error } = await supabase
    .from('kyc_documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateKYCStatus(documentId, status, rejectionReason = null, verifiedBy) {
  const { data, error } = await supabase
    .from('kyc_documents')
    .update({
      status,
      rejection_reason: rejectionReason,
      verified_by: verifiedBy,
      verified_at: new Date().toISOString()
    })
    .eq('id', documentId)
    .select()
    .single()

  if (error) throw error
  return data
}

// ============================================
// WALLET MANAGEMENT
// ============================================

export async function getUserWallet(userId) {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Get wallet error:', error)
    return null
  }
}

export async function updateWalletBalance(userId, amount, type = 'add') {
  try {
    console.log(`💳 [START] Updating wallet balance for user ${userId}: ${type} ${amount}`)
    
    // Get wallet
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (walletError) {
      console.error('❌ [ERROR] Wallet fetch failed:', walletError)
      throw walletError
    }

    if (!wallet) {
      console.error('❌ [ERROR] Wallet not found for user:', userId)
      throw new Error('Wallet not found')
    }

    console.log('📊 [DATA] Current wallet:', wallet)

    const currentAvailable = parseFloat(wallet.available_balance || 0)
    const currentLocked = parseFloat(wallet.locked_balance || 0)
    const amountNum = parseFloat(amount)

    const newAvailable = type === 'add' 
      ? currentAvailable + amountNum
      : currentAvailable - amountNum

    console.log('💰 [CALC] Balance calculation:', {
      currentAvailable,
      currentLocked,
      amountNum,
      newAvailable,
      type
    })

    // Update wallet - only update available_balance, let total_balance auto-calculate
    const { data: updatedWallet, error: updateError } = await supabase
      .from('wallets')
      .update({
        available_balance: newAvailable,
        last_transaction_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single()

    if (updateError) {
      console.error('❌ [ERROR] Wallet update failed:', updateError)
      throw updateError
    }

    console.log('✅ [SUCCESS] Wallet updated:', updatedWallet)
    return updatedWallet
  } catch (error) {
    console.error('💥 [FATAL] Update wallet balance error:', error)
    console.error('Error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    })
    throw error
  }
}

// ============================================
// PAYMENT SETTINGS (BROKER)
// ============================================

export async function getPaymentSettings() {
  try {
    const { data, error } = await supabase
      .from('broker_payment_settings')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching payment settings:', error);
      return {
        upi: { enabled: false },
        bank: { enabled: false },
        usdt: { enabled: false },
        hawala: { enabled: false }
      };
    }

    return data?.settings || {
      upi: { enabled: false },
      bank: { enabled: false },
      usdt: { enabled: false },
      hawala: { enabled: false }
    };
  } catch (error) {
    console.error('Get payment settings error:', error);
    return {
      upi: { enabled: false },
      bank: { enabled: false },
      usdt: { enabled: false },
      hawala: { enabled: false }
    };
  }
}

export async function updatePaymentSettings(settings) {
  try {
    const { data, error } = await supabase
      .from('broker_payment_settings')
      .upsert({
        id: 1,
        settings: settings,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Update payment settings error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// DEPOSITS
// ============================================

export async function createDeposit({ 
  userId, 
  amount, 
  paymentMethod, 
  mt5Login, 
  utrNumber, 
  proofFile,
  hawalaData 
}) {
  try {
    let proofUrl = null;

    if (proofFile) {
      const fileExt = proofFile.name.split('.').pop();
      const fileName = `${userId}/deposit-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, proofFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(fileName);

      proofUrl = publicUrl;
    }

    // Prepare deposit data
    const depositData = {
      user_id: userId,
      mt5_login: mt5Login,
      amount,
      payment_method: paymentMethod,
      utr_number: utrNumber,
      payment_proof_url: proofUrl,
      status: 'pending'
    };

    // Add hawala data if applicable
    if (paymentMethod === 'hawala' && hawalaData) {
      depositData.hawala_from_city = hawalaData.fromCity;
      depositData.hawala_to_city = hawalaData.toCity;
      depositData.hawala_company = hawalaData.company;
      depositData.hawala_secret_number = hawalaData.secretNumber;
    }

    const { data, error } = await supabase
      .from('deposits')
      .insert([depositData])
      .select()
      .single();

    if (error) throw error;

    return { success: true, deposit: data };
  } catch (error) {
    console.error('Deposit creation error:', error);
    return { success: false, error: error.message };
  }
}

export async function getUserDeposits(userId) {
  try {
    const { data, error } = await supabase
      .from('deposits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Get deposits error:', error)
    return []
  }
}

export async function updateDepositStatus(depositId, status, processedBy, rejectionReason = null) {
  try {
    console.log('💰 [STEP 1] Starting deposit status update:', { depositId, status, processedBy })

    // First, update the deposit status
    const { data: deposit, error: depositError } = await supabase
      .from('deposits')
      .update({
        status,
        processed_by: processedBy,
        processed_at: new Date().toISOString(),
        rejection_reason: rejectionReason
      })
      .eq('id', depositId)
      .select()
      .single()

    if (depositError) {
      console.error('❌ [ERROR] Deposit update failed:', depositError)
      throw depositError
    }

    console.log('✅ [STEP 1 COMPLETE] Deposit updated:', deposit)

    // If approved, credit the wallet and create transaction
    if (status === 'approved') {
      console.log('💳 [STEP 2] Starting wallet update for user:', deposit.user_id)
      
      // STEP 2A: Update wallet balance
      try {
        const { data: currentWallet, error: walletFetchError } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', deposit.user_id)
          .single()

        if (walletFetchError) {
          console.error('❌ [ERROR] Failed to fetch wallet:', walletFetchError)
          throw walletFetchError
        }

        console.log('📊 [DATA] Current wallet:', currentWallet)

        const newBalance = parseFloat(currentWallet.available_balance || 0) + parseFloat(deposit.amount)

        console.log('💰 [CALC] New balance:', {
          current: currentWallet.available_balance,
          deposit: deposit.amount,
          new: newBalance
        })

        const { data: updatedWallet, error: walletUpdateError } = await supabase
          .from('wallets')
          .update({
            available_balance: newBalance,
            last_transaction_at: new Date().toISOString()
          })
          .eq('user_id', deposit.user_id)
          .select()
          .single()

        if (walletUpdateError) {
          console.error('❌ [ERROR] Wallet update failed:', walletUpdateError)
          throw walletUpdateError
        }

        console.log('✅ [STEP 2 COMPLETE] Wallet updated:', updatedWallet)

      } catch (walletError) {
        console.error('❌ [FATAL] Wallet update failed:', walletError)
        throw walletError
      }

      // STEP 2B: Create transaction record
      try {
        const { data: wallet } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', deposit.user_id)
          .single()

        const balanceBefore = parseFloat(wallet.total_balance || 0) - parseFloat(deposit.amount)
        const balanceAfter = parseFloat(wallet.total_balance || 0)

        console.log('📝 [STEP 3] Creating transaction:', {
          userId: deposit.user_id,
          walletId: wallet.id,
          amount: deposit.amount,
          balanceBefore,
          balanceAfter
        })

        const { data: transaction, error: transactionError } = await supabase
          .from('transactions')
          .insert([
            {
              user_id: deposit.user_id,
              wallet_id: wallet.id,
              transaction_type: 'deposit',
              amount: parseFloat(deposit.amount),
              balance_before: balanceBefore,
              balance_after: balanceAfter,
              reference_id: depositId,
              description: `Deposit approved - ${deposit.payment_method}`,
              metadata: {}
            }
          ])
          .select()
          .single()

        if (transactionError) {
          console.error('❌ [ERROR] Transaction creation failed:', transactionError)
          console.error('Transaction error details:', {
            message: transactionError.message,
            details: transactionError.details,
            hint: transactionError.hint,
            code: transactionError.code
          })
          // Don't throw - wallet was already updated successfully
        } else {
          console.log('✅ [STEP 3 COMPLETE] Transaction created:', transaction)
        }

      } catch (transactionError) {
        console.error('❌ [FATAL] Transaction creation failed:', transactionError)
        // Don't throw - wallet was already updated successfully
      }
    }

    console.log('🎉 [SUCCESS] Deposit approval completed!')
    return deposit
  } catch (error) {
    console.error('💥 [FATAL] Update deposit status failed:', error)
    throw error
  }
}

// ============================================
// WITHDRAWALS
// ============================================

export async function createWithdrawal({ 
  userId, 
  amount, 
  mt5Login, 
  withdrawalMethod,
  accountHolderName,
  accountNumber,
  ifscCode,
  bankName,
  upiId
}) {
  try {
    const wallet = await getUserWallet(userId)
    if (!wallet || parseFloat(wallet.available_balance) < parseFloat(amount)) {
      return { success: false, error: 'Insufficient balance' }
    }

    const { data: mt5Account } = await supabase
      .from('mt5_accounts')
      .select('balance')
      .eq('login_id', mt5Login)
      .single()

    const { data, error } = await supabase
      .from('withdrawals')
      .insert([
        {
          user_id: userId,
          mt5_login: mt5Login,
          amount,
          mt5_balance: mt5Account?.balance || 0,
          withdrawal_method: withdrawalMethod,
          account_holder_name: accountHolderName,
          account_number: accountNumber,
          ifsc_code: ifscCode,
          bank_name: bankName,
          upi_id: upiId,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) throw error

    await supabase
      .from('wallets')
      .update({
        available_balance: parseFloat(wallet.available_balance) - parseFloat(amount),
        locked_balance: parseFloat(wallet.locked_balance || 0) + parseFloat(amount)
      })
      .eq('user_id', userId)

    return { success: true, withdrawal: data }
  } catch (error) {
    console.error('Withdrawal creation error:', error)
    return { success: false, error: error.message }
  }
}

export async function getUserWithdrawals(userId) {
  try {
    const { data, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Get withdrawals error:', error)
    return []
  }
}

export async function updateWithdrawalStatus(withdrawalId, status, processedBy, rejectionReason = null) {
  const { data: withdrawal, error } = await supabase
    .from('withdrawals')
    .update({
      status,
      processed_by: processedBy,
      processed_at: new Date().toISOString(),
      rejection_reason: rejectionReason
    })
    .eq('id', withdrawalId)
    .select()
    .single()

  if (error) throw error

  const wallet = await getUserWallet(withdrawal.user_id)

  if (status === 'approved') {
    await supabase
      .from('wallets')
      .update({
        locked_balance: parseFloat(wallet.locked_balance || 0) - parseFloat(withdrawal.amount),
        total_balance: parseFloat(wallet.total_balance) - parseFloat(withdrawal.amount)
      })
      .eq('user_id', withdrawal.user_id)

    await createTransaction({
      userId: withdrawal.user_id,
      transactionType: 'withdrawal',
      amount: withdrawal.amount,
      referenceId: withdrawalId,
      description: `Withdrawal processed - ${withdrawal.withdrawal_method}`
    })
  } else if (status === 'rejected') {
    await supabase
      .from('wallets')
      .update({
        available_balance: parseFloat(wallet.available_balance) + parseFloat(withdrawal.amount),
        locked_balance: parseFloat(wallet.locked_balance || 0) - parseFloat(withdrawal.amount)
      })
      .eq('user_id', withdrawal.user_id)
  }

  return withdrawal
}

// ============================================
// TRANSACTIONS
// ============================================

export async function createTransaction({ userId, transactionType, amount, referenceId, description, metadata = {} }) {
  try {
    console.log('📝 [START] Creating transaction:', { userId, transactionType, amount })
    
    // Get wallet first
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (walletError || !wallet) {
      console.error('❌ [ERROR] Wallet not found for transaction:', userId, walletError)
      throw new Error('Wallet not found for user')
    }

    console.log('📊 [DATA] Wallet for transaction:', wallet)

    // Calculate balances - use actual current balance
    const balanceBefore = parseFloat(wallet.total_balance || 0)
    const amountNum = parseFloat(amount)
    const balanceAfter = transactionType === 'deposit' 
      ? balanceBefore + amountNum
      : balanceBefore - amountNum

    console.log('💰 [CALC] Transaction amounts:', {
      balanceBefore,
      amountNum,
      balanceAfter,
      transactionType
    })

    // Insert transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          wallet_id: wallet.id,
          transaction_type: transactionType,
          amount: amountNum,
          balance_before: balanceBefore,
          balance_after: balanceAfter,
          reference_id: referenceId,
          description: description || `${transactionType} transaction`,
          metadata: metadata || {}
        }
      ])
      .select()
      .single()

    if (transactionError) {
      console.error('❌ [ERROR] Transaction insert failed:', transactionError)
      throw transactionError
    }

    console.log('✅ [SUCCESS] Transaction created:', transaction)
    return transaction
  } catch (error) {
    console.error('💥 [FATAL] Create transaction failed:', error)
    console.error('Error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    })
    throw error
  }
}

export async function getUserTransactions(userId, limit = 50) {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Get transactions error:', error)
    return []
  }
}

// ============================================
// MT5 ACCOUNTS
// ============================================

export async function createMT5Account(userId, accountGroup = 'LIVE PRO', leverage = 500) {
  try {
    const loginId = Math.floor(100000000 + Math.random() * 900000000).toString()
    const password = Math.random().toString(36).slice(-8)

    const { data, error } = await supabase
      .from('mt5_accounts')
      .insert([
        {
          user_id: userId,
          login_id: loginId,
          password: password,
          account_group: accountGroup,
          leverage,
          balance: 0,
          equity: 0,
          margin: 0,
          free_margin: 0,
          margin_level: 0,
          currency: 'USD'
        }
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Create MT5 account error:', error)
    return null
  }
}

export async function getUserMT5Accounts(userId) {
  try {
    const { data, error } = await supabase
      .from('mt5_accounts')
      .select('*')
      .eq('user_id', userId)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Get MT5 accounts error:', error)
    return []
  }
}

// ============================================
// SUPPORT TICKETS
// ============================================

export async function createSupportTicket({ userId, subject, category, priority = 'medium' }) {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .insert([
        {
          user_id: userId,
          subject,
          category,
          priority,
          status: 'open'
        }
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Create ticket error:', error)
    return null
  }
}

export async function addTicketMessage({ ticketId, userId, message, attachments = [] }) {
  try {
    const { data, error } = await supabase
      .from('ticket_messages')
      .insert([
        {
          ticket_id: ticketId,
          user_id: userId,
          message,
          attachments
        }
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Add ticket message error:', error)
    return null
  }
}

export async function getUserTickets(userId) {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*, ticket_messages(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Get tickets error:', error)
    return []
  }
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

export async function getAllClients(filters = {}) {
  try {
    let query = supabase
      .from('profiles')
      .select(`
        *,
        wallets(*),
        mt5_accounts(*)
      `)
      .eq('role', 'client')

    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    if (filters.kycStatus) {
      query = query.eq('kyc_status', filters.kycStatus)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Get all clients error:', error)
    return []
  }
}

export async function getDashboardStats() {
  try {
    const { count: totalClients } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'client')

    const { count: totalIBs } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .in('role', ['master', 'super_master'])

    const today = new Date().toISOString().split('T')[0]
    const { data: todayDeposits } = await supabase
      .from('deposits')
      .select('amount')
      .eq('status', 'approved')
      .gte('created_at', today)

    const todayDepositAmount = todayDeposits?.reduce((sum, d) => sum + parseFloat(d.amount), 0) || 0

    const { count: pendingKYC } = await supabase
      .from('kyc_documents')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    const { count: activeAccounts } = await supabase
      .from('mt5_accounts')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    return {
      totalClients: totalClients || 0,
      totalIBs: totalIBs || 0,
      todayDepositAmount,
      pendingKYC: pendingKYC || 0,
      activeAccounts: activeAccounts || 0
    }
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    return {
      totalClients: 0,
      totalIBs: 0,
      todayDepositAmount: 0,
      pendingKYC: 0,
      activeAccounts: 0
    }
  }
}

// ============================================
// BROKER ADMIN FUNCTIONS
// ============================================

export async function getAllClientsForBroker() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'client')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (data && data.length > 0) {
      const clientsWithData = await Promise.all(
        data.map(async (client) => {
          const { data: wallets } = await supabase
            .from('wallets')
            .select('*')
            .eq('user_id', client.id)

          const { data: mt5Accounts } = await supabase
            .from('mt5_accounts')
            .select('*')
            .eq('user_id', client.id)

          return {
            ...client,
            wallets: wallets || [],
            mt5_accounts: mt5Accounts || []
          }
        })
      )
      return clientsWithData
    }

    return data || []
  } catch (error) {
    console.error('Get all clients error:', error)
    return []
  }
}

export async function getAllDeposits() {
  try {
    console.log('🔍 Fetching all deposits...')
    
    const { data, error } = await supabase
      .from('deposits')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Supabase query error:', error)
      throw error
    }

    console.log('✅ Raw deposits data:', data)

    if (data && data.length > 0) {
      const depositsWithProfiles = await Promise.all(
        data.map(async (deposit) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, email')
            .eq('id', deposit.user_id)
            .single()

          return {
            ...deposit,
            profiles: profile || {
              first_name: 'Unknown',
              last_name: 'User',
              email: 'N/A'
            }
          }
        })
      )

      console.log('✅ Deposits with profiles:', depositsWithProfiles)
      return depositsWithProfiles
    }

    return data || []
  } catch (error) {
    console.error('💥 Get all deposits error:', error)
    console.error('Error details:', error.message)
    return []
  }
}

export async function getAllWithdrawals() {
  try {
    const { data, error } = await supabase
      .from('withdrawals')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (data && data.length > 0) {
      const withdrawalsWithProfiles = await Promise.all(
        data.map(async (withdrawal) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, email')
            .eq('id', withdrawal.user_id)
            .single()

          return {
            ...withdrawal,
            profiles: profile || {
              first_name: 'Unknown',
              last_name: 'User',
              email: 'N/A'
            }
          }
        })
      )
      return withdrawalsWithProfiles
    }

    return data || []
  } catch (error) {
    console.error('Get all withdrawals error:', error)
    return []
  }
}

export async function getAllKYCDocuments() {
  try {
    const { data, error } = await supabase
      .from('kyc_documents')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (data && data.length > 0) {
      const kycWithProfiles = await Promise.all(
        data.map(async (doc) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, email, phone')
            .eq('id', doc.user_id)
            .single()

          return {
            ...doc,
            profiles: profile || {
              first_name: 'Unknown',
              last_name: 'User',
              email: 'N/A',
              phone: 'N/A'
            }
          }
        })
      )
      return kycWithProfiles
    }

    return data || []
  } catch (error) {
    console.error('Get all KYC documents error:', error)
    return []
  }
}

export async function getAllIBs() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .in('role', ['master', 'super_master'])
      .order('created_at', { ascending: false })

    if (error) throw error

    if (data && data.length > 0) {
      const ibsWithWallets = await Promise.all(
        data.map(async (ib) => {
          const { data: wallets } = await supabase
            .from('wallets')
            .select('*')
            .eq('user_id', ib.id)

          return {
            ...ib,
            wallets: wallets || []
          }
        })
      )
      return ibsWithWallets
    }

    return data || []
  } catch (error) {
    console.error('Get all IBs error:', error)
    return []
  }
}

export async function getAllPayouts() {
  try {
    const { data, error } = await supabase
      .from('payouts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (data && data.length > 0) {
      const payoutsWithProfiles = await Promise.all(
        data.map(async (payout) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, email')
            .eq('id', payout.beneficiary_id)
            .single()

          return {
            ...payout,
            profiles: profile || {
              first_name: 'Unknown',
              last_name: 'User',
              email: 'N/A'
            }
          }
        })
      )
      return payoutsWithProfiles
    }

    return data || []
  } catch (error) {
    console.error('Get all payouts error:', error)
    return []
  }
}

export async function getAllRebates() {
  try {
    const { data, error } = await supabase
      .from('rebates')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (data && data.length > 0) {
      const rebatesWithProfiles = await Promise.all(
        data.map(async (rebate) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, email')
            .eq('id', rebate.user_id)
            .single()

          return {
            ...rebate,
            profiles: profile || {
              first_name: 'Unknown',
              last_name: 'User',
              email: 'N/A'
            }
          }
        })
      )
      return rebatesWithProfiles
    }

    return data || []
  } catch (error) {
    console.error('Get all rebates error:', error)
    return []
  }
}

export async function getAllSupportTickets() {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .order('created_at', { ascending: false})

    if (error) throw error

    if (data && data.length > 0) {
      const ticketsWithData = await Promise.all(
        data.map(async (ticket) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, email')
            .eq('id', ticket.user_id)
            .single()

          const { data: messages } = await supabase
            .from('ticket_messages')
            .select('*')
            .eq('ticket_id', ticket.id)
            .order('created_at', { ascending: true })

          return {
            ...ticket,
            profiles: profile || {
              first_name: 'Unknown',
              last_name: 'User',
              email: 'N/A'
            },
            ticket_messages: messages || []
          }
        })
      )
      return ticketsWithData
    }

    return data || []
  } catch (error) {
    console.error('Get all support tickets error:', error)
    return []
  }
}

export async function getAllWallets() {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) throw error

    if (data && data.length > 0) {
      const walletsWithProfiles = await Promise.all(
        data.map(async (wallet) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, email')
            .eq('id', wallet.user_id)
            .single()

          return {
            ...wallet,
            profiles: profile || {
              first_name: 'Unknown',
              last_name: 'User',
              email: 'N/A'
            }
          }
        })
      )
      return walletsWithProfiles
    }

    return data || []
  } catch (error) {
    console.error('Get all wallets error:', error)
    return []
  }
}

export async function updatePayoutStatus(payoutId, status, processedBy, utrNumber = null) {
  try {
    const { data, error } = await supabase
      .from('payouts')
      .update({
        status,
        processed_by: processedBy,
        processed_at: new Date().toISOString(),
        utr_number: utrNumber
      })
      .eq('id', payoutId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Update payout status error:', error)
    return null
  }
}

export async function updateRebateStatus(rebateId, status) {
  try {
    const { data, error } = await supabase
      .from('rebates')
      .update({
        status,
        approved_at: status === 'approved' ? new Date().toISOString() : null,
        paid_at: status === 'approved' ? new Date().toISOString() : null
      })
      .eq('id', rebateId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Update rebate status error:', error)
    return null
  }
}

export async function updateTicketStatus(ticketId, status) {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', ticketId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Update ticket status error:', error)
    return null
  }
}

export async function updateClientStatus(userId, status) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Update client status error:', error)
    return null
  }
}

// ============================================
// MANAGER FUNCTIONS (Separate managers table)
// ============================================

export async function getAllManagers(brokerId) {
  try {
    console.log('🔍 Fetching all managers for broker:', brokerId)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return null
    
    const { data, error } = await supabase
      .from('managers')
      .select('*')
      .eq('broker_id', session.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    console.log('✅ Managers fetched:', data)
    return data || []
  } catch (error) {
    console.error('Get managers error:', error)
    return []
  }
}

export async function getManagerById(managerId) {
  try {
    const { data, error } = await supabase
      .from('managers')
      .select('*')
      .eq('id', managerId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Get manager error:', error)
    return null
  }
}

export async function getManagerByProfileId(managerId) {
  try {
    const { data, error } = await supabase
      .from('managers')
      .select('*')
      .eq('user_id', managerId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Get manager error:', error)
    return null
  }
}

export async function createManager({ brokerId, name, email, mt5_server, mt5_manager_id, mt5_password, password }) {
  try {
    console.log('➕ Creating manager for broker:', brokerId)
    
    // Step 1: Create Supabase Auth account
    console.log('🔐 Creating auth account for manager:', email)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: name,
          role: 'manager'
        }
      }
    })

    if (authError) {
      console.error('❌ Auth creation error:', authError)
      throw authError
    }

    if (!authData.user) {
      throw new Error('No user data returned from signup')
    }

    console.log('✅ Auth user created:', authData.user.id)

    // Step 2: Create profile for manager
    await new Promise(resolve => setTimeout(resolve, 1000))
    const { data: profileResult, error: profileError } = await supabase.rpc('create_user_profile', {
      p_user_id: authData.user.id,
      p_email: email,
      p_first_name: name,
      p_last_name: '',
      p_phone: ''
    })

    if (profileError) {
      console.error('❌ Profile creation error:', profileError)
      throw new Error(`Profile creation failed: ${profileError.message}`)
    }

    console.log('✅ Manager profile created')

    // Step 3: Update profile role to 'manager'
    const { error: roleError } = await supabase
      .from('profiles')
      .update({ role: 'manager' })
      .eq('id', authData.user.id)

    if (roleError) {
      console.error('❌ Role update error:', roleError)
      throw roleError
    }

    // Step 4: Create manager record
    const { data: managerData, error: managerError } = await supabase
      .from('managers')
      .insert([
        {
          broker_id: brokerId,
          user_id: authData.user.id,
          name,
          email,
          mt5_server,
          mt5_manager_id,
          mt5_password,
          manager_status: 'active',
          mt5_last_connected_at: null
        }
      ])
      .select()
      .single()

    if (managerError) throw managerError
    console.log('✅ Manager created:', managerData)
    return { success: true, manager: managerData }
  } catch (error) {
    console.error('Create manager error:', error)
    return { success: false, error: error.message }
  }
}

export async function updateManagerMT5Credentials(managerId, { mt5_server, mt5_manager_id, mt5_password }) {
  try {
    console.log('✏️ Updating manager MT5 credentials:', managerId)
    
    const { data, error } = await supabase
      .from('managers')
      .update({
        mt5_server,
        mt5_manager_id,
        mt5_password,
        updated_at: new Date().toISOString()
      })
      .eq('id', managerId)
      .select()
      .single()

    if (error) throw error
    console.log('✅ Manager credentials updated:', data)
    return { success: true, manager: data }
  } catch (error) {
    console.error('Update manager credentials error:', error)
    return { success: false, error: error.message }
  }
}

export async function updateManagerStatus(managerId, status) {
  try {
    const { data, error } = await supabase
      .from('managers')
      .update({ 
        manager_status: status,
        mt5_last_connected_at: status === 'active' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', managerId)
      .select()
      .single()

    if (error) throw error
    return { success: true, manager: data }
  } catch (error) {
    console.error('Update manager status error:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteManager(managerId) {
  try {
    console.log('🗑️ Deleting manager:', managerId)
    
    const { error } = await supabase
      .from('managers')
      .delete()
      .eq('id', managerId)

    if (error) throw error
    console.log('✅ Manager deleted')
    return { success: true }
  } catch (error) {
    console.error('Delete manager error:', error)
    return { success: false, error: error.message }
  }
}

export async function testManagerConnection(managerId) {
  try {
    console.log('🔗 Testing manager connection:', managerId)
    
    const manager = await getManagerById(managerId)
    if (!manager) {
      return { success: false, error: 'Manager not found' }
    }

    // Simulate connection test (in real scenario, this would call MT5 bridge)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Update last connected time
    const { data, error } = await supabase
      .from('managers')
      .update({
        mt5_last_connected_at: new Date().toISOString()
      })
      .eq('id', managerId)
      .select()
      .single()

    if (error) throw error

    return { 
      success: true, 
      message: 'Connection successful',
      manager: data
    }
  } catch (error) {
    console.error('Test manager connection error:', error)
    return { success: false, error: error.message }
  }
}