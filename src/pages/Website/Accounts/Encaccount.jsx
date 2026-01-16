import React from 'react';

const ENCAccount = () => {
  return (
    <div className="enc-account">
      <style>{`
        .enc-account { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .header .subtitle { background: #00ff88; color: #1a1a2e; padding: 10px 30px; border-radius: 25px; font-weight: 700; font-size: 1.1rem; display: inline-block; margin-bottom: 20px; }
        .header p { font-size: 1.4rem; opacity: 0.95; max-width: 900px; margin: 0 auto; line-height: 1.8; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .intro { background: white; padding: 60px; margin-bottom: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .intro h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 30px; font-weight: 700; }
        .intro p { color: #555; font-size: 1.2rem; line-height: 2; margin-bottom: 20px; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 35px; margin: 60px 0; }
        .feature-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); border-left: 5px solid #00ff88; transition: all 0.3s ease; }
        .feature-card:hover { transform: translateY(-8px); box-shadow: 0 15px 35px rgba(0,0,0,0.12); }
        .feature-icon { font-size: 3.5rem; margin-bottom: 20px; }
        .feature-card h3 { color: #1a1a2e; font-size: 1.5rem; margin-bottom: 15px; font-weight: 600; }
        .feature-card p { color: #666; font-size: 1.05rem; line-height: 1.7; }
        .specs { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 70px; border-radius: 16px; margin: 60px 0; color: white; }
        .specs h2 { font-size: 2.5rem; margin-bottom: 40px; font-weight: 700; text-align: center; }
        .specs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; }
        .spec-item { background: rgba(255,255,255,0.1); padding: 30px; border-radius: 12px; text-align: center; backdrop-filter: blur(10px); }
        .spec-value { font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; }
        .spec-label { font-size: 1.1rem; opacity: 0.9; }
        .cta { background: white; padding: 70px; text-align: center; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .cta h2 { color: #1a1a2e; font-size: 2.8rem; margin-bottom: 25px; font-weight: 700; }
        .cta p { color: #555; font-size: 1.3rem; margin-bottom: 40px; }
        .cta-button { display: inline-block; padding: 20px 60px; background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); color: #1a1a2e; text-decoration: none; border-radius: 50px; font-size: 1.3rem; font-weight: 700; transition: transform 0.3s ease; }
        .cta-button:hover { transform: scale(1.08); }
        @media (max-width: 768px) { .header h1 { font-size: 2.2rem; } .features-grid { grid-template-columns: 1fr; } }
      `}</style>
      
      <div className="header">
        <div className="subtitle">ECN EXECUTION</div>
        <h1>ENC Account</h1>
        <p>Direct market access with institutional-grade execution</p>
      </div>
      
      <div className="container">
        <div className="intro">
          <h2>Electronic Communication Network Trading</h2>
          <p>Our ENC (ECN) Account provides direct access to deep liquidity pools from multiple tier-1 providers, ensuring the tightest spreads and fastest execution speeds available in the forex market.</p>
          <p>Designed for professional traders and those who demand institutional-quality trading conditions.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Raw Spreads</h3>
            <p>Trade with genuine raw spreads starting from 0.0 pips on major pairs.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Ultra-Fast Execution</h3>
            <p>Average execution speed under 40ms with no requotes.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Deep Liquidity</h3>
            <p>Access institutional liquidity from tier-1 banks and liquidity providers.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Transparent Pricing</h3>
            <p>Low commission structure with no hidden markups on spreads.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>All Strategies Allowed</h3>
            <p>Scalping, hedging, and EA trading fully permitted.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>Professional Tools</h3>
            <p>Advanced charting, market depth, and analytical tools included.</p>
          </div>
        </div>
        
        <div className="specs">
          <h2>ENC Account Specifications</h2>
          <div className="specs-grid">
            <div className="spec-item">
              <div className="spec-value">0.0</div>
              <div className="spec-label">Spreads From (pips)</div>
            </div>
            <div className="spec-item">
              <div className="spec-value">$3</div>
              <div className="spec-label">Commission per Lot</div>
            </div>
            <div className="spec-item">
              <div className="spec-value">$500</div>
              <div className="spec-label">Minimum Deposit</div>
            </div>
            <div className="spec-item">
              <div className="spec-value">1:500</div>
              <div className="spec-label">Maximum Leverage</div>
            </div>
            <div className="spec-item">
              <div className="spec-value">0.01</div>
              <div className="spec-label">Minimum Lot Size</div>
            </div>
            <div className="spec-item">
              <div className="spec-value">100</div>
              <div className="spec-label">Maximum Lots</div>
            </div>
          </div>
        </div>
        
        <div className="cta">
          <h2>Open ENC Account</h2>
          <p>Experience professional-grade trading with raw spreads and institutional execution</p>
          <a href="#" className="cta-button">Get Started</a>
        </div>
      </div>
    </div>
  );
};

export default ENCAccount;