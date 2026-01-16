import React from 'react';

const TradingConditions = () => {
  return (
    <div className="trading-conditions">
      <style>{`
        .trading-conditions { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .intro { background: white; padding: 60px; margin-bottom: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; }
        .intro h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 30px; font-weight: 700; }
        .intro p { color: #555; font-size: 1.2rem; line-height: 2; }
        .conditions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 35px; margin: 60px 0; }
        .condition-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); }
        .condition-card h3 { color: #1a1a2e; font-size: 1.6rem; margin-bottom: 25px; font-weight: 700; text-align: center; }
        .condition-item { padding: 15px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
        .condition-label { color: #666; font-weight: 600; }
        .condition-value { color: #00ff88; font-weight: 700; }
        @media (max-width: 768px) { .conditions-grid { grid-template-columns: 1fr; } }
      `}</style>
      
      <div className="header">
        <h1>Trading Conditions</h1>
        <p>Transparent specifications for all account types</p>
      </div>
      
      <div className="container">
        <div className="intro">
          <h2>Our Trading Conditions</h2>
          <p>BNR Fx offers competitive trading conditions across all account types. Review our specifications below to choose the account that best suits your trading style and goals.</p>
        </div>
        
        <div className="conditions-grid">
          <div className="condition-card">
            <h3>ENC Account</h3>
            <div className="condition-item"><span className="condition-label">Spreads From</span><span className="condition-value">0.0 pips</span></div>
            <div className="condition-item"><span className="condition-label">Commission</span><span className="condition-value">$3 per lot</span></div>
            <div className="condition-item"><span className="condition-label">Min Deposit</span><span className="condition-value">$500</span></div>
            <div className="condition-item"><span className="condition-label">Max Leverage</span><span className="condition-value">1:500</span></div>
            <div className="condition-item"><span className="condition-label">Min Lot Size</span><span className="condition-value">0.01</span></div>
            <div className="condition-item"><span className="condition-label">Execution</span><span className="condition-value">Market</span></div>
          </div>
          
          <div className="condition-card">
            <h3>Standard Account</h3>
            <div className="condition-item"><span className="condition-label">Spreads From</span><span className="condition-value">1.0 pips</span></div>
            <div className="condition-item"><span className="condition-label">Commission</span><span className="condition-value">$0</span></div>
            <div className="condition-item"><span className="condition-label">Min Deposit</span><span className="condition-value">$100</span></div>
            <div className="condition-item"><span className="condition-label">Max Leverage</span><span className="condition-value">1:1000</span></div>
            <div className="condition-item"><span className="condition-label">Min Lot Size</span><span className="condition-value">0.01</span></div>
            <div className="condition-item"><span className="condition-label">Execution</span><span className="condition-value">Instant</span></div>
          </div>
          
          <div className="condition-card">
            <h3>Premium Account</h3>
            <div className="condition-item"><span className="condition-label">Spreads From</span><span className="condition-value">0.5 pips</span></div>
            <div className="condition-item"><span className="condition-label">Commission</span><span className="condition-value">$0</span></div>
            <div className="condition-item"><span className="condition-label">Min Deposit</span><span className="condition-value">$5,000</span></div>
            <div className="condition-item"><span className="condition-label">Max Leverage</span><span className="condition-value">1:1000</span></div>
            <div className="condition-item"><span className="condition-label">Min Lot Size</span><span className="condition-value">0.01</span></div>
            <div className="condition-item"><span className="condition-label">Execution</span><span className="condition-value">Priority</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingConditions;