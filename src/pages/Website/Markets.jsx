import React from 'react';
import '../../styles/Website/Markets.css';

function Markets() {
  return (
    <section className="markets-investing-section" id="markets">
      <div className="container-wide">
        <div className="markets-investing-grid">
          {/* Content */}
          <div className="markets-investing-content">
            <h2 className="markets-investing-title">Investing Redefined</h2>
            <p className="markets-investing-subtitle">
              Experience smarter, faster mobile trading tailored for the modern investor.
            </p>
            
            <div className="investing-features">
              <div className="investing-feature-item">
                <span className="feature-check-icon">✓</span>
                <span>Trade effortlessly anytime, anywhere..</span>
              </div>
              <div className="investing-feature-item">
                <span className="feature-check-icon">✓</span>
                <span>Access diverse markets seamlessly within a single platform.</span>
              </div>
              <div className="investing-feature-item">
                <span className="feature-check-icon">✓</span>
                <span>Benefit from an intuitive, user-friendly interface.</span>
              </div>
              <div className="investing-feature-item">
                <span className="feature-check-icon">✓</span>
                <span>Stay informed with personalized, real-time market updates.</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="markets-visual">
            <div className="devices-showcase">
              <div className="device-phone-large">
                <div className="phone-frame">
                  <div className="phone-screen-content">
                    <div className="trading-app-display">
                      <div className="app-stocks">
                        <div className="stock-item apple">
                          <div className="stock-logo"></div>
                          <div className="stock-info">
                            <span className="stock-name">EUR / USD</span>
                            <span className="stock-price">1.1769</span>
                          </div>
                        </div>
                        
                      </div>
                      <div className="app-stocks">
                        <div className="stock-item apple">
                          <div className="stock-logo"></div>
                          <div className="stock-info">
                            <span className="stock-name">GBP / USD</span>
                            <span className="stock-price">1.2634</span>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="device-phone-medium">
                <div className="phone-frame-small">
                  <div className="balance-display">
                    <div className="balance-icon">💰</div>
                    <div className="balance-info">
                      <div className="balance-label">Quick Balance</div>
                      <div className="balance-amount">62,357.15 <span>USD</span></div>
                      <div className="balance-change">+1,206.86</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="floating-elements">
                <div className="float-element coin">💰</div>
                <div className="float-element chart">📊</div>
                <div className="float-element arrow">↗️</div>
                <div className="float-element bolt">⚡</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Markets;