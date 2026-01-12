import React, { useState } from 'react';
import { 
  MdSave,
  MdSecurity,
  MdNotifications,
  MdPayment,
  MdSettings,
  MdBusiness,
  MdEmail,
  MdLock
} from 'react-icons/md';
import './SettingsPage.css';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    companyName: 'StockVala',
    companyEmail: 'support@stockvala.com',
    companyPhone: '+91 9876543210',
    companyAddress: 'Mumbai, Maharashtra, India',
    
    // Trading Settings
    minDeposit: 10000,
    minWithdrawal: 1000,
    withdrawalProcessingTime: '24-48',
    maxLeverage: 500,
    
    // Commission Settings
    masterRebate: 40,
    superMasterRebate: 50,
    commissionPerLot: 1000,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true,
    depositAlerts: true,
    withdrawalAlerts: true,
    kycAlerts: true,
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    ipWhitelist: '',
    
    // Payment Gateway
    razorpayKey: '',
    razorpaySecret: '',
    paytmMerchantId: '',
    upiId: 'stockvala@paytm'
  });

  const handleChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <MdBusiness size={20} /> },
    { id: 'trading', label: 'Trading', icon: <MdSettings size={20} /> },
    { id: 'commission', label: 'Commission', icon: <MdPayment size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <MdNotifications size={20} /> },
    { id: 'security', label: 'Security', icon: <MdSecurity size={20} /> },
    { id: 'payment', label: 'Payment Gateway', icon: <MdPayment size={20} /> }
  ];

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your broker platform settings</p>
        </div>
        <button className="btn btn-success" onClick={handleSave}>
          <MdSave size={20} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="settings-content">
        {/* Tabs Sidebar */}
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Panel */}
        <div className="settings-panel">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="settings-section">
              <h2>General Settings</h2>
              <p className="section-description">Manage your company information and basic settings</p>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Company Email</label>
                  <input
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) => handleChange('companyEmail', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Company Phone</label>
                  <input
                    type="tel"
                    value={settings.companyPhone}
                    onChange={(e) => handleChange('companyPhone', e.target.value)}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Company Address</label>
                  <textarea
                    value={settings.companyAddress}
                    onChange={(e) => handleChange('companyAddress', e.target.value)}
                    rows="3"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Trading Settings */}
          {activeTab === 'trading' && (
            <div className="settings-section">
              <h2>Trading Settings</h2>
              <p className="section-description">Configure trading parameters and limits</p>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Minimum Deposit (₹)</label>
                  <input
                    type="number"
                    value={settings.minDeposit}
                    onChange={(e) => handleChange('minDeposit', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Minimum Withdrawal (₹)</label>
                  <input
                    type="number"
                    value={settings.minWithdrawal}
                    onChange={(e) => handleChange('minWithdrawal', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Withdrawal Processing Time (hours)</label>
                  <input
                    type="text"
                    value={settings.withdrawalProcessingTime}
                    onChange={(e) => handleChange('withdrawalProcessingTime', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Maximum Leverage</label>
                  <select
                    value={settings.maxLeverage}
                    onChange={(e) => handleChange('maxLeverage', e.target.value)}
                  >
                    <option value="100">1:100</option>
                    <option value="200">1:200</option>
                    <option value="500">1:500</option>
                    <option value="1000">1:1000</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Commission Settings */}
          {activeTab === 'commission' && (
            <div className="settings-section">
              <h2>Commission Settings</h2>
              <p className="section-description">Configure IB rebate rates and commission structure</p>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Master IB Rebate (%)</label>
                  <input
                    type="number"
                    value={settings.masterRebate}
                    onChange={(e) => handleChange('masterRebate', e.target.value)}
                    min="0"
                    max="100"
                  />
                  <small>Percentage of commission paid to Master IBs</small>
                </div>

                <div className="form-group">
                  <label>Super Master IB Rebate (%)</label>
                  <input
                    type="number"
                    value={settings.superMasterRebate}
                    onChange={(e) => handleChange('superMasterRebate', e.target.value)}
                    min="0"
                    max="100"
                  />
                  <small>Percentage of commission paid to Super Master IBs</small>
                </div>

                <div className="form-group">
                  <label>Commission Per Lot (₹)</label>
                  <input
                    type="number"
                    value={settings.commissionPerLot}
                    onChange={(e) => handleChange('commissionPerLot', e.target.value)}
                  />
                  <small>Base commission earned per lot traded</small>
                </div>
              </div>

              <div className="info-box">
                <h4>💡 Commission Calculation Example</h4>
                <p>If a client trades 1 lot:</p>
                <ul>
                  <li>Platform earns: ₹{settings.commissionPerLot}</li>
                  <li>Master IB gets: ₹{(settings.commissionPerLot * settings.masterRebate / 100).toFixed(0)} ({settings.masterRebate}%)</li>
                  <li>Super Master IB gets: ₹{(settings.commissionPerLot * settings.superMasterRebate / 100).toFixed(0)} ({settings.superMasterRebate}%)</li>
                </ul>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Settings</h2>
              <p className="section-description">Configure how and when to receive notifications</p>
              
              <div className="toggle-section">
                <h3>Notification Channels</h3>
                <div className="toggle-group">
                  <div className="toggle-item">
                    <div>
                      <strong>Email Notifications</strong>
                      <p>Receive notifications via email</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div>
                      <strong>SMS Notifications</strong>
                      <p>Receive notifications via SMS</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={(e) => handleChange('smsNotifications', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div>
                      <strong>WhatsApp Notifications</strong>
                      <p>Receive notifications via WhatsApp</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={settings.whatsappNotifications}
                        onChange={(e) => handleChange('whatsappNotifications', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="toggle-section">
                <h3>Alert Types</h3>
                <div className="toggle-group">
                  <div className="toggle-item">
                    <div>
                      <strong>Deposit Alerts</strong>
                      <p>Get notified when clients make deposits</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={settings.depositAlerts}
                        onChange={(e) => handleChange('depositAlerts', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div>
                      <strong>Withdrawal Alerts</strong>
                      <p>Get notified when clients request withdrawals</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={settings.withdrawalAlerts}
                        onChange={(e) => handleChange('withdrawalAlerts', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div>
                      <strong>KYC Alerts</strong>
                      <p>Get notified when KYC documents are submitted</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={settings.kycAlerts}
                        onChange={(e) => handleChange('kycAlerts', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              <p className="section-description">Configure security and access controls</p>
              
              <div className="toggle-section">
                <div className="toggle-group">
                  <div className="toggle-item">
                    <div>
                      <strong>Two-Factor Authentication</strong>
                      <p>Require 2FA for admin login</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                    min="5"
                    max="120"
                  />
                  <small>Auto-logout after inactivity</small>
                </div>

                <div className="form-group full-width">
                  <label>IP Whitelist</label>
                  <textarea
                    value={settings.ipWhitelist}
                    onChange={(e) => handleChange('ipWhitelist', e.target.value)}
                    placeholder="Enter IP addresses (one per line)"
                    rows="4"
                  />
                  <small>Only these IP addresses can access admin panel (leave empty to allow all)</small>
                </div>
              </div>

              <div className="info-box warning">
                <h4>⚠️ Security Recommendations</h4>
                <ul>
                  <li>Always enable Two-Factor Authentication</li>
                  <li>Use strong passwords with mix of characters</li>
                  <li>Restrict admin access to known IP addresses</li>
                  <li>Regularly review audit logs for suspicious activity</li>
                </ul>
              </div>
            </div>
          )}

          {/* Payment Gateway Settings */}
          {activeTab === 'payment' && (
            <div className="settings-section">
              <h2>Payment Gateway Settings</h2>
              <p className="section-description">Configure payment gateway credentials</p>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Razorpay Key ID</label>
                  <input
                    type="text"
                    value={settings.razorpayKey}
                    onChange={(e) => handleChange('razorpayKey', e.target.value)}
                    placeholder="rzp_test_xxxxxxxxxx"
                  />
                </div>

                <div className="form-group">
                  <label>Razorpay Secret Key</label>
                  <input
                    type="password"
                    value={settings.razorpaySecret}
                    onChange={(e) => handleChange('razorpaySecret', e.target.value)}
                    placeholder="••••••••••••••"
                  />
                </div>

                <div className="form-group">
                  <label>Paytm Merchant ID</label>
                  <input
                    type="text"
                    value={settings.paytmMerchantId}
                    onChange={(e) => handleChange('paytmMerchantId', e.target.value)}
                    placeholder="PAYTM_MERCHANT_ID"
                  />
                </div>

                <div className="form-group">
                  <label>UPI ID (for manual deposits)</label>
                  <input
                    type="text"
                    value={settings.upiId}
                    onChange={(e) => handleChange('upiId', e.target.value)}
                    placeholder="merchant@paytm"
                  />
                </div>
              </div>

              <div className="info-box">
                <h4>🔐 Security Note</h4>
                <p>Payment gateway credentials are stored securely and encrypted. Never share these keys with anyone.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}