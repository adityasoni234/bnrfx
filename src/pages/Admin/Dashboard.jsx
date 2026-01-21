import React, { useState, useEffect } from 'react';
import { 
  FiMenu, 
  FiCopy, 
  FiShield, 
  FiMoon, 
  FiArrowRight,
  FiClock,
  FiUnlock
} from 'react-icons/fi';
import '../../styles/Admin/Dashboard.css';
import { 
  getCurrentUser,
  getUserWallet,
  getUserMT5Accounts,
  getUserDeposits,
  getUserWithdrawals 
} from '../../lib/supabase/helpers';
import { supabase } from '../../lib/supabase/client';
import { api } from '../../services/api';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('live');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [mt5Accounts, setMt5Accounts] = useState([]);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
  const [mt5Account, setMt5Account] = useState(null);
  const [mt5Positions, setMt5Positions] = useState([]);
  const [stats, setStats] = useState({
    totalDeposit: 0,
    totalWithdraw: 0,
    referralIncome: 0,
    referralPayout: 0,
    tradingDeposit: 0,
    tradingWithdraw: 0
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }

      setUserData(currentUser.profile);

      // Get wallet data
      const wallet = await getUserWallet(currentUser.user.id);
      setWalletData(wallet);

    
      const mt5Accounts = await getUserMT5Accounts(currentUser.user.id);
      if (mt5Accounts && mt5Accounts.length > 0) {
        setMt5Accounts(mt5Accounts);
        // Get MT5 accounts
        try {
          const usermt5Account = mt5Accounts[0];
          console.log('💡 Found existing MT5 account:', usermt5Account);
          
          const mt5Result = await api.getAccount(usermt5Account.login_id);
          
          if (mt5Result.success && mt5Result.data) {
            // Merge database account with live MT5 data
            setMt5Account({
              ...usermt5Account,
              balance: mt5Result.data.balance,
              equity: mt5Result.data.equity,
              margin: mt5Result.data.margin,
              free_margin: mt5Result.data.margin_free,
              margin_level: mt5Result.data.margin_level,
              leverage: mt5Result.data.leverage,
              credit: mt5Result.data.credit || 0
            });
            console.log('✅ MT5 account data loaded:', mt5Result);
          } else {
            console.warn('⚠️ MT5 API returned no data, using database values');
            setMt5Account(usermt5Account);
          }

          // Fetch positions after 2 seconds
          setTimeout(async () => {
            try {
              const positions = await api.getPositions(usermt5Account.login_id);
              console.log('✅ Fetched MT5 positions:', positions);
              setMt5Positions(positions.data.positions || []);
            } catch (posError) {
              console.error('❌ Failed to fetch positions:', posError);
            }
          }, 2000);
          
        } catch (mt5Error) {
          console.error('❌ Failed to fetch MT5 data:', mt5Error);
          // Fallback to database account
          setMt5Account(mt5Accounts[0]);
        }
      }

      // Get deposits and withdrawals for stats
      const [deposits, withdrawals] = await Promise.all([
        getUserDeposits(currentUser.user.id),
        getUserWithdrawals(currentUser.user.id)
      ]);

      // Calculate stats
      const approvedDeposits = deposits.filter(d => d.status === 'approved');
      const approvedWithdrawals = withdrawals.filter(w => w.status === 'approved');
      
      const totalDeposit = approvedDeposits.reduce((sum, d) => sum + parseFloat(d.amount), 0);
      const totalWithdraw = approvedWithdrawals.reduce((sum, w) => sum + parseFloat(w.amount), 0);

      // Get referral income
      const { data: referredClients } = await supabase
        .from('profiles')
        .select('id')
        .eq('referred_by', currentUser.user.id);

      let referralIncome = 0;
      if (referredClients && referredClients.length > 0) {
        // Calculate 5% commission on referred clients' deposits
        for (const client of referredClients) {
          const { data: clientDeposits } = await supabase
            .from('deposits')
            .select('amount')
            .eq('user_id', client.id)
            .eq('status', 'approved');
          
          const clientTotal = clientDeposits?.reduce((sum, d) => sum + parseFloat(d.amount), 0) || 0;
          referralIncome += clientTotal * 0.05; // 5% commission
        }
      }

      setStats({
        totalDeposit,
        totalWithdraw,
        referralIncome,
        referralPayout: 0, // Will be implemented with payout system
        tradingDeposit: totalDeposit,
        tradingWithdraw: totalWithdraw
      });

      // Get open MT5 positions
      const { data: positions } = await supabase
        .from('positions')
        .select('*')
        .eq('user_id', currentUser.user.id)
        .eq('is_open', true);

      setMt5Positions(positions || []);

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

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
          setMt5Account({
            ...selectedAccount,
            balance: mt5Result.data.balance,
            equity: mt5Result.data.equity,
            margin: mt5Result.data.margin,
            free_margin: mt5Result.data.margin_free,
            margin_level: mt5Result.data.margin_level,
            leverage: mt5Result.data.leverage,
            credit: mt5Result.data.credit || 0
          });
        } else {
          setMt5Account(selectedAccount);
        }

        // Fetch positions
        const positions = await api.getPositions(selectedAccount.login_id);
        console.log('✅ Fetched MT5 positions:', positions);
        setMt5Positions(positions.data?.positions || []);
      } catch (error) {
        console.error('❌ Failed to fetch account data:', error);
        setMt5Account(selectedAccount);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleVerifyAccount = () => {
    window.location.href = '/admin/profile?tab=kyc';
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px'
        }}>
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="dashboard-container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2>Please login to view dashboard</h2>
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

  const statsData = [
    { label: 'Total Deposit', value: `$${stats.totalDeposit.toFixed(2)}`, color: 'green' },
    { label: 'Total Withdraw', value: `$${stats.totalWithdraw.toFixed(2)}`, color: 'red' },
    { label: 'Referral Income', value: `$${stats.referralIncome.toFixed(2)}`, color: 'blue' },
    { label: 'Referral Payout', value: `$${stats.referralPayout.toFixed(2)}`, color: 'orange' },
    // { label: 'Trading Deposit', value: `$${stats.tradingDeposit.toFixed(2)}`, color: 'green' },
    // { label: 'Trading Withdraw', value: `$${stats.tradingWithdraw.toFixed(2)}`, color: 'red' }
  ];

  const accountDetails = mt5Account ? {
    accountNo: `#${mt5Account.login_id}`,
    leverage: mt5Account.leverage || '500',
    balance: `$${parseFloat(mt5Account.balance || 0).toFixed(2)}`,
    credit: '$0.00',
    equity: `$${parseFloat(mt5Account.equity || 0).toFixed(2)}`,
    totalDeposit: `$${stats.tradingDeposit.toFixed(2)}`
  } : {
    accountNo: 'No Account',
    leverage: '500',
    balance: '$0.00',
    credit: '$0.00',
    equity: '$0.00',
    totalDeposit: '$0.00'
  };

  return (
    <div className="dashboard-container">
      {/* Top Bar */}
      <div className="dashboard-topbar">
        <button className="menu-toggle"><FiMenu /></button>
        
        <div className="topbar-right">
          <div className='select-mt5-acc form-group' style={{marginBottom:"0"}}>
            <select value={selectedAccountIndex} onChange={handleAccountChange}>
              {mt5Accounts.map((account, index) => (
                <option key={index} value={index}>
                  {account.login_id} - Account {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="balance-display">
            <span className="balance-label">BALANCE</span>
            <span className="balance-amount">
              ${walletData?.total_balance?.toFixed(2) || '0.00'}
            </span>
          </div>
          {mt5Account && (
            <div className="trading-id">
              <span>{mt5Account.login_id}</span>
              <button 
                className="copy-btn"
                onClick={() => handleCopyToClipboard(mt5Account.login_id)}
              >
                <FiCopy />
              </button>
            </div>
          )}
          <button className="verify-btn" onClick={handleVerifyAccount}>
            <FiShield /> 
            {userData.kyc_status === 'approved' ? 'Verified' : 'Verify Account'}
          </button>
          <button className="theme-toggle"><FiMoon /></button>
          <div className="user-avatar">
            <span>{userData.first_name?.charAt(0) || 'U'}</span>
          </div>
          <div className="user-info">
            <div className="user-name">
              {userData.first_name} {userData.last_name}
            </div>
            <div className="user-email">{userData.email}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Overview Section */}
        <div className="overview-section">
          <h1 className="page-title">Overview</h1>
          <p className="welcome-text">
            Welcome to your trading dashboard, {userData.first_name}.
          </p>

          {/* Stats Grid */}
          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className={`stat-indicator ${stat.color}`}></div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Live MT5 Data */}
          {mt5Account && (
            <div className="mt5-live-data" style={{ 
              marginTop: '20px', 
              padding: '20px', 
              backgroundColor: '#f0f8ff', 
              borderRadius: '8px' 
            }}>
              <h3 style={{ marginBottom: '15px' }}>🔴 Live MT5 Account Data</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '15px' 
              }}>
                <div>
                  <strong>Balance:</strong> {parseFloat(mt5Account.balance || 0) < 0 ? '-' : ''}${Math.abs(parseFloat(mt5Account.balance || 0)).toFixed(2)}
                </div>
                <div>
                  <strong>Equity:</strong> {parseFloat(mt5Account.equity || 0) < 0 ? '-' : ''}${Math.abs(parseFloat(mt5Account.equity || 0)).toFixed(2)}
                </div>
                <div>
                  <strong>Margin:</strong> {parseFloat(mt5Account.margin || 0) < 0 ? '-' : ''}${Math.abs(parseFloat(mt5Account.margin || 0)).toFixed(2)}
                </div>
                <div>
                  <strong>Free Margin:</strong> {parseFloat(mt5Account.free_margin || 0) < 0 ? '-' : ''}${Math.abs(parseFloat(mt5Account.free_margin || 0)).toFixed(2)}
                </div>
                <div>
                  <strong>Margin Level:</strong> {parseFloat(mt5Account.margin_level || 0).toFixed(2)}%
                </div>
                <div>
                  <strong>Open Positions:</strong> {mt5Positions.length}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="two-column-layout">
          {/* Left Column - Trading Accounts */}
          <div className="left-column">
            <div className="card">
              <h2 className="card-title">Manage Your Trading Accounts</h2>
              
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'live' ? 'active' : ''}`}
                  onClick={() => setActiveTab('live')}
                >
                  Live Account
                </button>
                <button 
                  className={`tab ${activeTab === 'attach' ? 'active' : ''}`}
                  onClick={() => setActiveTab('attach')}
                >
                  Attach Account
                </button>
              </div>

              <div className="account-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <div className="detail-label">Account No.</div>
                    <div className="detail-value">{accountDetails.accountNo}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Leverage</div>
                    <div className="detail-value">{accountDetails.leverage}</div>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <div className="detail-label">Balance</div>
                    <div className="detail-value">{mt5Account?.balance}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Credit</div>
                    <div className="detail-value">{mt5Account?.credit}</div>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <div className="detail-label">Equity</div>
                    <div className="detail-value">{mt5Account?.equity}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Total Deposit</div>
                    <div className="detail-value">{accountDetails?.totalDeposit}</div>
                  </div>
                </div>

                <button className="view-details-btn" onClick={fetchUserData}>
                  <FiArrowRight /> {loading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
            </div>

            {/* MT5 Open Positions */}
            <div className="card">
              <h2 className="card-title">Open MT5 Positions</h2>
              <div className="transactions-table">
                <table>
                  <thead>
                    <tr>
                      <th>TICKET</th>
                      <th>SYMBOL</th>
                      <th>TYPE</th>
                      <th>VOLUME</th>
                      <th>PRICE</th>
                      <th>PROFIT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mt5Positions.length > 0 ? (
                      mt5Positions.map((pos) => (
                        <tr key={pos?.id}>
                          <td>{pos.ticket}</td>
                          <td>{pos.symbol}</td>
                          <td>{pos.type}</td>
                          <td>{pos.volume}</td>
                          <td>{pos.price_open}</td>
                          <td style={{ color: pos.profit >= 0 ? 'green' : 'red' }}>
                          ${parseFloat(pos.profit || 0).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="no-data">
                          No open positions.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Next Steps */}
          <div className="right-column">
            <div className="card">
              <h2 className="card-title">Your Next Steps</h2>
              
              <div className="next-steps">
                <div className="step-item">
                  <div className="step-icon"><FiClock /></div>
                  <div className="step-content">
                    <h3>
                      {userData.kyc_status === 'approved' 
                        ? 'Verification Complete' 
                        : 'Verification Required'}
                    </h3>
                    <p>
                      {userData.kyc_status === 'approved'
                        ? 'Your account is verified and ready to trade.'
                        : 'Please complete your KYC verification.'}
                    </p>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-icon"><FiUnlock /></div>
                  <div className="step-content">
                    <h3>Unlock Your Potential</h3>
                    <p>Fund your account to start trading.</p>
                  </div>
                </div>

                <div className="action-buttons">
                  <button 
                    className="btn-deposit"
                    onClick={() => window.location.href = '/admin/deposit'}
                  >
                    Deposit Now
                  </button>
                  <button 
                    className="btn-withdraw"
                    onClick={() => window.location.href = '/admin/withdraw'}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;