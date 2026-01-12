import React from 'react';
import '../../styles/Website/Partners.css';

function Partners() {
  return (
    <section className="partners" id="partners">
      <div className="container">
        <h2 className="section-title">Become an IB Partner</h2>
        <p className="section-subtitle">Earn competitive rebates and grow with us</p>
        
        <div className="benefits">
          <div className="benefit">
            <div className="benefit-icon">💰</div>
            <h3>Competitive Rebates</h3>
            <p>Earn up to $8 per lot on every trade your clients make</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">📊</div>
            <h3>Real-time Tracking</h3>
            <p>Monitor your referrals and earnings with our partner dashboard</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">📅</div>
            <h3>Monthly Payouts</h3>
            <p>Automatic rebate payments on the 1st of every month</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">👤</div>
            <h3>Dedicated Manager</h3>
            <p>Personal account manager for support and strategy guidance</p>
          </div>
        </div>

        <div className="commission-example">
          <h3>Sample Commission Structure</h3>
          <ul>
            <li><strong>Master IB:</strong> $5-6 per lot</li>
            <li><strong>Super Master IB:</strong> $7-8 per lot</li>
          </ul>
        </div>

        <button className="btn btn-apply">Apply as Partner</button>
      </div>
    </section>
  );
}

export default Partners;