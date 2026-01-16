import React, { useState, useEffect } from 'react';
import { 
  MdAccountBalance,
  MdCheckCircle,
  MdAccessTime,
  MdCancel,
  MdWarning
} from 'react-icons/md';
import './Withdraw.css';
import {
  getCurrentUser,
  getUserWallet,
  getUserMT5Accounts,
  createWithdrawal,
  getUserWithdrawals
} from '../../lib/supabase/helpers';
import { api } from '../../services/api';

export default function Withdraw() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank_transfer');
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: ''
  });
  const [upiDetails, setUpiDetails] = useState({
    upiId: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [mt5Accounts, setMt5Accounts] = useState([]);
  const [selectedMt5Login, setSelectedMt5Login] = useState('');
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
  const [withdrawHistory, setWithdrawHistory] = useState([]);

  const [accountInfo, setAccountInfo] = useState({
    walletBalance: 0,
    mt5Balance: 0,
    freeMargin: 0,
    openPositions: 0,
    canWithdraw: true
  });

  const minWithdrawal = 1000;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const user = await getCurrentUser();
      if (!user) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }

      setCurrentUser(user);

      // Get wallet data
      const wallet = await getUserWallet(user.user.id);
      setWalletData(wallet);

      // Get MT5 accounts
      const accounts = await getUserMT5Accounts(user.user.id);
      setMt5Accounts(accounts || []);
      
      if (accounts && accounts.length > 0) {
        setSelectedMt5Login(accounts[0].login_id);
        
        // Calculate account info from first MT5 account
        const mt5Account = accounts[0];
         const usermt5Account = accounts[0];
                  console.log('💡 Found existing MT5 account:', usermt5Account);
                  
                  const mt5Result = await api.getAccount(usermt5Account.login_id);
                  
                  if (mt5Result.success && mt5Result.data) {
                    // Merge database account with live MT5 data
                    setAccountInfo({
                      mt5Balance: parseFloat(mt5Result.data.balance || 0),
                      freeMargin: parseFloat(mt5Result.data.margin_free || 0),
                        walletBalance: parseFloat(wallet?.available_balance || 0),
          openPositions: 0, // Will be calculated from positions table
          canWithdraw: parseFloat(mt5Account.free_margin || 0) > 0
                    });
                    console.log('✅ MT5 account data loaded:', mt5Result);
                  } else {
                    console.warn('⚠️ MT5 API returned no data, using database values');
                  }
        
      } else {
        setAccountInfo({
          walletBalance: parseFloat(wallet?.available_balance || 0),
          mt5Balance: 0,
          freeMargin: 0,
          openPositions: 0,
          canWithdraw: true
        });
      }

      // Get withdrawal history
      const withdrawals = await getUserWithdrawals(user.user.id);
      setWithdrawHistory(withdrawals || []);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const maxWithdrawal = Math.min(
    accountInfo.walletBalance, 
    accountInfo.freeMargin > 0 ? accountInfo.freeMargin : accountInfo.walletBalance
  );

  const handleAccountChange = async (e) => {
    const index = parseInt(e.target.value);
    setSelectedAccountIndex(index);
    setLoading(true);
    const selectedAccount = mt5Accounts[index];

    if (selectedAccount) {
      try {
        console.log('📊 Fetching data for account:', selectedAccount.login_id);
        const mt5Result = await api.getAccount(selectedAccount.login_id);

        if (mt5Result.success && mt5Result.data) {
          setAccountInfo({
            walletBalance: parseFloat(walletData?.available_balance || 0),
            mt5Balance: parseFloat(mt5Result.data.balance || 0),
            freeMargin: parseFloat(mt5Result.data.margin_free || 0),
            openPositions: 0,
            canWithdraw: parseFloat(mt5Result.data.margin_free || 0) > 0
          });
          console.log('✅ MT5 account data loaded:', mt5Result);
        } else {
          setAccountInfo({
            walletBalance: parseFloat(walletData?.available_balance || 0),
            mt5Balance: parseFloat(selectedAccount.balance || 0),
            freeMargin: parseFloat(selectedAccount.free_margin || 0),
            openPositions: 0,
            canWithdraw: true
          });
        }

        // Fetch positions for this account
        const positions = await api.getPositions(selectedAccount.login_id);
        console.log('✅ Fetched MT5 positions:', positions);
        setAccountInfo((prev) => ({
          ...prev,
          openPositions: positions.success && positions.data ? positions.data.total_positions : 0
        }));
        setSelectedMt5Login(selectedAccount.login_id);
      } catch (error) {
        console.error('❌ Failed to fetch account data:', error);
        setAccountInfo({
          walletBalance: parseFloat(walletData?.available_balance || 0),
          mt5Balance: parseFloat(selectedAccount.balance || 0),
          freeMargin: parseFloat(selectedAccount.free_margin || 0),
          openPositions: 0,
          canWithdraw: true
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please login first');
      return;
    }

    const withdrawAmount = parseFloat(amount);

    // Validations
    if (withdrawAmount < minWithdrawal) {
      alert(`Minimum withdrawal amount is ₹${minWithdrawal.toLocaleString()}`);
      return;
    }

    if (withdrawAmount > maxWithdrawal) {
      alert(`Maximum withdrawal amount is ₹${maxWithdrawal.toLocaleString()} (based on your available balance)`);
      return;
    }

    // Validate details based on method
    if (method === 'bank_transfer') {
      if (!bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName) {
        alert('Please fill all bank details');
        return;
      }
    } else if (method === 'upi') {
      if (!upiDetails.upiId) {
        alert('Please enter UPI ID');
        return;
      }
    }

    setSubmitting(true);

    try {
      const result = await createWithdrawal({
        userId: currentUser.user.id,
        amount: withdrawAmount,
        mt5Login: selectedMt5Login || null,
        withdrawalMethod: method,
        accountHolderName: method === 'bank_transfer' ? bankDetails.accountName : null,
        accountNumber: method === 'bank_transfer' ? bankDetails.accountNumber : null,
        ifscCode: method === 'bank_transfer' ? bankDetails.ifscCode : null,
        bankName: method === 'bank_transfer' ? bankDetails.bankName : null,
        upiId: method === 'upi' ? upiDetails.upiId : null
      });

      if (result.success) {
        alert('Withdrawal request submitted successfully! We will process it within 24-48 hours.');
        
        // Refresh data
        await fetchData();
        
        // Reset form
        setAmount('');
        setBankDetails({
          accountName: '',
          accountNumber: '',
          ifscCode: '',
          bankName: ''
        });
        setUpiDetails({ upiId: '' });
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      alert('Failed to submit withdrawal request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved':
        return <MdCheckCircle size={20} style={{ color: '#10b981' }} />;
      case 'pending':
        return <MdAccessTime size={20} style={{ color: '#f59e0b' }} />;
      case 'rejected':
        return <MdCancel size={20} style={{ color: '#ef4444' }} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="withdraw-container">
        <div className="loading" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '18px'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="withdraw-container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2>Please login to request withdrawal</h2>
          <button 
            onClick={() => window.location.href = '/login'}
            style={{
              padding: '10px 20px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="withdraw-container">
      <div className="withdraw-header">
        <div>
          <h1>Withdraw Funds</h1>
          <p>Request withdrawal from your account</p>
        </div>
      </div>

      <div className="withdraw-content">
        {/* Withdraw Form */}
        <div className="withdraw-form-section">
          {/* Account Balance Card */}
          <div className="balance-card">
            <h3>Available Balance</h3>
            <div className="balance-grid">
              <div className="balance-item">
                <span className="balance-label">Wallet Balance</span>
                <span className="balance-value">₹{accountInfo.walletBalance.toLocaleString()}</span>
              </div>
              <div className="balance-item">
                <span className="balance-label">MT5 Balance</span>
                <span className="balance-value">₹{accountInfo.mt5Balance?.toLocaleString()}</span>
              </div>
              <div className="balance-item">
                <span className="balance-label">Free Margin</span>
                <span className="balance-value">{parseFloat(accountInfo.freeMargin || 0) < 0 ? '-' : ''}₹{Math.abs(parseFloat(accountInfo.freeMargin || 0)).toFixed(1)}</span>
              </div>
              <div className="balance-item">
                <span className="balance-label">Open Positions</span>
                <span className="balance-value">{accountInfo.openPositions}</span>
              </div>
            </div>
            <div className="max-withdraw">
              <MdWarning size={18} />
              <span>Maximum withdrawable: ₹{maxWithdrawal.toLocaleString()}</span>
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="form-card">
            <h2>Request Withdrawal</h2>
            
            <form onSubmit={handleSubmit}>
              {/* MT5 Account Selection */}
              {mt5Accounts.length > 0 && (
                <div className="form-group">
                  <label>MT5 Account</label>
                  <select
                    value={selectedAccountIndex}
                    onChange={handleAccountChange}
                    required
                  >
                    {mt5Accounts.map((account, index) => (
                      <option key={account.id} value={index}>
                        {account.login_id} - Balance: ₹{parseFloat(account.balance || 0).toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Amount */}
              <div className="form-group">
                <label>Withdrawal Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Enter amount (Min: ₹${minWithdrawal.toLocaleString()})`}
                  min={minWithdrawal}
                  max={maxWithdrawal}
                  required
                />
                <small>Minimum: ₹{minWithdrawal.toLocaleString()} | Maximum: ₹{maxWithdrawal.toLocaleString()}</small>
              </div>

              {/* Withdrawal Method */}
              <div className="form-group">
                <label>Withdrawal Method</label>
                <select 
                  value={method} 
                  onChange={(e) => setMethod(e.target.value)}
                  required
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="upi">UPI</option>
                </select>
              </div>

              {/* Bank Transfer Details */}
              {method === 'bank_transfer' && (
                <div className="payment-details-section">
                  <h3>Bank Account Details</h3>
                  
                  <div className="form-group">
                    <label>Account Holder Name</label>
                    <input
                      type="text"
                      value={bankDetails.accountName}
                      onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                      placeholder="Enter account holder name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Account Number</label>
                    <input
                      type="text"
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                      placeholder="Enter account number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>IFSC Code</label>
                    <input
                      type="text"
                      value={bankDetails.ifscCode}
                      onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})}
                      placeholder="Enter IFSC code"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Bank Name</label>
                    <input
                      type="text"
                      value={bankDetails.bankName}
                      onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                      placeholder="Enter bank name"
                      required
                    />
                  </div>
                </div>
              )}

              {/* UPI Details */}
              {method === 'upi' && (
                <div className="payment-details-section">
                  <h3>UPI Details</h3>
                  
                  <div className="form-group">
                    <label>UPI ID</label>
                    <input
                      type="text"
                      value={upiDetails.upiId}
                      onChange={(e) => setUpiDetails({upiId: e.target.value})}
                      placeholder="username@bank"
                      required
                    />
                    <small>Enter your UPI ID (e.g., yourname@paytm)</small>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={submitting || !accountInfo.canWithdraw}
              >
                {submitting ? 'Processing...' : 'Submit Withdrawal Request'}
              </button>
            </form>

            <div className="info-note">
              <p>⚠️ <strong>Important:</strong> Withdrawals are processed within 24-48 hours on business days. Ensure your bank details are correct to avoid delays.</p>
            </div>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="withdraw-history-section">
          <div className="history-card">
            <h2>Withdrawal History</h2>
            
            {withdrawHistory.length === 0 ? (
              <div className="no-history">
                <p>No withdrawal history yet</p>
              </div>
            ) : (
              <div className="history-list">
                {withdrawHistory.map((withdrawal) => (
                  <div key={withdrawal.id} className="history-item">
                    <div className="history-icon">
                      {getStatusIcon(withdrawal.status)}
                    </div>
                    <div className="history-details">
                      <div className="history-amount">₹{parseFloat(withdrawal.amount).toLocaleString()}</div>
                      <div className="history-method">{withdrawal.withdrawal_method.replace('_', ' ').toUpperCase()}</div>
                      <div className="history-date">{new Date(withdrawal.created_at).toLocaleDateString()}</div>
                      {withdrawal.account_number && (
                        <div className="history-account">A/C: ***{withdrawal.account_number.slice(-4)}</div>
                      )}
                      {withdrawal.upi_id && (
                        <div className="history-account">UPI: {withdrawal.upi_id}</div>
                      )}
                    </div>
                    <div className="history-status">
                      <span className={`status-badge status-${withdrawal.status.toLowerCase()}`}>
                        {withdrawal.status.toUpperCase()}
                      </span>
                      {withdrawal.status === 'rejected' && withdrawal.rejection_reason && (
                        <small className="rejection-reason">{withdrawal.rejection_reason}</small>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Info */}
          <div className="quick-info-card">
            <h3>💡 Withdrawal Info</h3>
            <ul>
              <li>Min withdrawal: ₹{minWithdrawal.toLocaleString()}</li>
              <li>Processing: 24-48 hours</li>
              <li>No withdrawal fees</li>
              <li>Close positions for max withdrawal</li>
            </ul>
          </div>

          {/* Warning Card */}
          {accountInfo.openPositions > 0 && (
            <div className="warning-card">
              <MdWarning size={24} />
              <div>
                <h4>Open Positions Detected</h4>
                <p>You have {accountInfo.openPositions} open position(s). Close them to withdraw your full balance.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}