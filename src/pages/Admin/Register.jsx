import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import '../../styles/Admin/Login.css';
import { registerUser } from '../../lib/supabase/helpers';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('❌ Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('❌ Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const result = await registerUser({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        referralCode: formData.referralCode || null
      });

      if (result.success) {
        setSuccess(true);
        // Don't show alert, just show success screen
      } else {
        setError(`❌ ${result.error || 'Registration failed'}`);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('❌ An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-right" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="login-form-wrapper" style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
              <h2>Registration Successful!</h2>
              <p style={{ marginTop: '20px', color: '#666', marginBottom: '30px' }}>
                Your account has been created successfully!<br/>
                You can now login to your account.
              </p>
              <button 
                onClick={() => window.location.href = '/login'}
                style={{
                  padding: '12px 30px',
                  background: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <button className="back-to-home" onClick={() => window.location.href = '/'}>
        <FiArrowLeft /> Back to Home
      </button>

      <div className="login-container">
        <div className="login-left">
          <div className="login-branding">
            <h1 className="brand-logo">BNR Fx</h1>
            <p className="brand-tagline">Create Your Account</p>
          </div>
          <div className="login-illustration">
            <div className="illustration-circle"></div>
            <div className="illustration-icon">📝</div>
          </div>
          <p className="login-welcome">
            Join thousands of traders worldwide
          </p>
        </div>

        <div className="login-right">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h2>Create Account</h2>
              <p>Fill in your details to get started</p>
            </div>

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
             <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="referralCode">Referral Code (Optional)</label>
                <input
                  type="text"
                  id="referralCode"
                  name="referralCode"
                  placeholder="Enter referral code if you have one"
                  value={formData.referralCode}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className={`btn-login ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="login-divider">
              <span>OR</span>
            </div>

            <div className="login-footer">
              <p>
                Already have an account?{' '}
                <a href="/login" className="link-signup">
                  Login Here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;