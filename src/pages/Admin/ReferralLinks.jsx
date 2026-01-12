import React, { useState, useEffect } from 'react';
import { FiShare2, FiCopy, FiCheck } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookMessenger, FaFacebookF } from 'react-icons/fa';
import '../../styles/Admin/ReferralLinks.css';
import { getCurrentUser } from '../../lib/supabase/helpers';

function ReferralLinks() {
  const [currentUser, setCurrentUser] = useState(null);
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      
      if (!user) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }

      setCurrentUser(user);
      
      // Get referral code from profile
      const code = user.profile?.referral_code || 'N/A';
      setReferralCode(code);
      
      // Generate referral link
      const baseUrl = window.location.origin;
      const link = `${baseUrl}/register?ref=${code}`;
      setReferralLink(link);

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const message = `Join me on StockVala trading platform! Use my referral link to get started: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShareMessenger = () => {
    window.open(`https://www.messenger.com/`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="referral-links-page">
        <div className="loading" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '18px'
        }}>
          Loading your referral link...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="referral-links-page">
        <div className="error-message" style={{ 
          textAlign: 'center', 
          padding: '50px',
          color: '#ef4444'
        }}>
          <h2>Please login to view your referral link</h2>
          <button 
            onClick={() => window.location.href = '/login'}
            style={{
              marginTop: '20px',
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

  return (
    <div className="referral-links-page">
      <div className="referral-content">
        <div className="referral-icon-container">
          <div className="referral-icon">
            <FiShare2 size={40} />
          </div>
        </div>

        <h1 className="referral-title">Your Referral Link</h1>
        <p className="referral-subtitle">
          Share this link to attract new clients and start earning commissions.
        </p>

        <div className="referral-section">
          <label className="section-label">Your unique link</label>
          <div className="link-input-group">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="referral-input"
            />
            <button className="btn-copy" onClick={handleCopy}>
              {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="share-section">
          <p className="share-text">Or share directly on:</p>
          <div className="social-buttons">
            <button 
              className="social-btn whatsapp" 
              onClick={handleShareWhatsApp}
              title="Share on WhatsApp"
            >
              <FaWhatsapp size={24} />
            </button>
            <button 
              className="social-btn messenger" 
              onClick={handleShareMessenger}
              title="Share on Messenger"
            >
              <FaFacebookMessenger size={24} />
            </button>
            <button 
              className="social-btn facebook" 
              onClick={handleShareFacebook}
              title="Share on Facebook"
            >
              <FaFacebookF size={24} />
            </button>
          </div>
        </div>

        <div className="info-box">
          <h3 className="info-title">How it works:</h3>
          <ul className="info-list">
            <li>Share your unique referral link with potential clients</li>
            <li>When they sign up using your link, they become your referred client</li>
            <li>Earn commissions on every trade they make</li>
            <li>Track all your referrals in the "Attracted Clients" section</li>
          </ul>
        </div>

        <div className="ib-code-section">
          <p className="ib-code-text">
            Your IB Code: <strong className="ib-code-value">{referralCode}</strong>
          </p>
          <p className="user-info">
            Logged in as: <strong>{currentUser.profile?.email}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReferralLinks;