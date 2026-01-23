const axios = require('axios');
const mockMT5Data = require('../data/mockMT5Data');

class MT5Service {
  constructor() {
    // Python Bridge Configuration
    this.pythonBridgeURL = process.env.PYTHON_BRIDGE_URL || 'http://mt5.bnrfx.com';
    this.useRealAPI = true;
    this.isConnected = false;
    
    console.log(`🔗 MT5 Service initialized`);
    console.log(`🐍 Python Bridge URL: ${this.pythonBridgeURL}`);
    console.log(`⚙️  Use Real API: ${this.useRealAPI}`);
  }

  // Call Python Bridge
  async callBridge(endpoint, method = 'GET', data = null, customTimeout = null) {
    try {
      const config = {
        method,
        url: `${this.pythonBridgeURL}${endpoint}`,
        timeout: customTimeout || 100000, // Use custom timeout or default 10s
        headers: { 'Content-Type': 'application/json' }
      };
      
      if (data) {
        config.data = data;
      }
      
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(`❌ Bridge call failed [${endpoint}]:`, error.message);
      throw new Error(`Python Bridge Error: ${error.response?.data?.error || error.message}`);
    }
  }

  // Connect to MT5 via Python Bridge
  async connect(server, login, password) {
    try {
      if (this.useRealAPI) {
        const result = await this.callBridge('/connect', 'POST', {
          server,
          login,
          password
        });
        
        if (result.success) {
          this.isConnected = true;
          console.log(`✅ MT5 connected via Python Bridge`);
        }
        
        return result;
      } else {
        // Mock mode
        console.log(`Mock: Connected to MT5`);
        this.isConnected = true;
        return { success: true, message: 'Mock connection established' };
      }
    } catch (error) {
      this.isConnected = false;
      throw error;
    }
  }

  // Disconnect from MT5
  async disconnect() {
    try {
      if (this.useRealAPI && this.isConnected) {
        const result = await this.callBridge('/disconnect', 'POST');
        this.isConnected = false;
        return result;
      }
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  // List all MT5 users
  async listUsers() {
    try {
      if (this.useRealAPI) {
        const result = await this.callBridge('/users', 'GET');
        return result;
      } else {
        // Mock data
        return {
          success: true,
          users: mockMT5Data.accounts.map(acc => ({
            login: acc.login,
            name: acc.name,
            group: acc.group,
            balance: acc.balance,
            equity: acc.equity,
            leverage: acc.leverage
          })),
          total: mockMT5Data.accounts.length
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // Create new MT5 user
  async createAccount(userData) {
    try {
      if (this.useRealAPI) {
        const { name, email, phone, password, group, leverage, initialBalance } = userData;
        console.log('Creating MT5 account for:', name, email);
        const [firstName, ...lastNameParts] = name.split(' ');
        const lastName = lastNameParts.join(' ') || firstName;
        
        const result = await this.callBridge('/users', 'POST', {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          password: password,
          group: group || 'demo\\\\default',
          leverage: leverage || 100,
          initial_balance: initialBalance || 0
        });
        
        return result;
      } else {
        // Mock implementation
        const newLogin = Math.floor(Math.random() * 90000) + 10000;
        const tradingPassword = Math.random().toString(36).slice(-8);
        const investorPassword = Math.random().toString(36).slice(-8);
        
        return { 
          success: true, 
          login: newLogin,
          trading_password: tradingPassword,
          investor_password: investorPassword,
          group: userData.group || 'demo\\default',
          leverage: userData.leverage || 100
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // Get account information
  async getAccountInfo(login) {
    try {
      if (this.useRealAPI) {
        console.log(`Fetching account info for login: ${login}`);
        const result = await this.callBridge(`/account/${login}`, 'GET');
        return result.data || result;
      } else {
        // Mock data
        const account = mockMT5Data.accounts.find(acc => acc.login === parseInt(login));
        if (!account) {
          throw new Error(`Account ${login} not found`);
        }
        return {
          success: true,
          login: account.login,
          name: account.name,
          group: account.group,
          leverage: account.leverage,
          balance: account.balance,
          equity: account.equity,
          margin: account.margin,
          margin_free: account.equity - account.margin,
          margin_level: account.margin > 0 ? (account.equity / account.margin) * 100 : 0,
          profit: account.equity - account.balance
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // Deposit funds
  async deposit(login, amount, comment = 'Deposit', transactionId = '') {
    try {
      if (amount <= 0) {
        throw new Error('Amount must be positive');
      }

      if (this.useRealAPI) {
        const result = await this.callBridge('/balance/deposit', 'POST', {
          login: parseInt(login),
          amount: parseFloat(amount),
          comment: comment || `Deposit - ${transactionId}`
        });
        
        return result;
      } else {
        // Mock implementation
        const account = mockMT5Data.accounts.find(acc => acc.login === parseInt(login));
        if (!account) throw new Error('Account not found');
        
        account.balance += parseFloat(amount);
        account.equity += parseFloat(amount);
        
        const ticket = Math.floor(Math.random() * 900000) + 100000;
        
        return {
          success: true,
          login: parseInt(login),
          amount: parseFloat(amount),
          balance: account.balance,
          ticket: ticket
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // Withdraw funds
  async withdraw(login, amount, comment = 'Withdrawal') {
    try {
      if (amount <= 0) {
        throw new Error('Amount must be positive');
      }

      if (this.useRealAPI) {
        const result = await this.callBridge('/balance/withdraw', 'POST', {
          login: parseInt(login),
          amount: parseFloat(amount),
          comment: comment
        });
        
        return result;
      } else {
        // Mock implementation
        const account = mockMT5Data.accounts.find(acc => acc.login === parseInt(login));
        if (!account) throw new Error('Account not found');
        
        if (account.balance < parseFloat(amount)) {
          throw new Error(`Insufficient balance. Available: ${account.balance}`);
        }

        const openPositions = mockMT5Data.positions.filter(pos => 
          pos.mt5Login === parseInt(login) && pos.status === 'OPEN'
        );

        if (openPositions.length > 0) {
          throw new Error('Cannot withdraw with open positions');
        }

        account.balance -= parseFloat(amount);
        account.equity -= parseFloat(amount);
        
        const ticket = Math.floor(Math.random() * 900000) + 100000;
        
        return {
          success: true,
          login: parseInt(login),
          amount: parseFloat(amount),
          new_balance: account.balance,
          deal_id: ticket,
          message: 'Withdrawal successful'
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // Get open positions
  async getOpenPositions(login = null) {
    try {
      console.log('📊 MT5Service.getOpenPositions called, login:', login);
      
      if (this.useRealAPI) {
        // Call Python bridge
        if (login) {
          // Call the new endpoint for specific login positions
          const result = await this.callBridge(`/positions/${login}`, 'GET');
          console.log('✅ Bridge returned positions for login', login, ':', result?.positions?.length || 0);
          return result.positions || [];
        } else {
          // Call the general endpoint for all positions
          const result = await this.callBridge('/positions', 'GET');
          console.log('✅ Bridge returned positions:', result?.positions?.length || 0);
          return result.positions || [];
        }
      } else {
        // Mock data - return all positions if no login specified
        let positions = mockMT5Data.positions;
        
        if (login) {
          positions = positions.filter(pos => 
            pos.mt5Login === parseInt(login) && pos.status === 'OPEN'
          );
        } else {
          positions = positions.filter(pos => pos.status === 'OPEN');
        }

        return positions.map(pos => ({
          ticket: pos.ticket,
          symbol: pos.symbol,
          type: pos.type,
          volume: pos.volume,
          open_price: pos.openPrice,
          current_price: pos.currentPrice,
          profit: pos.profit,
          swap: pos.swap,
          commission: pos.commission
        }));
      }
    } catch (error) {
      console.error('❌ getOpenPositions error:', error);
      throw error;
    }
  }

  // Get risk monitoring data
  async getRiskMonitor(login) {
    try {
      if (this.useRealAPI) {
        const result = await this.callBridge(`/risk/${login}`, 'GET');
        return result.data;
      } else {
        // Mock data
        const account = mockMT5Data.accounts.find(acc => acc.login === parseInt(login));
        if (!account) throw new Error('Account not found');
        
        const positions = mockMT5Data.positions.filter(pos => 
          pos.mt5Login === parseInt(login) && pos.status === 'OPEN'
        );

        const totalProfit = positions.reduce((sum, pos) => sum + pos.profit, 0);
        const totalVolume = positions.reduce((sum, pos) => sum + pos.volume, 0);
        
        return {
          login: account.login,
          balance: account.balance,
          equity: account.equity,
          margin: account.margin,
          free_margin: account.equity - account.margin,
          margin_level: account.margin > 0 ? (account.equity / account.margin * 100) : 0,
          total_profit: totalProfit,
          open_positions: positions.length,
          total_lots: totalVolume,
          positions: positions,
          margin_call_level: 50,
          stop_out_level: 20
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // Get IB hierarchy and performance
  async getIBHierarchy(masterLogin) {
    try {
      if (this.useRealAPI) {
        const result = await this.callBridge(`/ib/${masterLogin}`, 'GET');
        return result.data;
      } else {
        // Mock data
        return {
          master_login: masterLogin,
          master_name: 'IB Master',
          master_group: 'Master',
          total_clients: 5,
          clients: [],
          total_volume: 100.5,
          total_commission: 250.75,
          pending_rebates: 125.50
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // Get available trading groups
  async getGroups() {
    try {
      if (this.useRealAPI) {
        const result = await this.callBridge('/groups', 'GET');
        return result.groups || [];
      } else {
        // Mock data
        return [
          { name: 'Standard', currency: 'USD', leverage: 100 },
          { name: 'ECN', currency: 'USD', leverage: 200 },
          { name: 'Master', currency: 'USD', leverage: 500 },
          { name: 'Super Master', currency: 'USD', leverage: 500 }
        ];
      }
    } catch (error) {
      throw error;
    }
  }

  // Get available trading groups
  async sessionLogin(mt5_server,mt5_manager,mt5_password) {
    try {
      if (this.useRealAPI) {
        console.log('MT5 Service: sessionLogin called with', mt5_server,mt5_manager);
        const result = await this.callBridge('/config/mt5', 'POST', {
          server:mt5_server,
          manager:mt5_manager,
          password:mt5_password
        });
        return result || [];
      }
    } catch (error) {
      throw error;
    }
  }

  async getHistory(login, fromDate, toDate) {
    try {
      // This would require additional endpoint in Python bridge
      // For now, return mock data
      return mockMT5Data.deals.map(deal => ({
        ticket: deal.ticket,
        order: deal.orderTicket,
        time: Math.floor(deal.time.getTime() / 1000),
        type: deal.type,
        symbol: deal.symbol,
        volume: parseFloat(deal.volume || 0),
        price: parseFloat(deal.price || 0),
        profit: parseFloat(deal.profit),
        commission: parseFloat(deal.commission)
      }));
    } catch (error) {
      throw error;
    }
  }

  async ping() {
    try {
      if (this.useRealAPI) {
        const result = await this.callBridge('/connect', 'POST');
        return {
          status: 'success',
          connected: result.success || false,
          server: '91.243.176.38:443',
          manager: 7000
        };
      }
      
      return {
        status: 'success',
        connected: this.isConnected,
        server: '91.243.176.38:443',
        manager: 7000
      };
    } catch (error) {
      return {
        status: 'error',
        connected: false,
        message: error.message
      };
    }
  }

  // Sync user's MT5 accounts
  async syncUserAccounts(userId) {
    try {
      console.log(`🔄 Calling bridge to sync accounts for user: ${userId}`);
      
      if (this.useRealAPI) {
        // Use 60-second timeout for sync operations (can sync multiple accounts)
        const result = await this.callBridge(`/sync-user-accounts/${userId}`, 'POST', null, 60000);
        console.log(`✅ Sync completed for user ${userId}:`, result);
        return result;
      }
      
      // Mock response for testing
      return {
        success: true,
        message: 'Mock sync completed',
        total: 0,
        successful: 0,
        failed: 0
      };
    } catch (error) {
      console.error(`❌ Error syncing user accounts:`, error);
      throw error;
    }
  }
}

module.exports = new MT5Service();
