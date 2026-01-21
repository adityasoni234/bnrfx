import React, { useState, useEffect } from 'react';
import { 
  MdWarning,
  MdRefresh,
  MdTrendingUp,
  MdShowChart,
  MdAccountBalance
} from 'react-icons/md';
import './RiskMonitor.css';
import { api } from '../../../services/api';
import { getCurrentUser, getUserMT5Accounts } from '../../../lib/supabase/helpers';

export default function RiskMonitor() {
  const [loading, setLoading] = useState(true);
  const [riskData, setRiskData] = useState({
    highRiskAccounts: [],
    symbolExposure: [],
    marginAlerts: []
  });

  const dummyData = {
    highRiskAccounts: [
      {
        id: '1',
        userName: 'John Doe',
        mt5Login: '12345',
        balance: 50000,
        equity: 45000,
        margin: 40000,
        freeMargin: 5000,
        marginLevel: 112.5,
        openPositions: 5,
        totalLots: 2.5,
        riskLevel: 'HIGH'
      },
      {
        id: '2',
        userName: 'Jane Smith',
        mt5Login: '12346',
        balance: 25000,
        equity: 23000,
        margin: 22000,
        freeMargin: 1000,
        marginLevel: 104.5,
        openPositions: 3,
        totalLots: 1.2,
        riskLevel: 'MEDIUM'
      },
      {
        id: '3',
        userName: 'Mike Johnson',
        mt5Login: '12347',
        balance: 75000,
        equity: 70000,
        margin: 68000,
        freeMargin: 2000,
        marginLevel: 102.9,
        openPositions: 8,
        totalLots: 4.5,
        riskLevel: 'HIGH'
      }
    ],
    symbolExposure: [
      { symbol: 'EURUSD', totalLots: 15.5, buyLots: 8.2, sellLots: 7.3, netLots: 0.9, exposure: 155000 },
      { symbol: 'GBPUSD', totalLots: 12.3, buyLots: 7.5, sellLots: 4.8, netLots: 2.7, exposure: 123000 },
      { symbol: 'USDJPY', totalLots: 10.8, buyLots: 5.5, sellLots: 5.3, netLots: 0.2, exposure: 108000 },
      { symbol: 'XAUUSD', totalLots: 8.5, buyLots: 4.2, sellLots: 4.3, netLots: -0.1, exposure: 85000 },
      { symbol: 'BTCUSD', totalLots: 5.2, buyLots: 3.0, sellLots: 2.2, netLots: 0.8, exposure: 52000 }
    ],
    marginAlerts: [
      {
        id: '1',
        userName: 'Sarah Williams',
        mt5Login: '12348',
        marginLevel: 95.5,
        equity: 15000,
        margin: 15700,
        alertType: 'MARGIN_CALL'
      },
      {
        id: '2',
        userName: 'David Brown',
        mt5Login: '12349',
        marginLevel: 85.2,
        equity: 8500,
        margin: 9976,
        alertType: 'STOP_OUT_WARNING'
      }
    ]
  };

  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        const user = await getCurrentUser();
        console.log('Current user:', user);
        const mt5Accounts = await getUserMT5Accounts(user.user.id);
         if (mt5Accounts && mt5Accounts.length > 0) {
          // Transform data for each account
          const allHighRiskAccounts = [];
          const allSymbolExposure = {};
          const allMarginAlerts = [];
          
          // Fetch risk data for each account with 2 second delay
          for (let i = 0; i < mt5Accounts.length; i++) {
            const account = mt5Accounts[i];
            
            try {
              console.log(`Fetching risk for account ${i + 1}/${mt5Accounts.length}: ${account.login_id}`);
              const response = await api.getRisk(account.login_id);
              console.log(`Risk data for ${account.login_id}:`, response);
              
              if (response && response.success && response.data) {
                const data = response.data;
                
                // Add to high risk accounts
                allHighRiskAccounts.push({
                  id: data.login?.toString() || account.id,
                  userName: account.name || 'MT5 Account',
                  mt5Login: data.login?.toString() || account.login_id,
                  balance: data.balance || 0,
                  equity: data.equity || 0,
                  margin: data.margin || 0,
                  freeMargin: data.free_margin || 0,
                  marginLevel: data.margin_level || 0,
                  openPositions: data.open_positions || 0,
                  totalLots: data.total_lots || 0,
                  riskLevel: data.margin_level < 150 ? 'HIGH' : data.margin_level < 300 ? 'MEDIUM' : 'LOW'
                });
                
                // Aggregate symbol exposure
                if (data.exposure_by_symbol) {
                  Object.entries(data.exposure_by_symbol).forEach(([symbol, exposure]) => {
                    if (!allSymbolExposure[symbol]) {
                      allSymbolExposure[symbol] = { total: 0, buy: 0, sell: 0, value: 0 };
                    }
                    allSymbolExposure[symbol].total += exposure.total || 0;
                    allSymbolExposure[symbol].buy += exposure.buy || 0;
                    allSymbolExposure[symbol].sell += exposure.sell || 0;
                    allSymbolExposure[symbol].value += exposure.value || 0;
                  });
                }
                
                // Add margin alerts
                if (data.margin_level > 0 && data.margin_level < data.margin_call_level) {
                  allMarginAlerts.push({
                    id: account.id,
                    userName: account.name || 'MT5 Account',
                    mt5Login: data.login?.toString() || account.login_id,
                    marginLevel: data.margin_level || 0,
                    equity: data.equity || 0,
                    margin: data.margin || 0,
                    alertType: data.margin_level < data.stop_out_level ? 'STOP_OUT_WARNING' : 'MARGIN_CALL'
                  });
                }
              }
            } catch (error) {
              console.error(`Error fetching risk for ${account.login_id}:`, error);
            }
            
            // Wait 2 seconds before next call (except for the last one)
            if (i < mt5Accounts.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          }
          
          // Set all data at the end
          setRiskData({
            highRiskAccounts: allHighRiskAccounts,
            symbolExposure: Object.entries(allSymbolExposure).map(([symbol, exposure]) => ({
              symbol,
              totalLots: exposure.total,
              buyLots: exposure.buy,
              sellLots: exposure.sell,
              netLots: exposure.buy - exposure.sell,
              exposure: exposure.value
            })),
            marginAlerts: allMarginAlerts
          });
         }
      
        setLoading(false);
      } catch (error) {
        console.error('Error fetching risk data:', error);
        setRiskData(dummyData);
        setLoading(false);
      }
    };
    fetchRiskData();
  }, []);

  const getRiskColor = (level) => {
    switch(level) {
      case 'HIGH': return '#ef4444';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getMarginLevelColor = (level) => {
    if (level < 100) return '#ef4444';
    if (level < 150) return '#f59e0b';
    return '#10b981';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading risk data...</p>
      </div>
    );
  }

  const totalExposure = riskData.symbolExposure.reduce((sum, s) => sum + s.exposure, 0);
  const highRiskCount = riskData.highRiskAccounts.filter(a => a.riskLevel === 'HIGH').length;

  return (
    <div className="risk-container">
      {/* Stats Cards */}
      <div className="risk-stats">
        <div className="stat-card-small danger">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <p>High Risk Accounts</p>
            <h3>{highRiskCount}</h3>
          </div>
        </div>
        <div className="stat-card-small warning">
          <div className="stat-icon">📢</div>
          <div className="stat-info">
            <p>Margin Alerts</p>
            <h3>{riskData.marginAlerts.length}</h3>
          </div>
        </div>
        <div className="stat-card-small exposure">
          <div className="stat-icon">💹</div>
          <div className="stat-info">
            <p>Total Exposure</p>
            <h3>${totalExposure.toLocaleString()}</h3>
          </div>
        </div>
        <div className="stat-card-small positions">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <p>Open Positions</p>
            <h3>{riskData.highRiskAccounts.reduce((sum, a) => sum + a.openPositions, 0)}</h3>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="risk-header">
        <div>
          <h1>Risk Monitor</h1>
          <p>Real-time risk monitoring and exposure tracking</p>
        </div>
        <button className="btn btn-primary">
          <MdRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Margin Alerts */}
      {riskData.marginAlerts.length > 0 && (
        <div className="alert-section">
          <h2>⚠️ Margin Alerts</h2>
          <div className="alert-cards">
            {riskData.marginAlerts.map((alert) => (
              <div key={alert.id} className="alert-card danger">
                <div className="alert-header">
                  <MdWarning size={24} />
                  <span className="alert-type">{alert.alertType.replace('_', ' ')}</span>
                </div>
                <div className="alert-body">
                  <p className="alert-user">{alert.userName}</p>
                  <p className="alert-mt5">MT5: {alert.mt5Login}</p>
                  <div className="alert-details">
                    <div>
                      <span className="label">Margin Level:</span>
                      <span className="value danger">{alert.marginLevel}%</span>
                    </div>
                    <div>
                      <span className="label">Equity:</span>
                      <span className="value">${alert.equity.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* High Risk Accounts */}
      <div className="section">
        <h2>High Risk Accounts</h2>
        <div className="risk-table-container">
          <table className="risk-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>MT5 Login</th>
                <th>Balance</th>
                <th>Equity</th>
                <th>Margin</th>
                <th>Free Margin</th>
                <th>Margin Level</th>
                <th>Positions</th>
                <th>Total Lots</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {riskData.highRiskAccounts.map((account) => (
                <tr key={account.id}>
                  <td>
                    <div className="client-name">{account.userName}</div>
                  </td>
                  <td>
                    <span className="mt5-badge">{account.mt5Login}</span>
                  </td>
                  <td>${account.balance.toLocaleString()}</td>
                  <td>${account.equity.toLocaleString()}</td>
                  <td>${account.margin.toLocaleString()}</td>
                  <td>${account.freeMargin.toLocaleString()}</td>
                  <td>
                    <span 
                      className="margin-level"
                      style={{ color: getMarginLevelColor(account.marginLevel) }}
                    >
                      {account.marginLevel}%
                    </span>
                  </td>
                  <td>{account.openPositions}</td>
                  <td>{account.totalLots}</td>
                  <td>
                    <span 
                      className="risk-badge"
                      style={{ 
                        backgroundColor: getRiskColor(account.riskLevel) + '20',
                        color: getRiskColor(account.riskLevel)
                      }}
                    >
                      {account.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Symbol Exposure */}
      <div className="section">
        <h2>Symbol Exposure</h2>
        <div className="exposure-table-container">
          <table className="exposure-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Total Lots</th>
                <th>Buy Lots</th>
                <th>Sell Lots</th>
                <th>Net Lots</th>
                <th>Exposure</th>
              </tr>
            </thead>
            <tbody>
              {riskData.symbolExposure.map((symbol) => (
                <tr key={symbol.symbol}>
                  <td>
                    <span className="symbol-name">{symbol.symbol}</span>
                  </td>
                  <td>{symbol.totalLots.toFixed(2)}</td>
                  <td className="buy-lots">{symbol.buyLots.toFixed(2)}</td>
                  <td className="sell-lots">{symbol.sellLots.toFixed(2)}</td>
                  <td>
                    <span className={symbol.netLots >= 0 ? 'net-positive' : 'net-negative'}>
                      {symbol.netLots > 0 ? '+' : ''}{symbol.netLots.toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <span className="exposure-amount">${symbol.exposure.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}