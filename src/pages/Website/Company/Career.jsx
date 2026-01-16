import React from 'react';

const Career = () => {
  return (
    <div className="career">
      <style>{`
        .career {
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
        
        .roles-section {
          background: white;
          padding: 60px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          margin-bottom: 50px;
        }
        
        .roles-section h2 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 40px;
          font-weight: 700;
          text-align: center;
        }
        
        .roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }
        
        .role-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 35px;
          border-radius: 12px;
          border-left: 5px solid #00d4ff;
        }
        
        .role-card h4 {
          color: #1a1a2e;
          font-size: 1.4rem;
          margin-bottom: 12px;
          font-weight: 600;
        }
        
        .role-card p {
          color: #666;
          font-size: 1rem;
          line-height: 1.7;
        }
        
        .values-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 70px;
          border-radius: 16px;
          color: white;
          text-align: center;
          margin-bottom: 50px;
        }
        
        .values-section h2 {
          font-size: 2.8rem;
          margin-bottom: 35px;
          font-weight: 700;
        }
        
        .values-section p {
          font-size: 1.25rem;
          line-height: 2;
          max-width: 900px;
          margin: 0 auto 30px;
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
          line-height: 1.8;
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
        <h1>Join Our Team</h1>
        <p>Build your career in the dynamic world of global financial markets with BNR Fx</p>
      </div>
      
      <div className="container">
        <div className="intro-section">
          <h2>Career Opportunities at BNR Fx</h2>
          <p>Join a team that thrives in the fast-paced world of global financial markets.</p>
          <p>We are a Dubai-based forex trading company committed to innovation, transparency, and professional growth. Our workplace culture is built on integrity, performance, and continuous learning, offering opportunities to grow alongside experienced market professionals.</p>
          <p>We believe that people are our strongest asset. Whether you are a trader, analyst, developer, or support professional, we provide an environment where talent is valued and performance is rewarded.</p>
        </div>
        
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h3>Professional Growth</h3>
            <p>Access continuous learning opportunities, mentorship programs, and career advancement pathways designed to help you reach your full potential.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Global Markets Exposure</h3>
            <p>Work directly with global forex and financial markets, gaining invaluable experience in one of the world's most dynamic industries.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">📈</div>
            <h3>Performance-Driven Career</h3>
            <p>Your contributions matter. We offer clear career progression paths based on merit, performance, and results—not politics or tenure.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">⚖️</div>
            <h3>Ethical Environment</h3>
            <p>Work in a transparent, compliant, and ethical business environment where integrity is valued above all else.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Competitive Compensation</h3>
            <p>Receive industry-competitive salaries complemented by performance-based incentives and comprehensive benefits packages.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">🤝</div>
            <h3>Collaborative Culture</h3>
            <p>Be part of a team-oriented culture where collaboration, knowledge sharing, and mutual support drive collective success.</p>
          </div>
        </div>
        
        <div className="roles-section">
          <h2>Open Opportunities</h2>
          <p style={{textAlign: 'center', color: '#666', fontSize: '1.15rem', marginBottom: '40px'}}>We're always looking for talented individuals to join our growing team across multiple departments</p>
          
          <div className="roles-grid">
            <div className="role-card">
              <h4>Trading & Analysis</h4>
              <p>Forex Traders, Market Analysts, Risk Managers, and Quantitative Analysts who understand market dynamics and price action.</p>
            </div>
            
            <div className="role-card">
              <h4>Technology & Development</h4>
              <p>Software Engineers, Platform Developers, DevOps Engineers, and Data Scientists who build robust trading infrastructure.</p>
            </div>
            
            <div className="role-card">
              <h4>Client Support</h4>
              <p>Customer Service Representatives, Account Managers, and Support Specialists dedicated to exceptional client experiences.</p>
            </div>
            
            <div className="role-card">
              <h4>Business Development</h4>
              <p>Sales Professionals, Partnership Managers, and Marketing Specialists focused on sustainable business growth.</p>
            </div>
            
            <div className="role-card">
              <h4>Compliance & Legal</h4>
              <p>Compliance Officers, Legal Advisors, and Risk Management Professionals ensuring regulatory adherence.</p>
            </div>
            
            <div className="role-card">
              <h4>Operations & Finance</h4>
              <p>Operations Managers, Financial Analysts, and Administrative Professionals supporting seamless business operations.</p>
            </div>
          </div>
        </div>
        
        <div className="values-section">
          <h2>Our Workplace Values</h2>
          <p>We foster a culture where excellence is the standard, innovation is encouraged, and every team member contributes to our collective success.</p>
          <p>Integrity, accountability, and continuous improvement are not just words on paper—they're the principles that guide every decision we make and every interaction we have.</p>
          <p style={{fontSize: '1.4rem', fontWeight: 600, marginTop: '35px'}}>Success at BNR Fx is measured not just by financial performance, but by the positive impact we create for our clients, our team, and the broader trading community.</p>
        </div>
        
        <div className="cta-section">
          <h2>Ready to Start Your Journey?</h2>
          <p>If you're passionate about financial markets, committed to excellence, and ready to make a real impact, we want to hear from you.</p>
          <a href="mailto:careers@bnrfx.com" className="cta-button">Apply Now</a>
        </div>
      </div>
    </div>
  );
};

export default Career;