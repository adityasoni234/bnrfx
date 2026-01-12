import React from 'react';
import '../../styles/Website/Spreads.css';

function Spreads() {
  return (
    <section className="partnership-section">
      <div className="container-wide">
        <div className="partnership-grid">
          {/* Visual Side */}
          <div className="partnership-visual">
            <div className="partnership-graphic">
              <div className="building-icon">
                <div className="building-structure">
                  <div className="building-roof"></div>
                  <div className="building-pillars">
                    <div className="pillar"></div>
                    <div className="pillar"></div>
                    <div className="pillar"></div>
                    <div className="pillar"></div>
                  </div>
                  <div className="building-base"></div>
                </div>
              </div>
              <div className="card-icon">
                <div className="credit-card">
                  <div className="card-chip"></div>
                  <div className="card-number">•••• •••• •••• ••••</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="partnership-content">
            <div className="partnership-badge">
              <span className="badge-icon-partner">🤝</span>
              <span>Become a Partner</span>
            </div>
            
            <h2 className="partnership-title">
              Introducing Brokers & Institutional Program
            </h2>
            
            <p className="partnership-subtitle">
              Maximize your earnings with industry-leading rebates and commissions.
            </p>
            
            <p className="partnership-description">
              At BNR Fx, our Institutional Programs are designed to empower your business growth. 
              Whether you're an Introducing Broker, Affiliate, White Label partner, Prime of Primes, 
              or Franchise Partner, we provide tailored solutions backed by trusted technology, deep 
              liquidity, and dedicated support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Spreads;