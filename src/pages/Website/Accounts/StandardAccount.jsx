import React from 'react';

const StandardAccount = () => {
  return (
    <div className="standard-account">
      <style>{`
        .standard-account { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); color: #1a1a2e; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .header p { font-size: 1.4rem; font-weight: 600; max-width: 900px; margin: 0 auto; line-height: 1.8; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .intro { background: white; padding: 60px; margin-bottom: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .intro h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 30px; font-weight: 700; }
        .intro p { color: #555; font-size: 1.2rem; line-height: 2; margin-bottom: 20px; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 35px; margin: 60px 0; }
        .feature-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); border-top: 5px solid #00ff88; transition: all 0.3s ease; }
        .feature-card:hover { transform: translateY(-8px); }
        .feature-icon { font-size: 3.5rem; margin-bottom: 20px; }
        .feature-card h3 { color: #1a1a2e; font-size: 1.5rem; margin-bottom: 15px; font-weight: 600; }
        .feature-card p { color: #666; font-size: 1.05rem; line-height: 1.7; }
        .specs { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 70px; border-radius: 16px; margin: 60px 0; color: white; }
        .specs h2 { font-size: 2.5rem; margin-bottom: 40px; font-weight: 700; text-align: center; }
        .specs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; }
        .spec-item { background: rgba(255,255,255,0.1); padding: 30px; border-radius: 12px; text-align: center; }
        .spec-value { font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; }
        .cta { background: white; padding: 70px; text-align: center; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .cta-button { display: inline-block; padding: 20px 60px; background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); color: #1a1a2e; text-decoration: none; border-radius: 50px; font-size: 1.3rem; font-weight: 700; }
        @media (max-width: 768px) { .features-grid { grid-template-columns: 1fr; } }
      `}</style>
      
      <div className="header">
        <h1>Standard Account</h1>
        <p>Perfect for everyday traders - Competitive spreads, no commission</p>
      </div>
      
      <div className="container">
        <div className="intro">
          <h2>Your Go-To Trading Account</h2>
          <p>The Standard Account is designed for traders of all levels who want straightforward, competitive trading conditions without commissions. Ideal for those starting their forex journey or experienced traders preferring simplicity.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card"><div className="feature-icon">💰</div><h3>Low Minimum Deposit</h3><p>Start trading with as little as $100.</p></div>
          <div className="feature-card"><div className="feature-icon">📊</div><h3>Competitive Spreads</h3><p>Tight spreads from 1.0 pips on major pairs.</p></div>
          <div className="feature-card"><div className="feature-icon">✅</div><h3>Zero Commission</h3><p>No commission charges - just spread costs.</p></div>
          <div className="feature-card"><div className="feature-icon">⚡</div><h3>Fast Execution</h3><p>Reliable execution speeds for all trades.</p></div>
          <div className="feature-card"><div className="feature-icon">🎯</div><h3>Full Trading Freedom</h3><p>Scalping, hedging, and EA strategies allowed.</p></div>
          <div className="feature-card"><div className="feature-icon">🛡️</div><h3>Negative Balance Protection</h3><p>Never lose more than your account balance.</p></div>
        </div>
        
        <div className="specs">
          <h2>Standard Account Specifications</h2>
          <div className="specs-grid">
            <div className="spec-item"><div className="spec-value">1.0</div><div>Spreads From (pips)</div></div>
            <div className="spec-item"><div className="spec-value">$0</div><div>Commission</div></div>
            <div className="spec-item"><div className="spec-value">$100</div><div>Minimum Deposit</div></div>
            <div className="spec-item"><div className="spec-value">1:1000</div><div>Maximum Leverage</div></div>
            <div className="spec-item"><div className="spec-value">0.01</div><div>Minimum Lot</div></div>
            <div className="spec-item"><div className="spec-value">100</div><div>Maximum Lots</div></div>
          </div>
        </div>
        
        <div className="cta">
          <h2>Open Standard Account</h2>
          <p>Start trading with competitive conditions and zero commission</p>
          <a href="/register" className="cta-button">Get Started</a>
        </div>
      </div>
    </div>
  );
};

export default StandardAccount;