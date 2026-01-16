import React from 'react';

const Awards = () => {
  return (
    <div className="awards">
      <style>{`
        .awards { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #1a1a2e; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 800; }
        .header p { font-size: 1.4rem; font-weight: 600; max-width: 900px; margin: 0 auto; line-height: 1.8; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .awards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; margin: 60px 0; }
        .award-card { background: white; padding: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; border-top: 6px solid #FFD700; transition: all 0.3s ease; }
        .award-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
        .award-icon { font-size: 5rem; margin-bottom: 25px; }
        .award-year { background: #FFD700; color: #1a1a2e; padding: 8px 20px; border-radius: 25px; font-weight: 800; font-size: 1rem; display: inline-block; margin-bottom: 20px; }
        .award-card h3 { color: #1a1a2e; font-size: 1.6rem; margin-bottom: 15px; font-weight: 700; }
        .award-org { color: #00ff88; font-weight: 600; font-size: 1.1rem; margin-bottom: 15px; }
        .award-card p { color: #666; font-size: 1.05rem; line-height: 1.7; }
        .intro { background: white; padding: 60px; margin-bottom: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; }
        .intro h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 30px; font-weight: 700; }
        .intro p { color: #555; font-size: 1.2rem; line-height: 2; }
        @media (max-width: 768px) { .header h1 { font-size: 2.2rem; } .awards-grid { grid-template-columns: 1fr; } }
      `}</style>
      
      <div className="header">
        <h1>🏆 Awards & Recognition</h1>
        <p>Celebrating excellence and innovation in forex trading</p>
      </div>
      
      <div className="container">
        <div className="intro">
          <h2>Industry Recognition</h2>
          <p>At BNR Fx, we are proud to be recognized for our commitment to transparency, innovation, and trader success. Our achievements reflect our dedication to providing world-class trading services from Dubai.</p>
        </div>
        
        <div className="awards-grid">
          <div className="award-card">
            <div className="award-icon">🥇</div>
            <span className="award-year">2024</span>
            <h3>Best Emerging Broker</h3>
            <div className="award-org">Middle East Finance Awards</div>
            <p>Recognized for rapid growth and exceptional service delivery in the competitive forex market.</p>
          </div>
          
          <div className="award-card">
            <div className="award-icon">⭐</div>
            <span className="award-year">2024</span>
            <h3>Excellence in Technology</h3>
            <div className="award-org">Dubai FinTech Summit</div>
            <p>Honored for implementing cutting-edge trading infrastructure and advanced execution technology.</p>
          </div>
          
          <div className="award-card">
            <div className="award-icon">🎯</div>
            <span className="award-year">2023</span>
            <h3>Most Transparent Broker</h3>
            <div className="award-org">Global Trading Excellence</div>
            <p>Awarded for maintaining the highest standards of transparency and ethical business practices.</p>
          </div>
          
          <div className="award-card">
            <div className="award-icon">💎</div>
            <span className="award-year">2023</span>
            <h3>Best Customer Support</h3>
            <div className="award-org">International Forex Awards</div>
            <p>Recognized for providing exceptional client support and personalized trading assistance.</p>
          </div>
          
          <div className="award-card">
            <div className="award-icon">🚀</div>
            <span className="award-year">2023</span>
            <h3>Fastest Growing Broker</h3>
            <div className="award-org">UAE Business Excellence</div>
            <p>Celebrated for achieving remarkable growth while maintaining quality and compliance standards.</p>
          </div>
          
          <div className="award-card">
            <div className="award-icon">🛡️</div>
            <span className="award-year">2023</span>
            <h3>Trust & Safety Excellence</h3>
            <div className="award-org">Financial Security Association</div>
            <p>Honored for outstanding commitment to client fund security and risk management.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;