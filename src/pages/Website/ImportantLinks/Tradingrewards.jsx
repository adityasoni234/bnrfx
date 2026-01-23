import React from 'react';

const TradingRewards = () => {
  return (
    <div className="trading-rewards">
      <style>{`
        .trading-rewards {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background: #f8f9fa;
        }
        
        .header {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
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
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 35px;
          margin: 60px 0;
        }
        
        .reward-card {
          background: white;
          padding: 45px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          border-top: 5px solid #FFD700;
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .reward-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        }
        
        .reward-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }
        
        .reward-card h3 {
          color: #1a1a2e;
          font-size: 1.6rem;
          margin-bottom: 18px;
          font-weight: 600;
        }
        
        .reward-card p {
          color: #666;
          font-size: 1.05rem;
          line-height: 1.7;
        }
        
        .criteria-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 70px;
          border-radius: 16px;
          color: white;
          margin-bottom: 50px;
        }
        
        .criteria-section h2 {
          font-size: 2.5rem;
          margin-bottom: 35px;
          font-weight: 700;
          text-align: center;
        }
        
        .criteria-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }
        
        .criteria-item {
          background: rgba(255,255,255,0.1);
          padding: 30px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        
        .criteria-item h4 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .criteria-item p {
          font-size: 1.05rem;
          line-height: 1.7;
          opacity: 0.95;
        }
        
        .highlight-box {
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          padding: 60px;
          border-radius: 16px;
          text-align: center;
          margin: 50px 0;
        }
        
        .highlight-box h3 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 25px;
          font-weight: 700;
        }
        
        .highlight-box p {
          color: #1a1a2e;
          font-size: 1.3rem;
          font-weight: 600;
          line-height: 1.9;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .note-box {
          background: #fff3cd;
          border-left: 5px solid #ffc107;
          padding: 35px;
          border-radius: 10px;
        }
        
        .note-box h4 {
          color: #856404;
          font-size: 1.4rem;
          margin-bottom: 15px;
          font-weight: 700;
        }
        
        .note-box p {
          color: #856404;
          font-size: 1.05rem;
          line-height: 1.8;
        }
        
        .cta-section {
          background: white;
          padding: 70px;
          text-align: center;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          margin-top: 50px;
        }
        
        .cta-section h2 {
          color: #1a1a2e;
          font-size: 2.8rem;
          margin-bottom: 25px;
          font-weight: 700;
        }
        
        .cta-section p {
          color: #555;
          font-size: 1.3rem;
          margin-bottom: 40px;
        }
        
        .cta-button {
          display: inline-block;
          padding: 20px 60px;
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          color: #1a1a2e;
          text-decoration: none;
          border-radius: 50px;
          font-size: 1.3rem;
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
          
          .intro-section {
            padding: 35px;
          }
          
          .rewards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="header">
        <h1>Trading Rewards Program</h1>
        <p>Recognizing discipline, consistency, and professional trading performance</p>
      </div>
      
      <div className="container">
        <div className="intro-section">
          <h2>Rewarding Excellence in Trading</h2>
          <p>We believe in recognizing and rewarding trading discipline, consistency, and performance.</p>
          <p>Our Trading Rewards Program is designed to motivate traders who demonstrate professional risk management, disciplined execution, and sustainable trading behavior—not reckless or over-leveraged trading.</p>
          <p>This program celebrates traders who approach the markets with strategy, patience, and intelligent risk management, understanding that long-term profitability comes from consistency rather than gambling.</p>
        </div>
        
        <div className="rewards-grid">
          <div className="reward-card">
            <div className="reward-icon">🏆</div>
            <h3>Performance Bonuses</h3>
            <p>Earn rewards based on consistent trading performance and demonstrating profitable trading strategies over time.</p>
          </div>
          
          <div className="reward-card">
            <div className="reward-icon">⭐</div>
            <h3>Volume-Based Rewards</h3>
            <p>Benefit from trading volume incentives that reward active yet disciplined market participation.</p>
          </div>
          
          <div className="reward-card">
            <div className="reward-icon">💎</div>
            <h3>Loyalty Recognition</h3>
            <p>Long-term traders receive special recognition and exclusive benefits for their continued partnership with BNR Fx.</p>
          </div>
          
          <div className="reward-card">
            <div className="reward-icon">🎯</div>
            <h3>Milestone Achievements</h3>
            <p>Celebrate trading milestones with special rewards as you progress in your trading journey.</p>
          </div>
          
          <div className="reward-card">
            <div className="reward-icon">📊</div>
            <h3>Risk Management Excellence</h3>
            <p>Traders demonstrating superior risk management practices are recognized with premium benefits.</p>
          </div>
          
          <div className="reward-card">
            <div className="reward-icon">🌟</div>
            <h3>VIP Tier Upgrades</h3>
            <p>Progress through reward tiers and unlock enhanced trading conditions and exclusive features.</p>
          </div>
        </div>
        
        <div className="criteria-section">
          <h2>What We Reward</h2>
          <div className="criteria-grid">
            <div className="criteria-item">
              <h4>Consistent Performance</h4>
              <p>Sustainable trading results over extended periods rather than short-term lucky streaks.</p>
            </div>
            
            <div className="criteria-item">
              <h4>Disciplined Execution</h4>
              <p>Following a structured trading plan with clear entry, exit, and risk management rules.</p>
            </div>
            
            <div className="criteria-item">
              <h4>Professional Risk Management</h4>
              <p>Maintaining appropriate position sizes and never risking excessive capital on single trades.</p>
            </div>
            
            <div className="criteria-item">
              <h4>Active Participation</h4>
              <p>Regular trading activity demonstrating genuine market engagement and strategy implementation.</p>
            </div>
          </div>
        </div>
        
        <div className="highlight-box">
          <h3>Our Philosophy</h3>
          <p>We reward traders who treat forex as a professional endeavor, not a casino. Success in trading requires patience, discipline, and continuous improvement—qualities we actively encourage and celebrate.</p>
        </div>
        
        <div className="intro-section">
          <h2>Program Guidelines</h2>
          <p>The Trading Rewards Program is designed to benefit traders who demonstrate sustainable trading practices. Rewards are calculated based on various performance metrics including trading volume, consistency, risk-adjusted returns, and account longevity.</p>
          <p>All rewards are subject to program terms and conditions. Traders must maintain active accounts in good standing and comply with all trading policies and risk management guidelines.</p>
          <p>The program structure may be adjusted periodically to ensure it continues to serve its purpose of rewarding professional trading behavior while maintaining fairness for all participants.</p>
        </div>
        
        <div className="note-box">
          <h4>⚠️ Important Notice</h4>
          <p>Trading rewards are designed to complement—not replace—sound trading strategies and risk management. Rewards do not eliminate market risk, and forex trading involves the possibility of substantial losses. This program rewards discipline and consistency, not reckless risk-taking. Please trade responsibly and within your means.</p>
        </div>
        
        <div className="cta-section">
          <h2>Start Earning Rewards Today</h2>
          <p>Join our Trading Rewards Program and get recognized for your disciplined trading approach.</p>
          <a href="/register" className="cta-button">Learn More</a>
        </div>
      </div>
    </div>
  );
};

export default TradingRewards;