import React from 'react';

const Partnership = () => {
  return (
    <div className="partnership">
      <style>{`
        .partnership {
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
        
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 35px;
          margin: 60px 0;
        }
        
        .benefit-card {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          border-top: 5px solid #00ff88;
          transition: all 0.3s ease;
        }
        
        .benefit-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        }
        
        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        
        .benefit-card h3 {
          color: #1a1a2e;
          font-size: 1.5rem;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .benefit-card p {
          color: #666;
          font-size: 1.05rem;
          line-height: 1.7;
        }
        
        .models-section {
          background: white;
          padding: 60px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          margin-bottom: 50px;
        }
        
        .models-section h2 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 40px;
          font-weight: 700;
          text-align: center;
        }
        
        .models-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 35px;
          margin-top: 40px;
        }
        
        .model-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 40px;
          border-radius: 12px;
          border-left: 5px solid #00d4ff;
        }
        
        .model-card h4 {
          color: #1a1a2e;
          font-size: 1.6rem;
          margin-bottom: 18px;
          font-weight: 600;
        }
        
        .model-card p {
          color: #666;
          font-size: 1.05rem;
          line-height: 1.8;
        }
        
        .highlight-box {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 70px;
          border-radius: 16px;
          text-align: center;
          color: white;
          margin: 60px 0;
        }
        
        .highlight-box h3 {
          font-size: 2.5rem;
          margin-bottom: 25px;
          font-weight: 700;
        }
        
        .highlight-box p {
          font-size: 1.3rem;
          line-height: 2;
          max-width: 900px;
          margin: 0 auto;
          opacity: 0.95;
        }
        
        .cta-section {
          background: white;
          padding: 70px;
          text-align: center;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
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
          
          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="header">
        <h1>Partnership Program</h1>
        <p>Grow together through transparent, professional, and mutually beneficial collaboration</p>
      </div>
      
      <div className="container">
        <div className="intro-section">
          <h2>Building Strong Partnerships</h2>
          <p>We believe strong partnerships are the foundation of long-term success in the global financial markets.</p>
          <p>Our Partnership Program is designed for individuals and organizations who want to grow with a trusted, transparent, and professional forex trading company based in Dubai.</p>
          <p>Whether you are an Introducing Broker (IB), money manager, educator, or digital partner, we offer flexible partnership models tailored for sustainable growth.</p>
        </div>
        
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🤝</div>
            <h3>Transparent Practices</h3>
            <p>Work with a partner committed to honest, straightforward business practices with no hidden agendas or surprise conditions.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Competitive Rewards</h3>
            <p>Earn attractive partnership compensation structures designed to reward your efforts and contribution to mutual growth.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <h3>Strong Compliance</h3>
            <p>Benefit from our robust compliance framework and operational support, ensuring a secure partnership environment.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h3>Advanced Infrastructure</h3>
            <p>Leverage cutting-edge trading technology and infrastructure to provide your clients with exceptional service.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">📊</div>
            <h3>Dedicated Support</h3>
            <p>Access personalized partner relationship management and dedicated support channels for your success.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">📈</div>
            <h3>Marketing Resources</h3>
            <p>Utilize comprehensive marketing materials, tools, and resources to effectively promote services.</p>
          </div>
        </div>
        
        <div className="highlight-box">
          <h3>Our Partnership Philosophy</h3>
          <p>We focus on long-term collaboration, not short-term promotion. True partnerships are built on mutual respect, shared values, and aligned incentives that benefit all parties involved.</p>
        </div>
        
        <div className="models-section">
          <h2>Partnership Models</h2>
          <p style={{textAlign: 'center', color: '#666', fontSize: '1.15rem', marginBottom: '40px'}}>Each partnership model is structured with clear terms, transparent reporting, and professional support</p>
          
          <div className="models-grid">
            <div className="model-card">
              <h4>🤝 Introducing Broker (IB)</h4>
              <p>Refer clients to BNR Fx and earn competitive commissions on their trading activity. Ideal for individuals or organizations with existing trader networks.</p>
            </div>
            
            <div className="model-card">
              <h4>📊 Money Manager / PAMM</h4>
              <p>Manage client portfolios using our platform and infrastructure. Perfect for experienced traders and fund managers seeking to scale their operations.</p>
            </div>
            
            <div className="model-card">
              <h4>🎓 Education & Training Partners</h4>
              <p>Collaborate with us to provide quality trading education to aspiring traders. Deliver courses, webinars, and training programs to your audience.</p>
            </div>
            
            <div className="model-card">
              <h4>🌐 Digital & Marketing Affiliates</h4>
              <p>Promote BNR Fx through digital channels and earn rewards for successful referrals. Suitable for content creators, influencers, and marketers.</p>
            </div>
            
            <div className="model-card">
              <h4>🏢 Corporate & Institutional</h4>
              <p>Establish strategic partnerships for white-label solutions, technology integration, or institutional service provision.</p>
            </div>
            
            <div className="model-card">
              <h4>🔗 Regional Representatives</h4>
              <p>Represent BNR Fx in your region, building local presence and supporting traders in your market.</p>
            </div>
          </div>
        </div>
        
        <div className="intro-section">
          <h2>Partnership Requirements</h2>
          <p>We seek partners who share our values of transparency, professionalism, and commitment to trader success. Ideal partners demonstrate industry knowledge, ethical business practices, and a genuine desire to serve traders' best interests.</p>
          <p>All partnerships are subject to approval and must comply with our partnership policies and applicable regulations. We conduct due diligence on all potential partners to ensure alignment with our standards and values.</p>
          <p>Partners receive comprehensive onboarding, ongoing training, and access to our partner portal with real-time reporting and analytics tools.</p>
        </div>
        
        <div className="cta-section">
          <h2>Ready to Partner with Us?</h2>
          <p>Join our growing network of successful partners and build a sustainable business with BNR Fx.</p>
          <a href="mailto:partnerships@bnrfx.com" className="cta-button">Apply for Partnership</a>
        </div>
      </div>
    </div>
  );
};

export default Partnership;