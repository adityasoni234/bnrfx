const express = require('express');
const router = express.Router();
const mt5Controller = require('../../controllers/broker/mt5Controller');

// Import your auth middleware
// const { authenticate, authorizeRole } = require('../../middleware/auth');

// Apply authentication to all routes (uncomment when ready)
// router.use(authenticate);
// router.use(authorizeRole(['broker', 'admin']));

// Health check
router.get('/health', mt5Controller.healthCheck);

// Connection
router.post('/connect', async (req, res) => {
  try {
    const { server, login, password } = req.body;
    const mt5Service = require('../../services/mt5Service');
    const connection = await mt5Service.connect(server, login, password);
    
    res.json({
      success: true,
      login,
      server,
      message: "Connected to MT5 server"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// User Management
router.get('/accounts', mt5Controller.listAccounts); // NEW: List all users
router.post('/accounts', mt5Controller.createMT5Account);
router.get('/accounts/:login', mt5Controller.getAccountDetails);
router.get('/accounts/:login/summary', mt5Controller.getAccountSummary);

router.post('/sessionLogin', mt5Controller.sessionLogin);


// Financial Operations
router.post('/deposit', mt5Controller.deposit);
router.post('/withdraw', mt5Controller.withdraw);

// Leverage Management
router.post('/leverage', mt5Controller.changeLeverage);

// Trading Data
router.get('/positions', mt5Controller.getPositions);
router.get('/positions/:login', mt5Controller.getPositionsByLogin);
router.get('/history/:login', mt5Controller.getHistory);

// Risk Management
router.get('/risk/:login', mt5Controller.getRiskMonitor);

// IB Management
router.get('/ib/:masterLogin', mt5Controller.getIBHierarchy);

// Groups
router.get('/groups', mt5Controller.getGroups);

// Sync user's MT5 accounts
router.post('/sync-user-accounts/:userId', mt5Controller.syncUserAccounts);

module.exports = router;