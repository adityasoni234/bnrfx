import React from 'react';

const SocialMedia = () => {
  return (
    <div className="social-media">
      <style>{`
        .social-media { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .header p { font-size: 1.4rem; opacity: 0.95; max-width: 900px; margin: 0 auto; line-height: 1.8; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .intro { background: white; padding: 60px; margin-bottom: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; }
        .intro h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 30px; font-weight: 700; }
        .intro p { color: #555; font-size: 1.2rem; line-height: 2; margin-bottom: 20px; }
        .social-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; margin: 60px 0; }
        .social-card { background: white; padding: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; transition: all 0.3s ease; }
        .social-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
        .social-icon { font-size: 5rem; margin-bottom: 25px; }
        .social-card h3 { color: #1a1a2e; font-size: 1.8rem; margin-bottom: 18px; font-weight: 700; }
        .social-card p { color: #666; font-size: 1.1rem; line-height: 1.8; margin-bottom: 25px; }
        .social-button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); color: #1a1a2e; text-decoration: none; border-radius: 50px; font-size: 1.1rem; font-weight: 700; transition: transform 0.3s ease; }
        .social-button:hover { transform: scale(1.08); }
        .content-section { background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); padding: 70px; border-radius: 16px; text-align: center; margin: 60px 0; }
        .content-section h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 30px; font-weight: 700; }
        .content-section p { color: #1a1a2e; font-size: 1.2rem; font-weight: 600; line-height: 1.9; }
        @media (max-width: 768px) { .header h1 { font-size: 2.2rem; } .social-grid { grid-template-columns: 1fr; } }
      `}</style>
      
      <div className="header">
        <h1>Connect With BNR Fx</h1>
        <p>Join our community and stay updated with market insights, trading tips, and exclusive content</p>
      </div>
      
      <div className="container">
        <div className="intro">
          <h2>Follow Us on Social Media</h2>
          <p>Stay connected with BNR Fx across all major social media platforms. Get real-time market updates, trading education, exclusive promotions, and community support.</p>
          <p>Join thousands of traders who trust BNR Fx for their forex trading journey.</p>
        </div>
        
        <div className="social-grid">
          <div className="social-card">
            <div className="social-icon">📘</div>
            <h3>Facebook</h3>
            <p>Join our Facebook community for daily market insights, trading strategies, and live webinars with professional traders.</p>
            <a href="#" className="social-button">Follow on Facebook</a>
          </div>
          
          <div className="social-card">
            <div className="social-icon">𝕏</div>
            <h3>Twitter / X</h3>
            <p>Get real-time market updates, breaking news, and quick trading tips directly from our expert analysts.</p>
            <a href="#" className="social-button">Follow on X</a>
          </div>
          
          <div className="social-card">
            <div className="social-icon">📷</div>
            <h3>Instagram</h3>
            <p>Visual trading education, motivational content, success stories, and behind-the-scenes glimpses of BNR Fx.</p>
            <a href="#" className="social-button">Follow on Instagram</a>
          </div>
          
          <div className="social-card">
            <div className="social-icon">💼</div>
            <h3>LinkedIn</h3>
            <p>Professional insights, industry news, career opportunities, and thought leadership in forex trading.</p>
            <a href="#" className="social-button">Connect on LinkedIn</a>
          </div>
          
          <div className="social-card">
            <div className="social-icon">▶️</div>
            <h3>YouTube</h3>
            <p>Comprehensive video tutorials, market analysis, platform guides, and educational webinar recordings.</p>
            <a href="#" className="social-button">Subscribe on YouTube</a>
          </div>
          
          <div className="social-card">
            <div className="social-icon">✈️</div>
            <h3>Telegram</h3>
            <p>Instant notifications, exclusive trading signals, community discussions, and direct support from our team.</p>
            <a href="#" className="social-button">Join Telegram</a>
          </div>
        </div>
        
        <div className="content-section">
          <h2>What We Share</h2>
          <p>📊 Daily market analysis and trading opportunities | 📚 Educational content for all skill levels | 🎯 Trading strategies and risk management tips | 🎁 Exclusive promotions and bonuses | 💡 Platform updates and new features | 🤝 Community success stories</p>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;