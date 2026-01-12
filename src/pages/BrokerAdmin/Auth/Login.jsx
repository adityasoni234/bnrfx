import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock, MdArrowBack } from 'react-icons/md';
import './Login.css';

export default function BrokerLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hardcoded admin credentials
  const ADMIN_EMAIL = 'admin@rhynofx.com';
  const ADMIN_PASSWORD = 'Rhynofx@xyz#';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate credentials
      if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
        console.log('✅ Broker admin login successful');
        
        // Store admin session
        localStorage.setItem('brokerAdmin', JSON.stringify({
          email: ADMIN_EMAIL,
          role: 'broker_admin',
          loginTime: new Date().toISOString()
        }));
        localStorage.setItem('isBrokerAuthenticated', 'true');
        
        // Small delay for UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Redirect to dashboard
        navigate('/broker-admin/dashboard');
      } else {
        console.log('❌ Invalid credentials');
        setError('Invalid email or password. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="broker-login-container">
      {/* Back to Home Button */}
      <button className="back-to-home-btn" onClick={handleBackToHome}>
        <MdArrowBack /> Back to Home
      </button>

      <div className="broker-login-box">
        {/* Logo/Header */}
        <div className="login-header">
          <div className="logo-wrapper">
            <img src="/logo.jpeg" alt="RhynoFX" className="broker-logo" />
          </div>
          <h1>
            <span className="brand-rhyno">BNR</span>
            <span className="brand-fx">FX</span>
          </h1>
          <p className="subtitle">Broker Admin Portal</p>
          <div className="security-badge">
            🛡️ Secure Admin Access
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="error-alert">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Admin Email Address</label>
            <div className="input-group">
              <MdEmail className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="admin@rhynofx.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-group">
              <MdLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              <>
                🔐 Login to Admin Panel
              </>
            )}
          </button>
        </form>

        {/* Info Footer */}
        <div className="login-footer">
          <div className="info-box">
            <p className="info-title">🔒 Admin Access Only</p>
            <p className="info-text">
              This portal is restricted to authorized broker administrators only.
            </p>
          </div>
          
          <div className="login-help">
            <p>Having trouble logging in?</p>
            <a href="mailto:support@rhynofx.com">Contact Support</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="page-footer">
        <p>© {new Date().getFullYear()} BNRFx. All rights reserved.</p>
      </div>
    </div>
  );
}