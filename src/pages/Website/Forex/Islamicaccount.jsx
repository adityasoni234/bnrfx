import React from 'react';

const IslamicAccount = () => {
  return (
    <div className="islamic-account">
      <style>{`
        .islamic-account { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #00A86B 0%, #00C896 100%); color: white; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .header .halal-badge { background: white; color: #00A86B; padding: 10px 30px; border-radius: 25px; font-weight: 700; display: inline-block; margin-bottom: 20px; }
        .header p { font-size: 1.4rem; opacity: 0.95; max-width: 900px; margin: 0 auto; line-height: 1.8; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .intro { background: white; padding: 60px; margin-bottom: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .intro h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 30px; font-weight: 700; }
        .intro p { color: #555; font-size: 1.2rem; line-height: 2; margin-bottom: 20px; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 35px; margin: 60px 0; }
        .feature-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); border-top: 5px solid #00A86B; }
        .feature-icon { font-size: 3.5rem; margin-bottom: 20px; }
        .feature-card h3 { color: #1a1a2e; font-size: 1.5rem; margin-bottom: 15px; font-weight: 600; }
        .feature-card p { color: #666; font-size: 1.05rem; line-height: 1.7; }
        .compliance { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 70px; border-radius: 16px; margin: 60px 0; color: white; text-align: center; }
        .compliance h2 { font-size: 2.5rem; margin-bottom: 30px; font-weight: 700; }
        .compliance p { font-size: 1.2rem; line-height: 2; max-width: 900px; margin: 0 auto; opacity: 0.95; }
        @media (max-width: 768px) { .features-grid { grid-template-columns: 1fr; } }
      `}</style>
      
      <div className="header">
        <div className="halal-badge">SHARIA COMPLIANT</div>
        <h1>Islamic Account</h1>
        <p>Swap-free trading in accordance with Islamic finance principles</p>
      </div>
      
      <div className="container">
        <div className="intro">
          <h2>Sharia-Compliant Trading</h2>
          <p>Our Islamic Account is designed for Muslim traders who wish to participate in forex trading while adhering to Islamic finance principles. This swap-free account eliminates interest (Riba) charges on overnight positions.</p>
          <p>Trade with confidence knowing your account complies with Sharia law.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card"><div className="feature-icon">🕌</div><h3>No Swap Charges</h3><p>Zero interest on overnight positions.</p></div>
          <div className="feature-card"><div className="feature-icon">✅</div><h3>Halal Trading</h3><p>Fully compliant with Islamic finance principles.</p></div>
          <div className="feature-card"><div className="feature-icon">💰</div><h3>Same Trading Conditions</h3><p>Identical spreads and execution quality.</p></div>
          <div className="feature-card"><div className="feature-icon">📊</div><h3>All Instruments</h3><p>Access to forex, commodities, and indices.</p></div>
          <div className="feature-card"><div className="feature-icon">⚡</div><h3>Fast Execution</h3><p>Professional-grade trade execution.</p></div>
          <div className="feature-card"><div className="feature-icon">🛡️</div><h3>Full Protection</h3><p>Negative balance protection included.</p></div>
        </div>
        
        <div className="compliance">
          <h2>Islamic Finance Compliance</h2>
          <p>Our Islamic Account eliminates interest-based transactions (Riba) by removing swap charges on positions held overnight. This allows Muslim traders to participate in forex markets while maintaining their religious principles and obligations.</p>
          <p style={{marginTop: '25px', fontWeight: 600}}>All trading activities are conducted transparently and ethically in accordance with Sharia guidelines.</p>
        </div>
      </div>
    </div>
  );
};

export default IslamicAccount;