import React from 'react';
import '../../styles/Website/AccountModal.css';

function AccountModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>Open An Account</h2>
          <p>Start your trading journey today!</p>
        </div>

        <div className="modal-body">
          <form className="account-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="Enter your phone number" required />
            </div>

            <div className="form-group">
              <label>Country</label>
              <select required>
                <option value="">Select your country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="in">India</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Account Type</label>
              <select required>
                <option value="">Select account type</option>
                <option value="standard">Standard Account</option>
                <option value="premium">Premium Account</option>
                <option value="ecn">ECN Account</option>
              </select>
            </div>

            <div className="form-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the Terms & Conditions and Privacy Policy
              </label>
            </div>

            <button type="submit" className="btn-submit-account">
              Create Account
            </button>
          </form>

          <div className="modal-footer">
            <p>Already have an account? <a href="/login">Login here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountModal;