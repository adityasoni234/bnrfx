const mt5Service = require('../../services/mt5Service');

// ============================================
// LIST ALL MT5 ACCOUNTS
// ============================================
exports.listAccounts = async (req, res) => {
  try {
    const result = await mt5Service.listUsers();
    
    return res.status(200).json({
      success: true,
      data: result.users || result,
      total: result.total || result.users?.length || 0
    });

  } catch (error) {
    console.error('List Accounts Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to list MT5 accounts',
      error: error.message
    });
  }
};

exports.sessionLogin = async (req, res) => {
  try {
    debugger
     const { mt5_server,mt5_manager,mt5_password } = req.body;
    const result = await mt5Service.sessionLogin(
       mt5_server,mt5_manager,mt5_password
    );
    
    return res.status(200).json({
      success: true,
      data: result.users || result,
      total: result.total || result.users?.length || 0
    });

  } catch (error) {
    console.error('List Accounts Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to list MT5 accounts',
      error: error.message
    });
  }
};

// ============================================
// CREATE MT5 TRADING ACCOUNT
// ============================================
exports.createMT5Account = async (req, res) => {
  try {
    const { name, email, phone, password, group, leverage, initialBalance } = req.body;
    
    // Validate input
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Create MT5 account using service
    const result = await mt5Service.createAccount({
      name,
      email,
      phone,
      password,
      group: group || 'Standard',
      leverage: leverage || 100,
      initialBalance: initialBalance || 0
    });

    return res.status(201).json({
      success: true,
      message: 'MT5 account created successfully',
      data: result
    });

  } catch (error) {
    console.error('Create MT5 Account Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create MT5 account',
      error: error.response?.data?.error || error.message
    });
  }
};

// ============================================
// GET ACCOUNT DETAILS
// ============================================
exports.getAccountDetails = async (req, res) => {
  try {
    const { login } = req.params;

    if (!login) {
      return res.status(400).json({
        success: false,
        message: 'MT5 login is required'
      });
    }
    console.log(`Fetching details for MT5 login: ${login}`);
    // Get account from service
    const result = await mt5Service.getAccountInfo(login);
    const response = { data: result };

    return res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Get Account Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch account details',
      error: error.response?.data?.error || error.message
    });
  }
};

// ============================================
// DEPOSIT FUNDS
// ============================================
exports.deposit = async (req, res) => {
  try {
    const { login, amount, comment } = req.body;
    console.log('Deposit Request:', { login, amount, comment });
    // Validate
    if (!login || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid login and amount are required'
      });
    }

    // TODO: Verify payment gateway transaction first
    // const paymentVerified = await verifyPayment(transactionId);
    // if (!paymentVerified) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Payment verification failed'
    //   });
    // }

    // Process deposit using service
    const result = await mt5Service.deposit(login, amount, comment);
    const response = { data: result };

    // TODO: Log transaction in your database
    // await Transaction.create({
    //   client_id: req.user.clientId,
    //   type: 'DEPOSIT',
    //   amount: amount,
    //   mt5_login: login,
    //   mt5_ticket: response.data.ticket,
    //   transaction_id: transactionId,
    //   status: 'COMPLETED'
    // });

    return res.status(200).json({
      success: true,
      message: 'Deposit successful',
      data: response.data
    });

  } catch (error) {
    console.error('Deposit Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Deposit failed',
      error: error.response?.data?.error || error.message
    });
  }
};

// ============================================
// WITHDRAW FUNDS
// ============================================
exports.withdraw = async (req, res) => {
  try {
    const { login, amount, comment } = req.body;
    console.log('Withdraw Request:', { login, amount, comment });
    // Validate
    if (!login || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid login and amount are required'
      });
    }

    // TODO: Check if client has withdrawal permission
    // TODO: Check if amount is within limits
    // TODO: Check if there are open positions

    // Process withdrawal using service
    const result = await mt5Service.withdraw(login, amount, comment);
    const response = { data: result };

    // TODO: Log transaction and initiate payout process
    // await Transaction.create({
    //   client_id: req.user.clientId,
    //   type: 'WITHDRAWAL',
    //   amount: amount,
    //   mt5_login: login,
    //   mt5_ticket: response.data.ticket,
    //   status: 'PENDING_PAYOUT'
    // });

    return res.status(200).json({
      success: true,
      message: 'Withdrawal initiated',
      data: response.data
    });

  } catch (error) {
    console.error('Withdrawal Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Withdrawal failed',
      error: error.response?.data?.error || error.message
    });
  }
};

// ============================================
// GET OPEN POSITIONS
// ============================================
exports.getPositions = async (req, res) => {
  try {
    console.log('📊 Get Positions Request received');

    let result;

      console.log('🔍 Fetching all open positions');
        result = await mt5Service.getOpenPositions();
    
    // Get all positions from service
   
    console.log('✅ Positions retrieved:', result?.length || 0);

    return res.status(200).json({
      success: true,
      data: {
        positions: result || [],
        total_positions: result?.length || 0
      }
    });

  } catch (error) {
    console.error('❌ Get Positions Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch positions',
      error: error.message
    });
  }
};

