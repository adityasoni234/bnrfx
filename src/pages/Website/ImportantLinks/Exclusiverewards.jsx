import React from 'react';

const ExclusiveRewards = () => {
  return (
    <div className="exclusive-rewards">
      <style>{`
        .exclusive-rewards {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background: #f8f9fa;
        }
        
        .header {
          background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
          color: white;
          padding: 100px 20px;
          text-align: center;
        }
        
        .header h1 {
          font-size: 3.5rem;
          margin-bottom: 25px;
          font-weight: 700;
        }
        
        .header p {
          font-size: 1.4rem;
          opacity: 0.95;
          max-width: 900px;
          margin: 0 auto;
          line-height: 1.8;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 20px;
        }
        
        .intro-section {
          background: white;
          padding: 60px;
          margin-bottom: 50px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          text-align: center;
        }
        
        .intro-section h2 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 30px;
          font-weight: 700;
        }
        
        .intro-section p {
          color: #555;
          font-size: 1.2rem;
          line-height: 2;
          margin-bottom: 25px;
        }
        
        .rewards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
          margin: 60px 0;
        }
        
        .reward-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 50px;
          border-radius: 16px;
          color: white;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .reward-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .reward-icon {
          font-size: 4.5rem;
          margin-bottom: 25px;
        }
        
        .reward-card h3 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .reward-card p {
          font-size: 1.1rem;
          line-height: 1.8;
          opacity: 0.95;
        }
        
        .cta-section {
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          padding: 80px;
          text-align: center;
          border-radius: 16px;
        }
        
        .cta-section h2 {
          color: #1a1a2e;
          font-size: 3rem;
          margin-bottom: 25px;
          font-weight: 800;
        }
        
        .cta-section p {
          color: #1a1a2e;
          font-size: 1.4rem;
          margin-bottom: 40px;
          font-weight: 600;
        }
        
        .cta-button {
          display: inline-block;
          padding: 22px 70px;
          background: #1a1a2e;
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-size: 1.4rem;
          font-weight: 700;
          transition: transform 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .cta-button:hover {
          transform: scale(1.08);
        }
        
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2.2rem;
          }
          
          .rewards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="header">
        <h1>Exclusive Rewards</h1>
        <p>Premium benefits for our most valued traders</p>
      </div>
      
      <div className="container">
        <div className="intro-section">
          <h2>VIP Treatment for Elite Traders</h2>
          <p>Our Exclusive Rewards program is designed for traders who demonstrate exceptional trading performance, maintain significant account balances, and show long-term commitment to BNR Fx.</p>
          <p>Experience premium benefits, personalized service, and exclusive perks available only to our most valued clients.</p>
        </div>
        
        <div className="rewards-grid">
          <div className="reward-card">
            <div className="reward-icon">👑</div>
            <h3>VIP Account Manager</h3>
            <p>Get dedicated personal support from an experienced account manager who understands your trading needs and goals.</p>
          </div>
          
          <div className="reward-card" style={{background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)', color: '#1a1a2e'}}>
            <div className="reward-icon">💎</div>
            <h3>Enhanced Trading Conditions</h3>
            <p>Access tighter spreads, reduced commissions, and priority execution on all your trades.</p>
          </div>
          
          <div className="reward-card">
            <div className="reward-icon">🎁</div>
            <h3>Exclusive Bonuses</h3>
            <p>Receive special deposit bonuses, cashback offers, and loyalty rewards not available to standard accounts.</p>
          </div>
          
          <div className="reward-card" style={{background: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%)'}}>
            <div className="reward-icon">📊</div>
            <h3>Premium Market Analysis</h3>
            <p>Get access to exclusive market insights, research reports, and trading signals from professional analysts.</p>
          </div>
          
          <div className="reward-card">
            <div className="reward-icon">⚡</div>
            <h3>Priority Processing</h3>
            <p>Enjoy faster withdrawal processing, priority customer support, and expedited verification procedures.</p>
          </div>
          
          <div className="reward-card" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#1a1a2e'}}>
            <div className="reward-icon">🎯</div>
            <h3>Custom Solutions</h3>
            <p>Receive tailored trading solutions, personalized strategies, and customized account features.</p>
          </div>
        </div>
        
        <div className="cta-section">
          <h2>Unlock Exclusive Benefits</h2>
          <p>Elevate your trading experience with premium rewards and VIP treatment</p>
          <a href="mailto:vip@bnrfx.com" className="cta-button">Contact VIP Team</a>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveRewards;