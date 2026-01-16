import React from 'react';

const NegativeBalanceProtection = () => {
  return (
    <div className="negative-balance-protection">
      <style>{`
        .negative-balance-protection {
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
        
        .how-it-works {
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          padding: 70px;
          border-radius: 16px;
          margin: 60px 0;
        }
        
        .how-it-works h2 {
          color: #1a1a2e;
          font-size: 2.8rem;
          margin-bottom: 35px;
          font-weight: 700;
          text-align: center;
        }
        
        .protection-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }
        
        .protection-card {
          background: rgba(26,26,46,0.9);
          color: white;
          padding: 35px;
          border-radius: 12px;
          text-align: center;
        }
        
        .protection-icon {
          font-size: 3.5rem;
          margin-bottom: 20px;
        }
        
        .protection-card h4 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .protection-card p {
          font-size: 1.05rem;
          line-height: 1.7;
          opacity: 0.95;
        }
        
        .benefits-section {
          background: white;
          padding: 60px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          margin: 60px 0;
        }
        
        .benefits-section h2 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 35px;
          font-weight: 700;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 35px;
          margin-top: 40px;
        }
        
        .benefit-card {
          background: #f8f9fa;
          padding: 35px;
          border-radius: 10px;
          border-left: 4px solid #00ff88;
        }
        
        .benefit-card h4 {
          color: #1a1a2e;
          font-size: 1.4rem;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .benefit-card p {
          color: #666;
          font-size: 1.05rem;
          line-height: 1.7;
        }
        
        .transparency-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 70px;
          border-radius: 16px;
          color: white;
          margin: 60px 0;
          text-align: center;
        }
        
        .transparency-section h2 {
          font-size: 2.5rem;
          margin-bottom: 30px;
          font-weight: 700;
        }
        
        .transparency-section p {
          font-size: 1.2rem;
          line-height: 2;
          max-width: 900px;
          margin: 0 auto 20px;
          opacity: 0.95;
        }
        
        .commitment-box {
          background: white;
          padding: 60px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          margin: 60px 0;
        }
        
        .commitment-box h2 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 35px;
          font-weight: 700;
        }
        
        .commitment-list {
          list-style: none;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .commitment-list li {
          padding: 20px 0;
          padding-left: 50px;
          position: relative;
          font-size: 1.15rem;
          color: #555;
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
          background: #e7f3ff;
          border-left: 5px solid #0066cc;
          padding: 40px;
          border-radius: 12px;
          margin: 50px 0;
        }
        
        .highlight-box h3 {
          color: #0066cc;
          font-size: 1.8rem;
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .highlight-box p {
          color: #004080;
          font-size: 1.15rem;
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
          
          .intro-section {
            padding: 35px;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="header">
        <h1>Negative Balance Protection</h1>
        <p>Trade with confidence – you can never lose more than you deposit</p>
      </div>
      
      <div className="container">
        <div className="intro-section">
          <h2>Your Protection is Our Priority</h2>
          <p>We are committed to protecting our clients from excessive risk. Our Negative Balance Protection policy ensures that traders can never lose more than the funds available in their trading account.</p>
          <p>This feature is designed to provide peace of mind, especially during high-volatility market conditions.</p>
        </div>
        
        <div className="how-it-works">
          <h2>How Negative Balance Protection Works</h2>
          <div className="protection-features">
            <div className="protection-card">
              <div className="protection-icon">🛡️</div>
              <h4>Protected Accounts</h4>
              <p>Client accounts are protected from going below zero balance</p>
            </div>
            
            <div className="protection-card">
              <div className="protection-icon">💰</div>
              <h4>Limited Losses</h4>
              <p>Losses are limited to the total deposited amount in your account</p>
            </div>
            
            <div className="protection-card">
              <div className="protection-icon">🔄</div>
              <h4>Automatic Reset</h4>
              <p>In extreme market situations, negative balances are automatically reset to zero</p>
            </div>
            
            <div className="protection-card">
              <div className="protection-icon">✅</div>
              <h4>No Debt Obligation</h4>
              <p>Clients are not required to repay losses beyond their account balance</p>
            </div>
          </div>
        </div>
        
        <div className="benefits-section">
          <h2>Why It Matters</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h4>🌪️ Market Gap Protection</h4>
              <p>Protects traders from unexpected market gaps and extreme volatility events that can cause rapid account depletion.</p>
            </div>
            
            <div className="benefit-card">
              <h4>💳 No Debt Liability</h4>
              <p>Prevents debt or liabilities beyond deposits, ensuring you never owe money to the broker.</p>
            </div>
            
            <div className="benefit-card">
              <h4>📊 Disciplined Risk Management</h4>
              <p>Supports disciplined risk management by providing a clear maximum loss threshold.</p>
            </div>
            
            <div className="benefit-card">
              <h4>🧘 Enhanced Confidence</h4>
              <p>Trade with greater confidence knowing your maximum risk is clearly defined and limited.</p>
            </div>
          </div>
          
          <p style={{marginTop: '40px', fontSize: '1.2rem', color: '#555', lineHeight: '1.9', textAlign: 'center'}}>Negative Balance Protection is a key part of our client-first risk management approach.</p>
        </div>
        
        <div className="transparency-section">
          <h2>Transparency & Fair Use</h2>
          <p>This protection applies under normal trading conditions and in accordance with company policies. It does not encourage reckless trading or abuse of trading systems.</p>
          <p>Accounts found violating trading rules or engaging in abusive practices may not be eligible for protection.</p>
          <p style={{fontSize: '1.3rem', fontWeight: 600, marginTop: '30px'}}>We reserve the right to review and determine eligibility on a case-by-case basis to prevent system abuse.</p>
        </div>
        
        <div className="commitment-box">
          <h2>Our Commitment to Trader Safety</h2>
          <ul className="commitment-list">
            <li>Client protection is a priority in all market conditions</li>
            <li>Risk controls are continuously monitored and updated</li>
            <li>Trading environment is built on fairness and transparency</li>
            <li>Balance protection is applied automatically without manual intervention</li>
            <li>Clear communication about protection terms and conditions</li>
          </ul>
        </div>
        
        <div className="highlight-box">
          <h3>Peace of Mind for Traders</h3>
          <p>While trading always carries market risk, your account will never fall into debt. This protection ensures that forex trading remains an opportunity for profit without the fear of owing money to your broker.</p>
          <p style={{marginTop: '15px', fontWeight: 600}}>Trade with defined risk and sleep soundly knowing your maximum loss is limited to your deposit.</p>
        </div>
        
        <div className="notice-box">
          <h4>⚠️ Important Notice</h4>
          <p>Negative Balance Protection is subject to terms and conditions. Forex trading involves risk and may not be suitable for all investors.</p>
          <p style={{marginTop: '15px'}}>While this protection prevents negative account balances, it does not eliminate the risk of losing your entire deposited capital. Please trade responsibly, use appropriate risk management, and never invest more than you can afford to lose.</p>
        </div>
      </div>
    </div>
  );
};

export default NegativeBalanceProtection;