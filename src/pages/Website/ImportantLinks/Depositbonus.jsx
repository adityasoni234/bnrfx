import React from 'react';

const DepositBonus = () => {
  return (
    <div className="deposit-bonus">
      <style>{`
        .deposit-bonus {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background: #f8f9fa;
        }
        
        .header {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          color: #1a1a2e;
          padding: 100px 20px;
          text-align: center;
        }
        
        .header h1 {
          font-size: 4rem;
          margin-bottom: 25px;
          font-weight: 800;
        }
        
        .header .bonus-amount {
          font-size: 5rem;
          font-weight: 900;
          margin: 30px 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        
        .header p {
          font-size: 1.5rem;
          font-weight: 600;
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 70px;
          border-radius: 16px;
          color: white;
          margin-bottom: 50px;
        }
        
        .how-it-works h2 {
          font-size: 2.8rem;
          margin-bottom: 40px;
          font-weight: 700;
          text-align: center;
        }
        
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 35px;
          margin-top: 40px;
        }
        
        .step-card {
          background: rgba(255,255,255,0.1);
          padding: 35px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          text-align: center;
        }
        
        .step-number {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          color: #1a1a2e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          margin: 0 auto 20px;
        }
        
        .step-card h4 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .step-card p {
          font-size: 1.05rem;
          line-height: 1.7;
          opacity: 0.95;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 35px;
          margin: 60px 0;
        }
        
        .feature-card {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          border-top: 5px solid #FFD700;
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        }
        
        .feature-icon {
          font-size: 3.5rem;
          margin-bottom: 20px;
        }
        
        .feature-card h3 {
          color: #1a1a2e;
          font-size: 1.5rem;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .feature-card p {
          color: #666;
          font-size: 1.05rem;
          line-height: 1.7;
        }
        
        .conditions-section {
          background: white;
          padding: 60px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          margin-bottom: 50px;
        }
        
        .conditions-section h2 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 35px;
          font-weight: 700;
        }
        
        .conditions-list {
          list-style: none;
          margin-top: 30px;
        }
        
        .conditions-list li {
          padding: 20px;
          border-bottom: 1px solid #eee;
          font-size: 1.15rem;
          color: #555;
          position: relative;
          padding-left: 50px;
        }
        
        .conditions-list li:before {
          content: "✓";
          color: #FFD700;
          font-weight: bold;
          font-size: 1.5rem;
          position: absolute;
          left: 15px;
        }
        
        .warning-box {
          background: #fff3cd;
          border-left: 5px solid #ffc107;
          padding: 40px;
          border-radius: 12px;
          margin: 50px 0;
        }
        
        .warning-box h4 {
          color: #856404;
          font-size: 1.6rem;
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .warning-box p {
          color: #856404;
          font-size: 1.15rem;
          line-height: 1.9;
          margin-bottom: 15px;
        }
        
        .cta-section {
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          padding: 80px;
          text-align: center;
          border-radius: 16px;
        }
        
        .cta-section h2 {
          color: #1a1a2e;
          font-size: 3rem;
          margin-bottom: 25px;
          font-weight: 800;
        }
        
        .cta-section p {
          color: #1a1a2e;
          font-size: 1.4rem;
          margin-bottom: 40px;
          font-weight: 600;
        }
        
        .cta-button {
          display: inline-block;
          padding: 22px 70px;
          background: #1a1a2e;
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-size: 1.4rem;
          font-weight: 700;
          transition: transform 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .cta-button:hover {
          transform: scale(1.08);
        }
        
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2.5rem;
          }
          
          .header .bonus-amount {
            font-size: 3rem;
          }
          
          .intro-section {
            padding: 35px;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="header">
        <h1>Boost Your Trading</h1>
        <div className="bonus-amount">20% BONUS</div>
        <p>Enhance your trading potential with additional margin support</p>
      </div>
      
      <div className="container">
        <div className="intro-section">
          <h2>20% Trading Bonus</h2>
          <p>Boost your trading potential with our 20% Trading Bonus, designed to provide additional margin support and enhanced trading flexibility.</p>
          <p>This bonus is offered to help traders manage trades more efficiently while maintaining responsible risk management and disciplined trading practices.</p>
          <p>The bonus is structured to support trading, not to encourage excessive risk.</p>
        </div>
        
        <div className="how-it-works">
          <h2>How the 20% Bonus Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h4>Make a Deposit</h4>
              <p>Deposit funds into your eligible trading account</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <h4>Get 20% Bonus</h4>
              <p>Receive an automatic 20% bonus on your deposit amount</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <h4>Enhanced Margin</h4>
              <p>Bonus increases your margin availability for trading</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">4</div>
              <h4>Trade Efficiently</h4>
              <p>Manage more positions with improved flexibility</p>
            </div>
          </div>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Automatic Application</h3>
            <p>Bonus is applied automatically on eligible accounts without any manual action required.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>No Hidden Charges</h3>
            <p>Transparent bonus structure with clear terms and no surprise fees or conditions.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Enhanced Exposure</h3>
            <p>Bonus enhances margin availability and trade exposure during market opportunities.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Disciplined Trading</h3>
            <p>Designed for responsible traders who practice proper risk management.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Volatile Market Support</h3>
            <p>Supports better trade execution during volatile market conditions.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Clear Terms</h3>
            <p>Transparent terms and conditions with no complicated requirements.</p>
          </div>
        </div>
        
        <div className="conditions-section">
          <h2>Important Conditions</h2>
          <ul className="conditions-list">
            <li>Bonus cannot be withdrawn as cash</li>
            <li>Profits generated from bonus-supported trades may be withdrawable (subject to terms)</li>
            <li>Bonus may be removed if trading rules or compliance policies are violated</li>
            <li>Offer may vary based on account type or jurisdiction</li>
            <li>Bonus is for trading purposes only and enhances margin capability</li>
            <li>Terms and conditions apply - please read carefully before accepting</li>
          </ul>
        </div>
        
        <div className="warning-box">
          <h4>⚠️ Responsible Trading Policy</h4>
          <p>We strongly encourage traders to use the bonus as a risk-management tool, not as leverage for aggressive or reckless trading. Forex trading involves risk, and bonus offers do not eliminate market exposure.</p>
          <p>The bonus is designed to provide additional flexibility for disciplined traders, not to encourage over-leveraged positions or excessive risk-taking.</p>
          <p><strong>Remember:</strong> Successful trading requires patience, discipline, and sound risk management—regardless of bonuses or incentives.</p>
        </div>
        
        <div className="warning-box" style={{background: '#f8d7da', borderColor: '#dc3545'}}>
          <h4 style={{color: '#721c24'}}>⚠️ Disclaimer</h4>
          <p style={{color: '#721c24'}}>Bonus offers are subject to terms and conditions and may change without prior notice. Forex trading involves risk and may not be suitable for all investors.</p>
          <p style={{color: '#721c24'}}>Trading with bonuses does not reduce market risk or guarantee profitability. Please ensure you fully understand the terms before accepting any bonus offer.</p>
        </div>
        
        <div className="cta-section">
          <h2>Claim Your 20% Bonus Today</h2>
          <p>Start trading with enhanced margin support and take advantage of market opportunities</p>
          <a href="#" className="cta-button">Open Trading Account</a>
        </div>
      </div>
    </div>
  );
};

export default DepositBonus;