import React from 'react';
import '../../styles/Website/Features.css';

function Features() {
  const features = [
    {
      icon: '🎯',
      value: '0.0',
      label: 'Zero Spread',
      description: 'Zero spread reimagines markets, erasing bid-ask disparity and cost.'
    },
    {
      icon: '💰',
      value: '$100',
      label: 'Minimum Deposit',
      description: 'A $100 minimum deposit opens doors to the financial world.'
    },
    {
      icon: '⚡',
      value: '0.13s',
      label: 'Avg. Execution Time',
      description: 'Experience rapid trading with an average execution time of 0.13 seconds.'
    },
    {
      icon: '💳',
      value: '0.0%',
      label: 'Deposit Fee',
      description: 'Enjoy hassle-free transactions with a 0.0% deposit fee.'
    },
    {
      icon: '🏦',
      value: '$1',
      label: 'Withdrawal Fee',
      description: 'Retain 100% of your earnings with a $1 withdrawal fee.'
    },
    {
      icon: '📊',
      value: '1:500',
      label: 'Minimum Leverage',
      description: 'Unlock unparalleled trading power with a minimum leverage of up to 1:500.'
    }
  ];

  return (
    <section className="features-section" id="features">
      <div className="container-wide">
        {/* Section Header */}
        <div className="features-header">
          <h2 className="features-title">Start forex trading</h2>
          <p className="features-subtitle">
            Access to over 100 major, cross, and exotic Forex pairs. Benefit from some of the tightest 
            spreads in the industry, ensuring more cost-effective trading and greater profit potential. 
            Whether you're a beginner or an experienced trader, our platform provides the diverse options 
            and competitive rates you need to succeed in the dynamic Forex market.
          </p>
        </div>

        {/* Mobile Mockup */}
        <div className="mobile-mockup-container">
          <div className="phone-mockup-left">
            <div className="phone-screen">
              <div className="trading-app-interface">
                <div className="app-header">
                  <span className="app-time">9:41</span>
                  <span className="app-status">📶 🔋</span>
                </div>
                <div className="trading-chart">
                  <div className="chart-placeholder">
                     <img src="/logo.png" alt="BNR Fx"  width="150" height="auto"/>
                  </div>
                </div>
                <div className="trading-pairs">
                  <div className="pair-item">
                    <span className="pair-name">EUR/USD</span>
                    <span className="pair-price">1.1769</span>
                  </div>
                  <div className="pair-item">
                    <span className="pair-name">AUX/USD</span>
                    <span className="pair-price">1.1769</span>
                  </div>
                  <div className="pair-item">
                    <span className="pair-name">JYP/USD</span>
                    <span className="pair-price">1.1769</span>
                  </div>
                  <div className="pair-item">
                    <span className="pair-name">AUU/USD</span>
                    <span className="pair-price">1.1769</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="phone-mockup-right">
            <div className="phone-screen">
              <div className="trading-app-interface">
                <div className="app-header">
                  <span className="app-time">9:41</span>
                  <span className="app-status">📶 🔋</span>
                </div>
                <div className="account-balance">
                  <h3>Account Balance</h3>
                  <p className="balance-amount">$12,450.00</p>
                </div>
                <div className="quick-actions">
                  <button className="action-btn buy">Buy</button>
                  <button className="action-btn sell">Sell</button>
                </div>
                
              </div>
               <div className="trading-chart">
                  <div className="chart-placeholder">
                     <img src="/logo.png" alt="BNR Fx"  width="150" height="auto"/>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-value">{feature.value}</div>
              <h3 className="feature-label">{feature.label}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Scrolling Feature Banner */}
        <div className="scrolling-features">
          <div className="scroll-content">
            {[...features, ...features].map((feature, index) => (
              <div className="scroll-item" key={index}>
                <span className="scroll-icon">{feature.icon}</span>
                <span className="scroll-value">{feature.value}</span>
                <span className="scroll-label">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;