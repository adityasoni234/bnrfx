import React from 'react';

const DownloadAndroid = () => {
  return (
    <div className="download-android">
      <style>{`
        .download-android { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #3DDC84 0%, #34C759 100%); color: white; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .download-main { background: white; padding: 70px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; margin-bottom: 50px; }
        .download-main h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 30px; }
        .download-main p { color: #666; font-size: 1.2rem; line-height: 2; margin-bottom: 40px; }
        .store-button { display: inline-block; padding: 20px 50px; background: #34C759; color: white; text-decoration: none; border-radius: 50px; font-size: 1.3rem; font-weight: 700; margin: 0 10px; }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 35px; }
        .feature-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); }
        .feature-card h4 { color: #1a1a2e; font-size: 1.4rem; margin-bottom: 15px; }
        @media (max-width: 768px) { .features { grid-template-columns: 1fr; } }
      `}</style>
      
      <div className="header">
        <h1>Download for Android</h1>
        <p>Trade forex on your Android device</p>
      </div>
      
      <div className="container">
        <div className="download-main">
          <h2>BNR Fx Mobile Trading</h2>
          <p>Download our mobile trading apps from Google Play Store and start trading on your Android device.</p>
          <a href="https://play.google.com" className="store-button">📱 Get on Play Store</a>
        </div>
        
        <div className="features">
          <div className="feature-card"><h4>📊 Full Platform Features</h4><p>Access all trading features from your phone.</p></div>
          <div className="feature-card"><h4>📈 Real-Time Charts</h4><p>Advanced charting with technical indicators.</p></div>
          <div className="feature-card"><h4>⚡ Fast Execution</h4><p>Lightning-fast order execution on mobile.</p></div>
          <div className="feature-card"><h4>🔔 Price Alerts</h4><p>Get notified of important price movements.</p></div>
          <div className="feature-card"><h4>🔒 Secure Trading</h4><p>Biometric authentication and encryption.</p></div>
          <div className="feature-card"><h4>🌐 Trade Anywhere</h4><p>Trade from anywhere with internet access.</p></div>
        </div>
      </div>
    </div>
  );
};

export default DownloadAndroid;