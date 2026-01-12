import React from 'react';
import '../../styles/Website/AccountTypes.css';

function AccountTypes() {
  const accounts = [
    {
      badge: 'Beginner',
      icon: '⭐',
      name: 'Standard',
      subtitle: 'For Beginners',
      minDeposit: '$100',
      features: [
        'For MT4',
        'Leverage Up to 500:1',
        'Spread Starts From 1.5 Pips',
        'Social Trading (MAM / PAMM)',
        '24X7 Technical & Account Support'
      ],
      color: '#ffd700',
      popular: false
    },
    {
      badge: 'Popular',
      icon: '🏆',
      name: 'Premium',
      subtitle: 'Most Popular',
      minDeposit: '$1000',
      features: [
        'For MT4',
        'Leverage Up to 500:1',
        'Spread Starts From 0.8 Pips',
        'Social Trading (MAM / PAMM)',
        '24X7 Technical & Account Support'
      ],
      color: '#ffd700',
      popular: true
    },
    {
      badge: 'Trader',
      icon: '👑',
      name: 'ECN',
      subtitle: 'For Trader',
      minDeposit: '$5000',
      features: [
        'For MT4',
        'Leverage Up to 500:1',
        'Spread Starts From 0.0 Pips',
        'Social Trading (MAM / PAMM)',
        '24X7 Technical & Account Support'
      ],
      color: '#ffd700',
      popular: false
    }
  ];

  return (
    <section className="account-types-section" id="accounts">
      <div className="container-wide">
        <div className="account-types-header">
          <h2 className="account-types-title">Account Types.</h2>
          <p className="account-types-subtitle">Choose the right account as per your need.</p>
        </div>

        <div className="accounts-grid">
          {accounts.map((account, index) => (
            <div 
              key={index} 
              className={`account-card ${account.popular ? 'popular' : ''}`}
            >
              {account.popular && (
                <div className="popular-ribbon">POPULAR</div>
              )}
              
              <div className="account-header">
                <div className="account-badge">
                  <span className="badge-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="badge-text">{account.badge}</span>
                </div>
                
                <div className="account-icon">{account.icon}</div>
              </div>

              <div className="account-info">
                <h3 className="account-name">{account.name}</h3>
                <p className="account-subtitle">{account.subtitle}</p>
              </div>

              <div className="account-pricing">
                <div className="price-amount">{account.minDeposit}</div>
                <div className="price-label">Minimum</div>
              </div>

              <div className="account-features">
                {account.features.map((feature, idx) => (
                  <div key={idx} className="account-feature">
                    <span className="feature-check">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="account-terms">
                · Terms & Conditions Apply
              </div>

              <button className="btn-open-account">
                Open Live Account
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AccountTypes;