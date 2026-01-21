import React, { useState, useEffect } from 'react';
import { 
  MdCloudUpload, 
  MdCheckCircle,
  MdAccessTime,
  MdCancel,
  MdContentCopy
} from 'react-icons/md';
import './Deposit.css';
import {
  getCurrentUser,
  getUserMT5Accounts,
  createDeposit,
  getUserDeposits,
  getPaymentSettings
} from '../../lib/supabase/helpers';

export default function Deposit() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank_transfer');
  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [utrNumber, setUtrNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [depositHistory, setDepositHistory] = useState([]);
  const [mt5Accounts, setMt5Accounts] = useState([]);
  const [selectedMt5Login, setSelectedMt5Login] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentSettings, setPaymentSettings] = useState(null);
  
  // Hawala specific fields
  const [hawalaData, setHawalaData] = useState({
    fromCity: '',
    toCity: '',
    company: '',
    secretNumber: ''
  });

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

      // Get payment settings from broker
      console.log('🔄 Fetching payment settings...');
      const settings = await getPaymentSettings();
      console.log('✅ Payment settings received:', settings);
      setPaymentSettings(settings);

      // Get MT5 accounts
      const accounts = await getUserMT5Accounts(user.user.id);
      setMt5Accounts(accounts || []);
      if (accounts && accounts.length > 0) {
        setSelectedMt5Login(accounts[0].login_id);
      }

      // Get deposit history
      const deposits = await getUserDeposits(user.user.id);
      setDepositHistory(deposits || []);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setProofFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) < 1000) {
      alert('Minimum deposit amount is $1,000');
      return;
    }

    if (!proofFile) {
      alert('Please upload payment proof');
      return;
    }

    if (!currentUser) {
      alert('Please login first');
      return;
    }

    if (!selectedMt5Login && mt5Accounts.length > 0) {
      alert('Please select an MT5 account');
      return;
    }

    // Validate hawala fields if method is hawala
    if (method === 'hawala') {
      if (!hawalaData.fromCity || !hawalaData.toCity || !hawalaData.company || !hawalaData.secretNumber) {
        alert('Please fill all Hawala fields');
        return;
      }
    }

    setSubmitting(true);

    try {
      const result = await createDeposit({
        userId: currentUser.user.id,
        amount: parseFloat(amount),
        paymentMethod: method,
        mt5Login: selectedMt5Login || null,
        utrNumber: utrNumber || null,
        proofFile: proofFile,
        hawalaData: method === 'hawala' ? hawalaData : null
      });

      if (result.success) {
        alert('✅ Deposit request submitted successfully! We will review and approve within 24 hours.');
        
        // Refresh deposit history
        const deposits = await getUserDeposits(currentUser.user.id);
        setDepositHistory(deposits || []);
        
        // Reset form
        setAmount('');
        setUtrNumber('');
        setProofFile(null);
        setProofPreview(null);
        setHawalaData({
          fromCity: '',
          toCity: '',
          company: '',
          secretNumber: ''
        });
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Deposit error:', error);
      alert('❌ Failed to submit deposit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('✅ Copied to clipboard!');
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderPaymentDetails = () => {
    if (!paymentSettings) {
      return <p>Loading payment details...</p>;
    }

    console.log('🔍 Current payment settings:', paymentSettings);
    console.log('🔍 Selected method:', method);

    // Map method names to settings keys
    let settingsKey = method;
    if (method === 'bank_transfer') {
      settingsKey = 'bank';
    }

    const methodSettings = paymentSettings[settingsKey];
    console.log('🔍 Method settings for', settingsKey, ':', methodSettings);

    if (!methodSettings) {
      return <p className="error-text">⚠️ Payment settings not configured for this method</p>;
    }

    if (!methodSettings.enabled) {
      return <p className="error-text">⚠️ This payment method is currently disabled</p>;
    }

    switch(method) {
      case 'upi':
        return (
          <div className="upi-details">
            <div className="detail-row">
              <span className="label">UPI ID:</span>
              <div className="value-with-copy">
                <span className="value">{methodSettings.upi_id || 'Not configured'}</span>
                {methodSettings.upi_id && (
                  <button 
                    type="button"
                    className="copy-btn"
                    onClick={() => copyToClipboard(methodSettings.upi_id)}
                  >
                    <MdContentCopy size={18} />
                  </button>
                )}
              </div>
            </div>
            {methodSettings.qr_code_url && (
              <div className="qr-code-display">
                <p>📱 Scan QR Code to Pay</p>
                <img src={methodSettings.qr_code_url} alt="UPI QR Code" />
              </div>
            )}
          </div>
        );

      case 'bank_transfer':
        return (
          <div className="bank-details">
            <div className="detail-row">
              <span className="label">Account Name:</span>
              <span className="value">{methodSettings.account_name || 'Not configured'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Account Number:</span>
              <div className="value-with-copy">
                <span className="value">{methodSettings.account_number || 'Not configured'}</span>
                {methodSettings.account_number && (
                  <button 
                    type="button"
                    className="copy-btn"
                    onClick={() => copyToClipboard(methodSettings.account_number)}
                  >
                    <MdContentCopy size={18} />
                  </button>
                )}
              </div>
            </div>
            <div className="detail-row">
              <span className="label">IFSC Code:</span>
              <div className="value-with-copy">
                <span className="value">{methodSettings.ifsc_code || 'Not configured'}</span>
                {methodSettings.ifsc_code && (
                  <button 
                    type="button"
                    className="copy-btn"
                    onClick={() => copyToClipboard(methodSettings.ifsc_code)}
                  >
                    <MdContentCopy size={18} />
                  </button>
                )}
              </div>
            </div>
            <div className="detail-row">
              <span className="label">Bank Name:</span>
              <span className="value">{methodSettings.bank_name || 'Not configured'}</span>
            </div>
            {methodSettings.branch && (
              <div className="detail-row">
                <span className="label">Branch:</span>
                <span className="value">{methodSettings.branch}</span>
              </div>
            )}
          </div>
        );

      case 'usdt':
        return (
          <div className="usdt-details">
            <div className="detail-row">
              <span className="label">Network:</span>
              <span className="value">{methodSettings.network || 'TRC20'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Wallet Address:</span>
              <div className="value-with-copy">
                <span className="value">{methodSettings.wallet_address || 'Not configured'}</span>
                {methodSettings.wallet_address && (
                  <button 
                    type="button"
                    className="copy-btn"
                    onClick={() => copyToClipboard(methodSettings.wallet_address)}
                  >
                    <MdContentCopy size={18} />
                  </button>
                )}
              </div>
            </div>
            {methodSettings.qr_code_url && (
              <div className="qr-code-display">
                <p>📱 Scan QR Code</p>
                <img src={methodSettings.qr_code_url} alt="USDT QR Code" />
              </div>
            )}
          </div>
        );

      case 'hawala':
        return (
          <div className="hawala-details">
            <div className="info-box" style={{ marginBottom: '1rem' }}>
              <p>⚠️ <strong>Hawala Instructions:</strong></p>
              <p>Please complete the transfer and upload proof of slip with secret number.</p>
            </div>
            
            <div className="form-group">
              <label>From City *</label>
              <select
                value={hawalaData.fromCity}
                onChange={(e) => setHawalaData({...hawalaData, fromCity: e.target.value})}
                required
              >
                <option value="">Select City</option>
                {methodSettings.cities?.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>To City *</label>
              <select
                value={hawalaData.toCity}
                onChange={(e) => setHawalaData({...hawalaData, toCity: e.target.value})}
                required
              >
                <option value="">Select City</option>
                {methodSettings.cities?.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Company *</label>
              <select
                value={hawalaData.company}
                onChange={(e) => setHawalaData({...hawalaData, company: e.target.value})}
                required
              >
                <option value="">Select Company</option>
                {methodSettings.companies?.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Secret Number *</label>
              <input
                type="text"
                value={hawalaData.secretNumber}
                onChange={(e) => setHawalaData({...hawalaData, secretNumber: e.target.value})}
                placeholder="Enter secret number from slip"
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="deposit-container">
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

  // Get enabled payment methods - map 'bank' to 'bank_transfer' for display
  const enabledMethods = paymentSettings ? Object.keys(paymentSettings)
    .filter(key => paymentSettings[key]?.enabled)
    .map(key => key === 'bank' ? 'bank_transfer' : key)
    : [];

  console.log('✅ Enabled payment methods:', enabledMethods);

  return (
    <div className="deposit-container">
      <div className="deposit-header">
        <div>
          <h1>Deposit Funds</h1>
          <p>Add money to your trading account</p>
        </div>
      </div>

      <div className="deposit-content">
        {/* Deposit Form */}
        <div className="deposit-form-section">
          <div className="form-card">
            <h2>Make a Deposit</h2>
            
            <form onSubmit={handleSubmit}>
              {/* MT5 Account Selection */}
              {mt5Accounts.length > 0 && (
                <div className="form-group">
                  <label>MT5 Account</label>
                  <select
                    value={selectedMt5Login}
                    onChange={(e) => setSelectedMt5Login(e.target.value)}
                    required
                  >
                    {mt5Accounts.map((account) => (
                      <option key={account.id} value={account.login_id}>
                        {account.login_id} - Balance: ${parseFloat(account.balance || 0).toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Amount */}
              <div className="form-group">
                <label>Deposit Amount ($)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount (Min: $1,000)"
                  min="1000"
                  required
                />
                <small>Minimum deposit: $1,000</small>
              </div>

              {/* Payment Method */}
              <div className="form-group">
                <label>Payment Method</label>
                <select 
                  value={method} 
                  onChange={(e) => {
                    console.log('💳 Method changed to:', e.target.value);
                    setMethod(e.target.value);
                    setUtrNumber('');
                    setHawalaData({
                      fromCity: '',
                      toCity: '',
                      company: '',
                      secretNumber: ''
                    });
                  }}
                  required
                >
                  {enabledMethods.includes('upi') && <option value="upi">💳 UPI</option>}
                  {enabledMethods.includes('bank_transfer') && <option value="bank_transfer">🏦 Bank Transfer</option>}
                  {enabledMethods.includes('usdt') && <option value="usdt">₿ USDT (Crypto)</option>}
                  {enabledMethods.includes('hawala') && <option value="hawala">🤝 Hawala</option>}
                </select>
              </div>

              {/* Payment Details Display */}
              <div className="payment-details-card">
                <h3>Payment Details</h3>
                {renderPaymentDetails()}
              </div>

              {/* UTR/Transaction Reference (for non-hawala) */}
              {method !== 'hawala' && (
                <div className="form-group">
                  <label>
                    {method === 'usdt' ? 'Transaction Hash' : 'UTR/Transaction Reference'} (Optional)
                  </label>
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder={method === 'usdt' ? 'Enter transaction hash' : 'Enter UTR or transaction number'}
                  />
                </div>
              )}

              {/* Upload Proof */}
              <div className="form-group">
                <label>Upload Payment Proof *</label>
                <div className="file-upload-area">
                  {proofPreview ? (
                    <div className="file-preview">
                      <img src={proofPreview} alt="Payment proof" />
                      <button 
                        type="button"
                        className="remove-file"
                        onClick={() => {
                          setProofFile(null);
                          setProofPreview(null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="upload-label">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                      <MdCloudUpload size={48} />
                      <p>Click to upload or drag and drop</p>
                      <small>
                        {method === 'hawala' 
                          ? 'Upload slip with secret number visible' 
                          : 'PNG, JPG (Max 5MB)'}
                      </small>
                    </label>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={submitting || !currentUser || enabledMethods.length === 0}
              >
                {submitting ? 'Submitting...' : 'Submit Deposit Request'}
              </button>

              {!currentUser && (
                <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                  Please login to submit a deposit request
                </p>
              )}

              {enabledMethods.length === 0 && (
                <p style={{ color: 'orange', marginTop: '10px', textAlign: 'center' }}>
                  ⚠️ No payment methods available. Please contact support.
                </p>
              )}
            </form>

            <div className="info-note">
              <p>⚠️ <strong>Important:</strong> Please complete the payment first, then upload the proof and submit this form. Your deposit will be credited within 24 hours after verification.</p>
            </div>
          </div>
        </div>

        {/* Deposit History */}
        <div className="deposit-history-section">
          <div className="history-card">
            <h2>Deposit History</h2>
            
            {depositHistory.length === 0 ? (
              <div className="no-history">
                <p>No deposit history yet</p>
              </div>
            ) : (
              <div className="history-list">
                {depositHistory.map((deposit) => (
                  <div key={deposit.id} className="history-item">
                    <div className="history-icon">
                      {getStatusIcon(deposit.status)}
                    </div>
                    <div className="history-details">
                      <div className="history-amount">
                        ${parseFloat(deposit.amount).toLocaleString()}
                      </div>
                      <div className="history-method">
                        {deposit.payment_method.replace('_', ' ').toUpperCase()}
                      </div>
                      <div className="history-date">{formatDate(deposit.created_at)}</div>
                      {deposit.utr_number && (
                        <div className="history-utr">UTR: {deposit.utr_number}</div>
                      )}
                    </div>
                    <div className="history-status">
                      <span className={`status-badge status-${deposit.status.toLowerCase()}`}>
                        {deposit.status.toUpperCase()}
                      </span>
                      {deposit.status === 'rejected' && deposit.rejection_reason && (
                        <small className="rejection-reason">{deposit.rejection_reason}</small>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Info */}
          <div className="quick-info-card">
            <h3>💡 Quick Info</h3>
            <ul>
              <li>Minimum deposit: $1,000</li>
              <li>Processing time: Within 24 hours</li>
              <li>No deposit fees</li>
              <li>Instant credit after approval</li>
              <li>Multiple payment methods available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}