import React from 'react';

const DemoAccount = () => {
  return (
    <div className="demo-account">
      <style>{`
        .demo-account { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .header p { font-size: 1.4rem; opacity: 0.95; max-width: 900px; margin: 0 auto; line-height: 1.8; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .intro { background: white; padding: 60px; margin-bottom: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .intro h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 30px; font-weight: 700; }
        .intro p { color: #555; font-size: 1.2rem; line-height: 2; margin-bottom: 20px; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 35px; margin: 60px 0; }
        .feature-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); border-top: 5px solid #00ff88; transition: all 0.3s ease; }
        .feature-card:hover { transform: translateY(-8px); box-shadow: 0 15px 35px rgba(0,0,0,0.12); }
        .feature-icon { font-size: 3.5rem; margin-bottom: 20px; }
        .feature-card h3 { color: #1a1a2e; font-size: 1.5rem; margin-bottom: 15px; font-weight: 600; }
        .feature-card p { color: #666; font-size: 1.05rem; line-height: 1.7; }
        .specs { background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); padding: 70px; border-radius: 16px; margin: 60px 0; }
        .specs h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 40px; font-weight: 700; text-align: center; }
        .specs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; }
        .spec-item { background: rgba(26,26,46,0.9); color: white; padding: 30px; border-radius: 12px; text-align: center; }
        .spec-value { font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; }
        .spec-label { font-size: 1.1rem; opacity: 0.9; }
        .cta { background: white; padding: 70px; text-align: center; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .cta h2 { color: #1a1a2e; font-size: 2.8rem; margin-bottom: 25px; font-weight: 700; }
        .cta p { color: #555; font-size: 1.3rem; margin-bottom: 40px; }
        .cta-button { display: inline-block; padding: 20px 60px; background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); color: #1a1a2e; text-decoration: none; border-radius: 50px; font-size: 1.3rem; font-weight: 700; transition: transform 0.3s ease; border: none; cursor: pointer; }
        .cta-button:hover { transform: scale(1.08); }
        @media (max-width: 768px) { .header h1 { font-size: 2.2rem; } .features-grid { grid-template-columns: 1fr; } }
      `}</style>
      
      <div className="header">
        <h1>Demo Account</h1>
        <p>Practice trading risk-free with virtual funds</p>
      </div>
      
      <div className="container">
        <div className="intro">
          <h2>Master Trading Without Risk</h2>
          <p>Our Demo Account provides the perfect environment to learn forex trading, test strategies, and familiarize yourself with our trading platforms—all without risking real capital.</p>
          <p>Experience real market conditions with virtual funds and build confidence before transitioning to live trading.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Virtual Capital</h3>
            <p>Start with $10,000 in virtual funds to practice trading without financial risk.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real Market Data</h3>
            <p>Access live market prices and real-time data identical to live trading conditions.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Full Platform Access</h3>
            <p>Experience all features of MetaTrader 4, MetaTrader 5, and cTrader platforms.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Strategy Testing</h3>
            <p>Test and refine your trading strategies in a risk-free environment before going live.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Learning Tool</h3>
            <p>Perfect for beginners to understand forex basics and platform functionality.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Unlimited Duration</h3>
            <p>No time limits—practice for as long as you need to build confidence.</p>
          </div>
        </div>
        
        <div className="specs">
          <h2>Demo Account Specifications</h2>
          <div className="specs-grid">
            <div className="spec-item">
              <div className="spec-value">$10,000</div>
              <div className="spec-label">Virtual Capital</div>
            </div>
            <div className="spec-item">
              <div className="spec-value">1:100</div>
              <div className="spec-label">Default Leverage</div>
            </div>
            <div className="spec-item">
              <div className="spec-value">70+</div>
              <div className="spec-label">Currency Pairs</div>
            </div>
            <div className="spec-item">
              <div className="spec-value">0.0</div>
              <div className="spec-label">Spreads From (pips)</div>
            </div>
          </div>
        </div>
        
        <div className="intro">
          <h2>Who Should Use a Demo Account?</h2>
          <p><strong>Beginners:</strong> Learn the fundamentals of forex trading without risking real money.</p>
          <p><strong>Strategy Developers:</strong> Test new trading strategies and expert advisors in real market conditions.</p>
          <p><strong>Platform Explorers:</strong> Familiarize yourself with trading platforms before committing capital.</p>
          <p><strong>Experienced Traders:</strong> Practice new techniques or test automated systems risk-free.</p>
        </div>
        
        <div className="cta">
          <h2>Open Your Demo Account Today</h2>
          <p>Start practicing with virtual funds and build your trading skills</p>
          <a href="#" className="cta-button">Open Demo Account</a>
        </div>
      </div>
    </div>
  );
};

export default DemoAccount;