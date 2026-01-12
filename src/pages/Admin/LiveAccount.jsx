import React, { useState, useEffect } from 'react';
import { FiUserPlus, FiEye, FiEyeOff, FiCopy, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../../styles/Admin/LiveAccount.css';
import { getCurrentUser, getUserMT5Accounts, createMT5Account } from '../../lib/supabase/helpers';

function LiveAccount() {
  const [showPassword, setShowPassword] = useState({});
  const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState({
    accountGroup: 'LIVE PRO',
    leverage: 500
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      
      const user = await getCurrentUser();
      if (!user) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }

      setCurrentUser(user);

      const mt5Accounts = await getUserMT5Accounts(user.user.id);
      setAccounts(mt5Accounts || []);

    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'leverage' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Please login first');
      return;
    }

    setCreating(true);

    try {
      const newAccount = await createMT5Account(
        currentUser.user.id,
        formData.accountGroup,
        formData.leverage
      );

      if (newAccount) {
        alert(`Account Created Successfully!\nLogin: ${newAccount.login_id}\nPassword: ${newAccount.password}\n\nPlease save these credentials!`);
        
        // Refresh accounts list
        await fetchAccounts();
        
        // Reset form
        setFormData({
          accountGroup: 'LIVE PRO',
          leverage: 500
        });
      } else {
        alert('Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Failed to create account. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    alert(`${field} copied to clipboard!`);
  };

  const togglePasswordVisibility = (accountId) => {
    setShowPassword(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  const nextAccount = () => {
    if (currentAccountIndex < accounts.length - 1) {
      setCurrentAccountIndex(currentAccountIndex + 1);
    }
  };

  const prevAccount = () => {
    if (currentAccountIndex > 0) {
      setCurrentAccountIndex(currentAccountIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="live-account-page">
        <div className="loading" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '18px'
        }}>
          Loading accounts...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="live-account-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2>Please login to manage accounts</h2>
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

  const currentAccount = accounts[currentAccountIndex];

  return (
    <div className="live-account-page">
      <div className="live-account-container">
        {/* Create Account Section */}
        <div className="create-account-section">
          <div className="section-header">
            <div className="header-icon">
              <FiUserPlus size={32} />
            </div>
            <div>
              <h2>Create Live Account</h2>
              <p>Fill in the details below to open a new trading account.</p>
            </div>
          </div>

          <form className="create-account-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Account Group</label>
              <select
                name="accountGroup"
                value={formData.accountGroup}
                onChange={handleChange}
                required
              >
                <option value="LIVE PRO">LIVE PRO</option>
                <option value="LIVE STANDARD">LIVE STANDARD</option>
                <option value="DEMO">DEMO</option>
              </select>
            </div>

            <div className="form-group">
              <label>Leverage</label>
              <select
                name="leverage"
                value={formData.leverage}
                onChange={handleChange}
                required
              >
                <option value={100}>1:100</option>
                <option value={200}>1:200</option>
                <option value={500}>1:500</option>
                <option value={1000}>1:1000</option>
              </select>
            </div>

            <button type="submit" className="btn-create-account" disabled={creating}>
              {creating ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Existing Accounts Section */}
        <div className="existing-accounts-section">
          <div className="section-header">
            <h2>Your Live Accounts</h2>
          </div>

          {accounts.length === 0 ? (
            <div className="no-accounts">
              <p>You don't have any trading accounts yet.</p>
              <p>Create your first account using the form on the left.</p>
            </div>
          ) : (
            <div className="accounts-carousel">
              <div className="account-card">
                <div className="account-header">
                  <h3>Login: {currentAccount.login_id}</h3>
                  <span className="account-badge">{currentAccount.account_type}</span>
                </div>

                <div className="account-details">
                  <div className="detail-row">
                    <span className="detail-label">Terminal Login</span>
                    <div className="detail-value-copy">
                      <span>{currentAccount.login_id}</span>
                      <button
                        className="copy-btn"
                        onClick={() => handleCopy(currentAccount.login_id, 'Terminal Login')}
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Main Password</span>
                    <div className="detail-value-copy">
                      <span>
                        {showPassword[currentAccount.id] 
                          ? currentAccount.password 
                          : '••••••••'}
                      </span>
                      <button
                        className="copy-btn"
                        onClick={() => togglePasswordVisibility(currentAccount.id)}
                      >
                        {showPassword[currentAccount.id] ? <FiEyeOff /> : <FiEye />}
                      </button>
                      <button
                        className="copy-btn"
                        onClick={() => handleCopy(currentAccount.password, 'Password')}
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Server Name</span>
                    <div className="detail-value-copy">
                      <span>{currentAccount.server_name}</span>
                      <button
                        className="copy-btn"
                        onClick={() => handleCopy(currentAccount.server_name, 'Server Name')}
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Account Type</span>
                    <span className="detail-value">{currentAccount.account_type}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Currency</span>
                    <span className="detail-value">{currentAccount.currency}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Account Leverage</span>
                    <span className="detail-value">1:{currentAccount.leverage}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Balance</span>
                    <span className="detail-value">₹{parseFloat(currentAccount.balance || 0).toFixed(2)}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Equity</span>
                    <span className="detail-value">₹{parseFloat(currentAccount.equity || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              {accounts.length > 1 && (
                <div className="carousel-nav">
                  <button
                    className="nav-btn"
                    onClick={prevAccount}
                    disabled={currentAccountIndex === 0}
                  >
                    <FiChevronLeft />
                  </button>
                  <span className="account-indicator">
                    {currentAccountIndex + 1} / {accounts.length}
                  </span>
                  <button
                    className="nav-btn"
                    onClick={nextAccount}
                    disabled={currentAccountIndex === accounts.length - 1}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LiveAccount;