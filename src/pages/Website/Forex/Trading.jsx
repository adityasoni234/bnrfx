import React from 'react';

const Trading = () => {
  return (
    <div className="trading">
      <style>{`
        .trading { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .header p { font-size: 1.4rem; opacity: 0.95; max-width: 900px; margin: 0 auto; line-height: 1.8; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .intro { background: white; padding: 60px; margin-bottom: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .intro h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 30px; font-weight: 700; }
        .intro p { color: #555; font-size: 1.2rem; line-height: 2; margin-bottom: 20px; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 35px; margin: 60px 0; }
        .feature-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); border-top: 5px solid #00ff88; }
        .feature-icon { font-size: 3.5rem; margin-bottom: 20px; }
        .feature-card h3 { color: #1a1a2e; font-size: 1.5rem; margin-bottom: 15px; font-weight: 600; }
        .feature-card p { color: #666; font-size: 1.05rem; line-height: 1.7; }
        .instruments { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 70px; border-radius: 16px; margin: 60px 0; color: white; }
        .instruments h2 { font-size: 2.5rem; margin-bottom: 40px; font-weight: 700; text-align: center; }
        .instruments-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 25px; }
        .instrument-item { background: rgba(255,255,255,0.1); padding: 25px; border-radius: 10px; text-align: center; }
        .instrument-item h4 { font-size: 1.3rem; margin-bottom: 10px; }
        @media (max-width: 768px) { .features-grid { grid-template-columns: 1fr; } }
      `}</style>
      
      <div className="header">
        <h1>Forex Trading with BNR Fx</h1>
        <p>Trade the world's largest financial market with confidence</p>
      </div>
      
      <div className="container">
        <div className="intro">
          <h2>Why Trade Forex with Us?</h2>
          <p>BNR Fx provides comprehensive forex trading services with competitive conditions, advanced platforms, and professional support. Whether you're a beginner or experienced trader, we offer the tools and environment for success.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card"><div className="feature-icon">💹</div><h3>70+ Currency Pairs</h3><p>Trade major, minor, and exotic forex pairs.</p></div>
          <div className="feature-card"><div className="feature-icon">⚡</div><h3>Fast Execution</h3><p>Average execution speed under 40ms.</p></div>
          <div className="feature-card"><div className="feature-icon">📊</div><h3>Tight Spreads</h3><p>Competitive spreads from 0.0 pips.</p></div>
          <div className="feature-card"><div className="feature-icon">🎯</div><h3>All Strategies Welcome</h3><p>Scalping, hedging, EA trading allowed.</p></div>
          <div className="feature-card"><div className="feature-icon">📚</div><h3>Educational Resources</h3><p>Comprehensive trading education.</p></div>
          <div className="feature-card"><div className="feature-icon">🛡️</div><h3>Risk Protection</h3><p>Negative balance protection included.</p></div>
        </div>
        
        <div className="instruments">
          <h2>Available Trading Instruments</h2>
          <div className="instruments-grid">
            <div className="instrument-item"><h4>Major Pairs</h4><p>EUR/USD, GBP/USD, USD/JPY</p></div>
            <div className="instrument-item"><h4>Minor Pairs</h4><p>EUR/GBP, AUD/NZD, GBP/JPY</p></div>
            <div className="instrument-item"><h4>Exotic Pairs</h4><p>USD/TRY, EUR/ZAR, USD/MXN</p></div>
            <div className="instrument-item"><h4>Commodities</h4><p>Gold, Silver, Oil, Natural Gas</p></div>
            <div className="instrument-item"><h4>Indices</h4><p>S&P 500, NASDAQ, FTSE 100</p></div>
            <div className="instrument-item"><h4>Cryptocurrencies</h4><p>Bitcoin, Ethereum, Litecoin</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trading;