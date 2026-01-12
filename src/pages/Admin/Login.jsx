import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import '../../styles/Admin/Login.css';
import { loginUser } from '../../lib/supabase/helpers';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Use Supabase loginUser function
      const result = await loginUser({
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        // Success - store user data
        localStorage.setItem('user', JSON.stringify(result.profile));
        localStorage.setItem('isAuthenticated', 'true');
        
        alert(`✅ Welcome back, ${result.profile.first_name || 'User'}!`);
        
        // Redirect based on role
        if (result.profile.role === 'broker_admin' || result.profile.role === 'super_admin') {
          window.location.href = '/broker-admin/dashboard';
        } else {
          window.location.href = '/admin/dashboard';
        }
      } else {
        // Failed
        setError(`❌ ${result.error || 'Invalid email or password'}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('❌ An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality coming soon!');
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="login-page">
      {/* Back to Home Button */}
      <button className="back-to-home" onClick={handleBackToHome}>
        <FiArrowLeft /> Back to Home
      </button>

      <div className="login-container">
        <div className="login-left">
          <div className="login-branding">
            <h1 className="brand-logo">BNR Fx</h1>
            <p className="brand-tagline">Admin Portal</p>
          </div>
          <div className="login-illustration">
            <div className="illustration-circle"></div>
            <div className="illustration-icon">🔐</div>
          </div>
          <p className="login-welcome">
            Secure access to your broker management system
          </p>

          {/* Instructions */}
          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#fff' }}>
              🎯 Getting Started:
            </div>
            <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Create an account using the registration page</li>
              <li>Or use the test credentials if you've already set them up</li>
              <li>Complete your profile after logging in</li>
            </ol>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h2>Welcome Back</h2>
              <p>Enter your credentials to access the admin panel</p>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                padding: '12px',
                marginBottom: '20px',
                background: 'rgba(244, 67, 54, 0.1)',
                border: '1px solid rgba(244, 67, 54, 0.3)',
                borderRadius: '6px',
                color: '#f44336',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="forgot-password"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className={`btn-login ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="login-divider">
              <span>OR</span>
            </div>

            <div className="login-footer">
              <p>
                Don't have an account?{' '}
                <a href="/register" className="link-signup">
                  Register Now
                </a>
              </p>
            </div>

            <div className="login-security">
              <span className="security-badge">🛡️ Secured with Supabase Auth</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-page-footer">
        <p>© {new Date().getFullYear()} BNR Fx. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <span>•</span>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}

export default Login;