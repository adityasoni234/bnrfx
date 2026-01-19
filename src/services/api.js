import axios from 'axios';

// Base URL for API
const BASE_URL = process.env.REACT_APP_API_URL || 'https://api.bnrfx.com';

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor (no auth needed - using Supabase on frontend)
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || error.response.data?.error || 'Something went wrong';
      
      return Promise.reject({
        status: error.response.status,
        message: message,
        data: error.response.data
      });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        data: null
      });
    } else {
      // Something else happened
      return Promise.reject({
        status: 0,
        message: error.message || 'An error occurred',
        data: null
      });
    }
  }
);

// ==============================================
// GENERIC API METHODS
// ==============================================

/**
 * Generic GET request
 * @param {string} route - API endpoint route (e.g., '/api/broker/mt5/accounts')
 * @param {object} params - Query parameters
 * @returns {Promise} Response data
 */
export const get = async (route, params = {}) => {
  return await apiClient.get(route, { params });
};

/**
 * Generic POST request
 * @param {string} route - API endpoint route
 * @param {object} data - Request body data
 * @returns {Promise} Response data
 */
export const post = async (route, data = {}) => {
  return await apiClient.post(route, data);
};

/**
 * Generic PUT request
 * @param {string} route - API endpoint route
 * @param {object} data - Request body data
 * @returns {Promise} Response data
 */
export const put = async (route, data = {}) => {
  return await apiClient.put(route, data);
};

/**
 * Generic PATCH request
 * @param {string} route - API endpoint route
 * @param {object} data - Request body data
 * @returns {Promise} Response data
 */
export const patch = async (route, data = {}) => {
  return await apiClient.patch(route, data);
};

/**
 * Generic DELETE request
 * @param {string} route - API endpoint route
 * @param {object} data - Request body data (optional)
 * @returns {Promise} Response data
 */
export const del = async (route, data = {}) => {
  return await apiClient.delete(route, { data });
};

// ==============================================
// API ROUTES
// ==============================================

export const API_ROUTES = {
  // MT5 Management (Backend Broker Routes)
  HEALTH: '/api/broker/mt5/health',
  CONNECT: '/api/broker/mt5/connect',
  ACCOUNTS: '/api/broker/mt5/accounts',
  ACCOUNT_DETAILS: (login) => `/api/broker/mt5/accounts/${login}`,
  ACCOUNT_SUMMARY: (login) => `/api/broker/mt5/accounts/${login}/summary`,
  DEPOSIT: '/api/broker/mt5/deposit',
  WITHDRAW: '/api/broker/mt5/withdraw',
  LEVERAGE: '/api/broker/mt5/leverage',
  POSITIONS: (login) => `/api/broker/mt5/positions/${login}`,
  HISTORY: (login) => `/api/broker/mt5/history/${login}`,
  RISK: (login) => `/api/broker/mt5/risk/${login}`,
  IB_HIERARCHY: (masterLogin) => `/api/broker/mt5/ib/${masterLogin}`,
  GROUPS: '/api/broker/mt5/groups',
  SESSIONLOGIN:'/api/broker/mt5/sessionLogin',
  SYNC_USER_ACCOUNTS: (userId) => `/api/broker/mt5/sync-user-accounts/${userId}`,
};

// ==============================================
// READY-TO-USE API FUNCTIONS
// ==============================================

export const api = {
  // Health check
  health: () => get(API_ROUTES.HEALTH),
  
  // List all MT5 accounts
  listAccounts: () => get(API_ROUTES.ACCOUNTS),
  
  // Create new MT5 account
  createAccount: (data) => post(API_ROUTES.ACCOUNTS, data),
  
  // Get account details
  getAccount: (login) => get(API_ROUTES.ACCOUNT_DETAILS(login)),
  
  // Get account summary
  getAccountSummary: (login) => get(API_ROUTES.ACCOUNT_SUMMARY(login)),
  
  // Deposit funds
  deposit: (data) => 
    post(API_ROUTES.DEPOSIT, data),
  
  // Withdraw funds
  withdraw: (data) => 
    post(API_ROUTES.WITHDRAW, data),
  
  // Change leverage
  changeLeverage: (login, leverage) => 
    post(API_ROUTES.LEVERAGE, { login, leverage }),
  
  // Get positions
  getPositions: (login) => get(API_ROUTES.POSITIONS(login)),
  
  // Get trading history
  getHistory: (login, fromDate, toDate) => 
    get(API_ROUTES.HISTORY(login), { from_date: fromDate, to_date: toDate }),
  
  // Get risk monitor
  getRisk: (login) => get(API_ROUTES.RISK(login)),
  
  // Get IB hierarchy
  getIBHierarchy: (masterLogin) => get(API_ROUTES.IB_HIERARCHY(masterLogin)),
  
  // Get trading groups
  getGroups: () => get(API_ROUTES.GROUPS),
  // Session login
  sessionLogin: (mt5_server,mt5_manager,mt5_password) => post(API_ROUTES.SESSIONLOGIN, mt5_server,mt5_manager,mt5_password),
  
  // Sync user's MT5 accounts
  syncUserAccounts: (userId) => post(API_ROUTES.SYNC_USER_ACCOUNTS(userId)),
};

// Export everything
export default {
  get,
  post,
  put,
  patch,
  delete: del,
  routes: API_ROUTES,
  api,
};