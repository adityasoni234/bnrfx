import React from 'react';

const AllTerminal = () => {
  return (
    <div className="all-terminal">
      <style>{`
        .all-terminal { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .platforms-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; margin: 60px 0; }
        .platform-card { background: white; padding: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; }
        .platform-icon { font-size: 5rem; margin-bottom: 25px; }
        .platform-card h3 { color: #1a1a2e; font-size: 1.8rem; margin-bottom: 20px; font-weight: 700; }
        .platform-card p { color: #666; font-size: 1.1rem; line-height: 1.8; margin-bottom: 25px; }
        .platform-button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); color: #1a1a2e; text-decoration: none; border-radius: 50px; font-size: 1.1rem; font-weight: 700; }
        @media (max-width: 768px) { .platforms-grid { grid-template-columns: 1fr; } }
      `}</style>
      
      <div className="header">
        <h1>Trading Platforms</h1>
        <p>Professional trading platforms for every device</p>
      </div>
      
      <div className="container">
        <div className="platforms-grid">
          <div className="platform-card">
            <div className="platform-icon">💻</div>
            <h3>MetaTrader 4</h3>
            <p>The world's most popular forex trading platform with advanced charting and EA support.</p>
            <a href="#" className="platform-button">Download MT4</a>
          </div>
          
          <div className="platform-card">
            <div className="platform-icon">🖥️</div>
            <h3>MetaTrader 5</h3>
            <p>Next-generation platform with enhanced features, more timeframes, and advanced tools.</p>
            <a href="#" className="platform-button">Download MT5</a>
          </div>
          
          <div className="platform-card">
            <div className="platform-icon">📊</div>
            <h3>cTrader</h3>
            <p>Modern ECN platform with level II pricing, advanced order types, and sleek interface.</p>
            <a href="#" className="platform-button">Download cTrader</a>
          </div>
          
          <div className="platform-card">
            <div className="platform-icon">🌐</div>
            <h3>WebTrader</h3>
            <p>Trade directly from your browser without downloads. Access from any device.</p>
            <a href="#" className="platform-button">Launch WebTrader</a>
          </div>
          
          <div className="platform-card">
            <div className="platform-icon">📱</div>
            <h3>Mobile Trading</h3>
            <p>Full-featured mobile apps for iOS and Android. Trade on the go anytime, anywhere.</p>
            <a href="#" className="platform-button">Get Mobile App</a>
          </div>
          
          <div className="platform-card">
            <div className="platform-icon">📈</div>
            <h3>TradingView</h3>
            <p>Advanced charting platform with social trading features and powerful analysis tools.</p>
            <a href="#" className="platform-button">Use TradingView</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTerminal;