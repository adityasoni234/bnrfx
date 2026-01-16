import React from 'react';

const DownloadApple = () => {
  return (
    <div className="download-apple">
      <style>{`
        .download-apple { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #000000 0%, #434343 100%); color: white; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .download-main { background: white; padding: 70px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; margin-bottom: 50px; }
        .download-main h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 30px; }
        .download-main p { color: #666; font-size: 1.2rem; line-height: 2; margin-bottom: 40px; }
        .store-button { display: inline-block; padding: 20px 50px; background: #000000; color: white; text-decoration: none; border-radius: 50px; font-size: 1.3rem; font-weight: 700; }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 35px; }
        .feature-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); }
        .feature-card h4 { color: #1a1a2e; font-size: 1.4rem; margin-bottom: 15px; }
        @media (max-width: 768px) { .features { grid-template-columns: 1fr; } }
      `}</style>
      
      <div className="header">
        <h1>Download for iOS</h1>
        <p>Trade forex on your iPhone and iPad</p>
      </div>
      
      <div className="container">
        <div className="download-main">
          <h2>BNR Fx for iOS</h2>
          <p>Download our mobile trading apps from the App Store and experience seamless trading on your Apple devices.</p>
          <a href="https://apps.apple.com" className="store-button">📱 Get on App Store</a>
        </div>
        
        <div className="features">
          <div className="feature-card"><h4>🎯 Optimized for iOS</h4><p>Native app optimized for iPhone and iPad.</p></div>
          <div className="feature-card"><h4>📊 Professional Charts</h4><p>Advanced technical analysis tools.</p></div>
          <div className="feature-card"><h4>⚡ Fast & Reliable</h4><p>Instant order execution.</p></div>
          <div className="feature-card"><h4>🔐 Face ID / Touch ID</h4><p>Biometric security authentication.</p></div>
          <div className="feature-card"><h4>📱 iPad Support</h4><p>Enhanced experience on iPad.</p></div>
          <div className="feature-card"><h4>🔔 Push Notifications</h4><p>Real-time alerts and updates.</p></div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApple;