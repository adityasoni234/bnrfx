import React from 'react';

const DownloadPC = () => {
  return (
    <div className="download-pc">
      <style>{`
        .download-pc { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .download-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; margin: 60px 0; }
        .download-card { background: white; padding: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; }
        .download-card h3 { color: #1a1a2e; font-size: 1.8rem; margin-bottom: 20px; font-weight: 700; }
        .download-card p { color: #666; font-size: 1.1rem; line-height: 1.8; margin-bottom: 30px; }
        .download-button { display: inline-block; padding: 18px 50px; background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); color: #1a1a2e; text-decoration: none; border-radius: 50px; font-size: 1.2rem; font-weight: 700; }
        .requirements { background: white; padding: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); margin-top: 50px; }
        .requirements h3 { color: #1a1a2e; font-size: 1.8rem; margin-bottom: 25px; }
        .requirements ul { list-style: none; }
        .requirements li { padding: 12px 0; padding-left: 30px; position: relative; color: #666; }
        .requirements li:before { content: "✓"; position: absolute; left: 0; color: #00ff88; font-weight: bold; }
        @media (max-width: 768px) { .download-grid { grid-template-columns: 1fr; } }
      `}</style>
      
      <div className="header">
        <h1>Download for Windows PC</h1>
        <p>Professional trading platforms for your desktop</p>
      </div>
      
      <div className="container">
        <div className="download-grid">
          <div className="download-card">
            <h3>MetaTrader 4 for PC</h3>
            <p>Download MT4 for Windows with advanced charting, expert advisors, and custom indicators.</p>
            <a href="#" className="download-button">Download MT4</a>
          </div>
          
          <div className="download-card">
            <h3>MetaTrader 5 for PC</h3>
            <p>Next-generation platform with enhanced features and multi-asset trading capabilities.</p>
            <a href="#" className="download-button">Download MT5</a>
          </div>
          
          <div className="download-card">
            <h3>cTrader for PC</h3>
            <p>Modern ECN platform with level II pricing and advanced order execution.</p>
            <a href="#" className="download-button">Download cTrader</a>
          </div>
        </div>
        
        <div className="requirements">
          <h3>System Requirements</h3>
          <ul>
            <li>Windows 7, 8, 10, or 11 (64-bit recommended)</li>
            <li>Minimum 2 GB RAM (4 GB recommended)</li>
            <li>100 MB free disk space</li>
            <li>Internet connection required</li>
            <li>1024x768 screen resolution or higher</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DownloadPC;