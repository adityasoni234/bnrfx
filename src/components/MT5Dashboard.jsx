import React, { useState } from 'react';
import { useMT5Connection, useMT5RealTime, useMT5Operations } from '../hooks/useMT5';

const MT5Dashboard = ({ userLogin = 28000 }) => {
  const [selectedLogin, setSelectedLogin] = useState(userLogin);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  // Hooks
  const { isConnected, loading: connectionLoading, error: connectionError, checkConnection } = useMT5Connection();
  const { account, positions, loading, error, refresh } = useMT5RealTime(selectedLogin);
  const { deposit, withdraw, loading: operationLoading, error: operationError } = useMT5Operations();

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      await deposit(selectedLogin, parseFloat(depositAmount), 'React App Deposit');
      setDepositAmount('');
      refresh();
      alert('Deposit successful!');
    } catch (error) {
      alert(`Deposit failed: ${error.message}`);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      await withdraw(selectedLogin, parseFloat(withdrawAmount), 'React App Withdrawal');
      setWithdrawAmount('');
      refresh();
      alert('Withdrawal successful!');
    } catch (error) {
      alert(`Withdrawal failed: ${error.message}`);
    }
  };

  if (connectionLoading || loading) {
    return (
      <div className="loading" style={{ textAlign: 'center', padding: '50px' }}>
        <div>🔄 Connecting to MT5 Server...</div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          Server: 91.243.176.38:443 | Login: 28000
        </div>
      </div>
    );
  }

  return (
    <div className="mt5-dashboard" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>MT5 Dashboard</h1>
      
      {/* Connection Status */}
      <div className="connection-status" style={{ 
        padding: '10px', 
        marginBottom: '20px', 
        backgroundColor: isConnected ? '#d4edda' : '#f8d7da',
        border: `1px solid ${isConnected ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: '4px'
      }}>
        <h3>Connection Status</h3>
        <p>Status: {isConnected ? '✅ Live Connection' : '❌ Disconnected'}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>Server: 91.243.176.38 | Login: 28000</p>
        {(connectionError || error) && <p style={{ color: 'red' }}>Error: {connectionError || error}</p>}
        <button onClick={checkConnection} disabled={connectionLoading}>
          {connectionLoading ? 'Checking...' : 'Check Connection'}
        </button>
      </div>

      {/* Account Selection */}
      <div className="account-selector" style={{ marginBottom: '20px' }}>
        <label>
          Account Login: 
          <input 
            type="number" 
            value={selectedLogin} 
            onChange={(e) => setSelectedLogin(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>

      {/* Account Information */}
      <div className="account-info" style={{ 
        padding: '15px', 
        marginBottom: '20px', 
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '4px'
      }}>
        <h3>Account Information</h3>
        {loading ? (
          <p>🔄 Loading real-time data...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : account ? (
          <div>
            <p><strong>Login:</strong> {account.login}</p>
            <p><strong>Balance:</strong> ${account.balance?.toFixed(2)}</p>
            <p><strong>Equity:</strong> ${account.equity?.toFixed(2)}</p>
            <p><strong>Margin:</strong> ${account.margin?.toFixed(2)}</p>
            <p><strong>Free Margin:</strong> ${account.margin_free?.toFixed(2)}</p>
            <p><strong>Margin Level:</strong> {account.margin_level?.toFixed(2)}%</p>
            <p><strong>Currency:</strong> {account.currency}</p>
            <p><strong>Leverage:</strong> 1:{account.leverage}</p>
            <p><strong>Profit:</strong> ${account.profit?.toFixed(2)}</p>
          </div>
        ) : (
          <p>No account data available</p>
        )}
        <button onClick={refresh} disabled={loading}>
          🔄 Refresh Data
        </button>
        <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>
          Auto-refresh: Every 2 seconds
        </span>
      </div>

      {/* Balance Operations */}
      <div className="balance-operations" style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '20px' 
      }}>
        {/* Deposit */}
        <form onSubmit={handleDeposit} style={{ 
          padding: '15px', 
          backgroundColor: '#e8f5e8',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          flex: 1
        }}>
          <h4>Deposit</h4>
          <input
            type="number"
            placeholder="Amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            required
            min="0.01"
            step="0.01"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <button 
            type="submit" 
            disabled={operationLoading || !depositAmount}
            style={{ 
              width: '100%', 
              padding: '10px', 
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            {operationLoading ? 'Processing...' : 'Deposit'}
          </button>
        </form>

        {/* Withdraw */}
        <form onSubmit={handleWithdraw} style={{ 
          padding: '15px', 
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          flex: 1
        }}>
          <h4>Withdraw</h4>
          <input
            type="number"
            placeholder="Amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            required
            min="0.01"
            step="0.01"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <button 
            type="submit" 
            disabled={operationLoading || !withdrawAmount}
            style={{ 
              width: '100%', 
              padding: '10px', 
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            {operationLoading ? 'Processing...' : 'Withdraw'}
          </button>
        </form>
      </div>

      {operationError && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Operation Error: {operationError}
        </div>
      )}

      {/* Open Positions */}
      <div className="positions" style={{ 
        padding: '15px', 
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '4px'
      }}>
        <h3>Open Positions</h3>
        {loading ? (
          <p>🔄 Loading positions...</p>
        ) : positions && positions.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#e9ecef' }}>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>Ticket</th>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>Symbol</th>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>Type</th>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>Volume</th>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>Open Price</th>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>Current Price</th>
                <th style={{ padding: '8px', border: '1px solid #dee2e6' }}>Profit</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.ticket}>
                  <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{position.ticket}</td>
                  <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{position.symbol}</td>
                  <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{position.type}</td>
                  <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{position.volume}</td>
                  <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{position.open_price}</td>
                  <td style={{ padding: '8px', border: '1px solid #dee2e6' }}>{position.current_price}</td>
                  <td style={{ 
                    padding: '8px', 
                    border: '1px solid #dee2e6',
                    color: position.profit >= 0 ? 'green' : 'red'
                  }}>
                    ${position.profit?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No open positions</p>
        )}
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          ⚡ Real-time position updates
        </div>
      </div>
    </div>
  );
};

export default MT5Dashboard;