// ============================================
// GET POSITIONS BY LOGIN
// ============================================
exports.getPositionsByLogin = async (req, res) => {
  try {
    const { login } = req.params;

    if (!login) {
      return res.status(400).json({
        success: false,
        message: 'MT5 login is required'
      });
    }

    console.log(`📊 Fetching positions for MT5 login: ${login}`);
    const result = await mt5Service.getOpenPositions(parseInt(login));
    
    console.log('✅ Positions retrieved:', result?.length || 0);

    return res.status(200).json({
      success: true,
      login: parseInt(login),
      data: {
        positions: result || [],
        total_positions: result?.length || 0
      }
    });

  } catch (error) {
    console.error('❌ Get Positions By Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch positions',
      error: error.message
    });
  }
};


// ============================================
// GET TRADING HISTORY
// ============================================
exports.getHistory = async (req, res) => {
  try {
    const { login } = req.params;
    const { from_date, to_date } = req.query;

    if (!login) {
      return res.status(400).json({
        success: false,
        message: 'MT5 login is required'
      });
    }

    // Get history from service
    const result = await mt5Service.getHistory(
      login, 
      from_date || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      to_date || new Date().toISOString().split('T')[0]
    );
    const response = { data: result };

    return res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Get History Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch trading history',
      error: error.response?.data?.error || error.message
    });
  }
};

// ============================================
// GET ACCOUNT SUMMARY (Dashboard)
// ============================================
exports.getAccountSummary = async (req, res) => {
  try {
    const { login } = req.params;

    if (!login) {
      return res.status(400).json({
        success: false,
        message: 'MT5 login is required'
      });
    }

    // Get account summary from service
    const [accountResult, positionsResult] = await Promise.all([
      mt5Service.getAccountInfo(login),
      mt5Service.getPositions(login)
    ]);
    
    const accountResponse = { data: accountResult };
    const positionsResponse = { data: positionsResult };

    const summary = {
      account: accountResponse.data,
      positions: positionsResponse.data.positions || [],
      open_positions_count: positionsResponse.data.positions?.length || 0,
      total_profit: positionsResponse.data.positions?.reduce((sum, pos) => sum + pos.profit, 0) || 0
    };

    return res.status(200).json({
      success: true,
      data: summary
    });

  } catch (error) {
    console.error('Get Account Summary Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch account summary',
      error: error.response?.data?.error || error.message
    });
  }
};

// ============================================
// CHANGE LEVERAGE
// ============================================
exports.changeLeverage = async (req, res) => {
  try {
    const { login, leverage } = req.body;

    if (!login || !leverage) {
      return res.status(400).json({
        success: false,
        message: 'Login and leverage are required'
      });
    }

    // Validate leverage value
    const validLeverages = [50, 100, 200, 500, 1000];
    if (!validLeverages.includes(parseInt(leverage))) {
      return res.status(400).json({
        success: false,
        message: `Leverage must be one of: ${validLeverages.join(', ')}`
      });
    }

    // Mock leverage change
    const response = {
      data: {
        success: true,
        login: parseInt(login),
        leverage: parseInt(leverage),
        message: "Leverage changed successfully"
      }
    };

    return res.status(200).json({
      success: true,
      message: 'Leverage changed successfully',
      data: response.data
    });

  } catch (error) {
    console.error('Change Leverage Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to change leverage',
      error: error.response?.data?.error || error.message
    });
  }
};

// ============================================
// HEALTH CHECK
// ============================================
exports.healthCheck = async (req, res) => {
  try {
    // Check MT5 service health
    const result = await mt5Service.ping();
    
    return res.status(200).json({
      success: true,
      message: 'MT5 service is healthy',
      data: result
    });

  } catch (error) {
    return res.status(503).json({
      success: false,
      message: 'MT5 service is unavailable',
      error: error.message
    });
  }
};


// ============================================
// RISK MONITOR
// ============================================
exports.getRiskMonitor = async (req, res) => {
  try {
    const { login } = req.params;

    if (!login) {
      return res.status(400).json({
        success: false,
        message: 'MT5 login is required'
      });
    }

    const riskData = await mt5Service.getRiskMonitor(login);

    return res.status(200).json({
      success: true,
      data: riskData
    });

  } catch (error) {
    console.error('Risk Monitor Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get risk data',
      error: error.message
    });
  }
};

// ============================================
// GET IB HIERARCHY
// ============================================
exports.getIBHierarchy = async (req, res) => {
  try {
    const { masterLogin } = req.params;

    if (!masterLogin) {
      return res.status(400).json({
        success: false,
        message: 'Master login is required'
      });
    }

    const ibData = await mt5Service.getIBHierarchy(masterLogin);

    return res.status(200).json({
      success: true,
      data: ibData
    });

  } catch (error) {
    console.error('IB Hierarchy Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get IB hierarchy',
      error: error.message
    });
  }
};

// ============================================
// GET TRADING GROUPS
// ============================================
exports.getGroups = async (req, res) => {
  try {
    const groups = await mt5Service.getGroups();

    return res.status(200).json({
      success: true,
      data: groups,
      total: groups.length
    });

  } catch (error) {
    console.error('Get Groups Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get trading groups',
      error: error.message
    });
  }
};