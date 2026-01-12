import React from 'react';
import '../../styles/Website/Platforms.css';

function Platforms() {
  return (
    <section className="platforms-app-section" id="platforms">
      <div className="container-wide">
        <div className="platforms-app-grid">
          {/* Mobile Phones Image */}
          <div className="phones-showcase">
            <div className="phone-device phone-left">
              <div className="phone-notch"></div>
              <div className="phone-content">
                <div className="app-interface">
                  <div className="app-logo"><img src="/logo.png" alt="BNR Fx"  width="100" height="auto"/></div>
                  <h3>BNR Fx</h3>
                  <p className="app-tagline">Your Partner in Profitable Forex Trading</p>
                  <p className="app-description">Turn market opportunities into real result</p>
                  <div className="app-features-list">
                    <p>At BNR Fx, we combine cutting-edge technology with deep market insights to help you maximize profits, manage risks, and stay ahead in the ever-changing forex landscape.</p>
                  </div>
                  <div className="app-buttons">
                    <div className="store-button google-play">
                      <span className="store-icon">▶</span>
                      <div>
                        <div className="store-text-small">Get it on</div>
                        <div className="store-text-large">Google Play</div>
                      </div>
                    </div>
                    <div className="store-button app-store">
                      <span className="store-icon">▶</span>
                      <div>
                        <div className="store-text-small">Download on the</div>
                        <div className="store-text-large">App Store</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="phone-device phone-right">
              <div className="phone-notch"></div>
              <div className="phone-content">
                <div className="trading-interface-display">
                  <div className="chart-display">
                    <div className="chart-line"></div>
                  </div>
                  <div className="trading-buttons">
                    <button className="trade-btn buy-btn">Buy</button>
                    <button className="trade-btn sell-btn">Sell</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="floating-icon icon-euro">€</div>
            <div className="floating-icon icon-dollar">$</div>
          </div>

          {/* Content */}
          <div className="platforms-app-content">
            <h2 className="platforms-app-title">Download Our App!</h2>
            <p className="platforms-app-description">
              Unlock the power of trading on the go with our intuitive Forex app! Seamlessly manage your 
              investments, access real-time market data, and execute trades with ease, all from the 
              convenience of your mobile device. Download now to stay ahead of the market trends and take 
              control of your financial future.
            </p>
            
            <div className="app-benefits">
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Broker Regulation and Market Reputation</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Spread Fees and Slippage Frequency</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Commissions for RAW/ECN accounts</span>
              </div>
            </div>

            <div className="download-badges">
              <div className="download-badge">
                <div className="badge-icon">▶</div>
                <div className="badge-text">
                  <div className="badge-small">GET IT ON</div>
                  <div className="badge-large">Google Play</div>
                </div>
                <div className="coming-soon">Coming Soon</div>
              </div>
              
              <div className="download-badge">
                <div className="badge-icon">▶</div>
                <div className="badge-text">
                  <div className="badge-small">Download on the</div>
                  <div className="badge-large">App Store</div>
                </div>
                <div className="coming-soon">Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Platforms;