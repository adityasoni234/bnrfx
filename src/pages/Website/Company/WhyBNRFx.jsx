import React from 'react';

const WhyBNRFx = () => {
  return (
    <div className="why-bnr-fx">
      <style>{`
        .why-bnr-fx {
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
          letter-spacing: -1px;
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
        
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 35px;
          margin: 60px 0;
        }
        
        .value-card {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          border-top: 5px solid #00ff88;
          transition: all 0.3s ease;
        }
        
        .value-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        }
        
        .value-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        
        .value-card h3 {
          color: #1a1a2e;
          font-size: 1.5rem;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .value-card p {
          color: #666;
          font-size: 1.05rem;
          line-height: 1.7;
        }
        
        .vision-mission {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 40px;
          margin: 60px 0;
        }
        
        .vm-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 50px;
          border-radius: 16px;
          color: white;
        }
        
        .vm-card h2 {
          font-size: 2.2rem;
          margin-bottom: 25px;
          font-weight: 700;
        }
        
        .vm-card p {
          font-size: 1.15rem;
          line-height: 1.9;
          opacity: 0.95;
        }
        
        .vm-card ul {
          list-style: none;
          margin-top: 25px;
        }
        
        .vm-card li {
          padding: 12px 0;
          padding-left: 35px;
          position: relative;
          font-size: 1.1rem;
        }
        
        .vm-card li:before {
          content: "→";
          position: absolute;
          left: 0;
          font-weight: bold;
          font-size: 1.3rem;
        }
        
        .philosophy-section {
          background: white;
          padding: 60px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          text-align: center;
          margin-top: 60px;
        }
        
        .philosophy-section h2 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 30px;
          font-weight: 700;
        }
        
        .philosophy-section p {
          color: #555;
          font-size: 1.3rem;
          line-height: 2;
          max-width: 900px;
          margin: 0 auto 20px;
        }
        
        .philosophy-highlight {
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          padding: 40px;
          border-radius: 12px;
          margin-top: 40px;
        }
        
        .philosophy-highlight p {
          color: #1a1a2e;
          font-size: 1.4rem;
          font-weight: 600;
          margin: 0;
        }
        
        .cta-section {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 80px 50px;
          text-align: center;
          border-radius: 16px;
          margin-top: 60px;
          color: white;
        }
        
        .cta-section h2 {
          font-size: 2.8rem;
          margin-bottom: 25px;
          font-weight: 700;
        }
        
        .cta-section p {
          font-size: 1.3rem;
          margin-bottom: 35px;
          opacity: 0.9;
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
        
        @media (max-width: 968px) {
          .vision-mission {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2.2rem;
          }
          
          .header p {
            font-size: 1.1rem;
          }
          
          .intro-section {
            padding: 35px;
          }
          
          .values-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="header">
        <h1>About BNR Fx</h1>
        <p>Built by traders, for traders — empowering you with transparency, technology, and professional-grade trading solutions from the heart of Dubai</p>
      </div>
      
      <div className="container">
        <div className="intro-section">
          <h2>Who We Are</h2>
          <p>We are a Dubai-based forex trading company built with one clear mission — to empower traders with transparency, technology, and professional-grade trading solutions.</p>
          <p>Operating from the global financial hub of Dubai, we combine institutional trading standards with retail trader accessibility, offering a modern trading environment designed for consistency, speed, and reliability.</p>
          <p>Our team consists of experienced traders, market analysts, and technology specialists who understand real market behavior — not theory. We focus on price action, liquidity, and smart risk management, ensuring our systems and services align with how professional markets truly move.</p>
        </div>
        
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🔍</div>
            <h3>Transparency First</h3>
            <p>No hidden conditions, no misleading promises. Every aspect of our service is clear, honest, and straightforward.</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon">📊</div>
            <h3>Trader-Centric Approach</h3>
            <p>Built by traders, for traders. We understand your needs because we've been where you are.</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon">⚡</div>
            <h3>Advanced Technology</h3>
            <p>Fast execution and stable infrastructure that keeps you connected to the markets when it matters most.</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon">🛡️</div>
            <h3>Risk-Aware Trading</h3>
            <p>Capital protection is our priority. We promote disciplined, sustainable trading over reckless risk-taking.</p>
          </div>
        </div>
        
        <div className="vision-mission">
          <div className="vm-card">
            <h2>Our Vision</h2>
            <p>To become a globally trusted trading brand that bridges the gap between retail traders and institutional-level trading practices.</p>
            <p style={{marginTop: '25px'}}>We envision a future where every trader, regardless of their capital size, has access to the same quality of infrastructure, education, and support that professional institutions enjoy.</p>
          </div>
          
          <div className="vm-card" style={{background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)', color: '#1a1a2e'}}>
            <h2>Our Mission</h2>
            <p>To provide traders with:</p>
            <ul>
              <li>Reliable trading solutions</li>
              <li>Education based on real market logic</li>
              <li>Tools that support disciplined and sustainable trading</li>
            </ul>
            <p style={{marginTop: '25px', fontWeight: 600}}>We deliver on this mission every single day through innovation, integrity, and unwavering commitment to trader success.</p>
          </div>
        </div>
        
        <div className="philosophy-section">
          <h2>Our Trading Philosophy</h2>
          <p>We believe trading is not gambling — it's a skill developed through structure, patience, and discipline.</p>
          <p>Success in the markets doesn't come from shortcuts or hype. It comes from understanding market mechanics, managing risk intelligently, and maintaining emotional discipline through all market conditions.</p>
          
          <div className="philosophy-highlight">
            <p>Welcome to a trading environment where strategy matters more than hype and consistency beats shortcuts.</p>
          </div>
        </div>
        
        <div className="cta-section">
          <h2>Ready to Trade with Purpose?</h2>
          <p>Join a community of disciplined traders who value transparency, technology, and professional standards.</p>
          <a href="/register" className="cta-button">Start Trading Today</a>
        </div>
      </div>
    </div>
  );
};

export default WhyBNRFx;