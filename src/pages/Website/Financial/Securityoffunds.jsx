import React from 'react';

const SecurityOfFunds = () => {
  return (
    <div className="security-of-funds">
      <style>{`
        .security-of-funds {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background: #f8f9fa;
        }
        
        .header {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: white;
          padding: 100px 20px;
          text-align: center;
        }
        
        .header h1 {
          font-size: 3.5rem;
          margin-bottom: 25px;
          font-weight: 700;
        }
        
        .header p {
          font-size: 1.4rem;
          opacity: 0.95;
          max-width: 900px;
          margin: 0 auto;
          line-height: 1.8;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 20px;
        }
        
        .intro-section {
          background: white;
          padding: 60px;
          margin-bottom: 50px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        .intro-section h2 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 30px;
          font-weight: 700;
        }
        
        .intro-section p {
          color: #555;
          font-size: 1.2rem;
          line-height: 2;
          margin-bottom: 25px;
        }
        
        .security-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 35px;
          margin: 60px 0;
        }
        
        .security-card {
          background: white;
          padding: 45px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          border-left: 5px solid #00ff88;
          transition: all 0.3s ease;
        }
        
        .security-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        }
        
        .security-icon {
          font-size: 3.5rem;
          margin-bottom: 20px;
        }
        
        .security-card h3 {
          color: #1a1a2e;
          font-size: 1.6rem;
          margin-bottom: 18px;
          font-weight: 600;
        }
        
        .security-card p {
          color: #666;
          font-size: 1.05rem;
          line-height: 1.8;
        }
        
        .commitment-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 70px;
          border-radius: 16px;
          color: white;
          margin: 60px 0;
        }
        
        .commitment-section h2 {
          font-size: 2.8rem;
          margin-bottom: 35px;
          font-weight: 700;
          text-align: center;
        }
        
        .commitment-list {
          list-style: none;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .commitment-list li {
          padding: 20px 0;
          padding-left: 50px;
          position: relative;
          font-size: 1.2rem;
          line-height: 1.8;
        }
        
        .commitment-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          font-weight: bold;
          font-size: 1.8rem;
          color: #00ff88;
        }
        
        .highlight-box {
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          padding: 60px;
          border-radius: 16px;
          text-align: center;
          margin: 50px 0;
        }
        
        .highlight-box h3 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 25px;
          font-weight: 700;
        }
        
        .highlight-box p {
          color: #1a1a2e;
          font-size: 1.3rem;
          font-weight: 600;
          line-height: 1.9;
        }
        
        .notice-box {
          background: #fff3cd;
          border-left: 5px solid #ffc107;
          padding: 40px;
          border-radius: 12px;
        }
        
        .notice-box h4 {
          color: #856404;
          font-size: 1.6rem;
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .notice-box p {
          color: #856404;
          font-size: 1.15rem;
          line-height: 1.9;
        }
        
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2.2rem;
          }
          
          .security-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="header">
        <h1>Security of Funds</h1>
        <p>Your capital protection is our highest priority</p>
      </div>
      
      <div className="container">
        <div className="intro-section">
          <h2>Our Commitment to Fund Security</h2>
          <p>The security of client funds is one of our highest priorities.</p>
          <p>As a Dubai-based forex trading company, we follow strict internal controls and globally recognized financial practices to ensure that client funds are handled with maximum safety, transparency, and integrity.</p>
        </div>
        
        <div className="security-grid">
          <div className="security-card">
            <div className="security-icon">🔐</div>
            <h3>Fund Segregation</h3>
            <p>Client funds are maintained in segregated accounts, separate from company operational funds. This ensures that client capital is protected and used solely for trading purposes.</p>
          </div>
          
          <div className="security-card">
            <div className="security-icon">🏦</div>
            <h3>Secure Banking Partners</h3>
            <p>We work with reputable banking and payment institutions that comply with international financial standards and security protocols.</p>
          </div>
          
          <div className="security-card">
            <div className="security-icon">🛡️</div>
            <h3>Risk Management Controls</h3>
            <p>Robust internal risk management systems are in place to monitor exposure, liquidity, and operational risk—ensuring stability even during high-volatility market conditions.</p>
          </div>
          
          <div className="security-card">
            <div className="security-icon">📋</div>
            <h3>Compliance & Monitoring</h3>
            <p>Strict KYC & AML policies, ongoing transaction monitoring, and regular internal audits help prevent fraud, misuse, and unauthorized access to client funds.</p>
          </div>
          
          <div className="security-card">
            <div className="security-icon">🔒</div>
            <h3>Data & Payment Security</h3>
            <p>All transactions and personal data are protected using advanced encryption technologies and secure infrastructure to safeguard client information.</p>
          </div>
          
          <div className="security-card">
            <div className="security-icon">📊</div>
            <h3>Transparency & Reporting</h3>
            <p>Clients have access to clear reporting, transaction records, and account activity at all times, ensuring complete transparency.</p>
          </div>
        </div>
        
        <div className="commitment-section">
          <h2>Our Commitment</h2>
          <ul className="commitment-list">
            <li>Client funds are handled with care and accountability</li>
            <li>Security standards are reviewed and upgraded regularly</li>
            <li>Protection of capital is treated as a core responsibility</li>
            <li>Operational and financial protection measures are continuously monitored</li>
            <li>Client interests are prioritized in all business decisions</li>
          </ul>
        </div>
        
        <div className="highlight-box">
          <h3>Trading involves market risk, but fund security should never be a concern.</h3>
          <p>While we cannot eliminate the inherent risks of forex trading, we ensure that your capital is protected from operational, security, and compliance risks.</p>
        </div>
        
        <div className="intro-section">
          <h2>Transparency & Responsibility</h2>
          <p>We are committed to ethical business practices and transparent operations. Clients have access to clear reporting, transaction records, and account activity at all times.</p>
          <p>Our compliance team regularly reviews and updates security protocols to ensure we maintain the highest standards of fund protection. We believe that transparency builds trust, and trust is the foundation of successful long-term partnerships.</p>
        </div>
        
        <div className="notice-box">
          <h4>⚠️ Important Notice</h4>
          <p>Forex trading carries risk, and market losses are possible. Fund security measures do not eliminate trading risk but ensure operational and financial protection.</p>
          <p>While we implement comprehensive measures to protect your capital from security breaches, fraud, and operational failures, we cannot protect against market risk inherent in forex trading. Please trade responsibly and only with capital you can afford to lose.</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityOfFunds;