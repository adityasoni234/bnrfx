import React from 'react';

const Regulation = () => {
  return (
    <div className="regulation">
      <style>{`
        .regulation {
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
        
        .section {
          background: white;
          padding: 60px;
          margin-bottom: 50px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        .section h2 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 35px;
          font-weight: 700;
          border-bottom: 4px solid #00ff88;
          padding-bottom: 15px;
        }
        
        .section p {
          color: #555;
          font-size: 1.2rem;
          line-height: 2;
          margin-bottom: 25px;
        }
        
        .compliance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 35px;
          margin-top: 50px;
        }
        
        .compliance-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 40px;
          border-radius: 12px;
          border-left: 5px solid #00ff88;
          transition: all 0.3s ease;
        }
        
        .compliance-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        }
        
        .compliance-icon {
          font-size: 3.5rem;
          margin-bottom: 20px;
        }
        
        .compliance-card h3 {
          color: #1a1a2e;
          font-size: 1.6rem;
          margin-bottom: 18px;
          font-weight: 600;
        }
        
        .compliance-card p {
          color: #666;
          font-size: 1.05rem;
          line-height: 1.8;
        }
        
        .vision-mission-box {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 40px;
          margin-top: 50px;
        }
        
        .vm-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 50px;
          border-radius: 16px;
          color: white;
        }
        
        .vm-card h3 {
          font-size: 2rem;
          margin-bottom: 25px;
          font-weight: 700;
        }
        
        .vm-card p {
          font-size: 1.15rem;
          line-height: 1.9;
          opacity: 0.95;
        }
        
        .highlight-box {
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          padding: 50px;
          border-radius: 16px;
          text-align: center;
          margin-top: 60px;
        }
        
        .highlight-box h3 {
          color: #1a1a2e;
          font-size: 2.2rem;
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .highlight-box p {
          color: #1a1a2e;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0;
          line-height: 1.8;
        }
        
        .disclaimer-box {
          background: #fff3cd;
          border-left: 5px solid #ffc107;
          padding: 35px;
          border-radius: 10px;
          margin-top: 50px;
        }
        
        .disclaimer-box h4 {
          color: #856404;
          font-size: 1.4rem;
          margin-bottom: 15px;
          font-weight: 700;
        }
        
        .disclaimer-box p {
          color: #856404;
          font-size: 1.05rem;
          line-height: 1.8;
        }
        
        @media (max-width: 968px) {
          .vision-mission-box {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2.2rem;
          }
          
          .section {
            padding: 35px;
          }
          
          .compliance-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="header">
        <h1>Regulation & Compliance</h1>
        <p>Operating with integrity, transparency, and strict adherence to global compliance standards</p>
      </div>
      
      <div className="container">
        <div className="section">
          <h2>Our Commitment to Compliance</h2>
          <p>We operate with a strong commitment to regulatory integrity and compliance best practices. At BNR Fx, we understand that trust is the foundation of every successful trading relationship, and maintaining the highest standards of compliance is essential to earning and preserving that trust.</p>
          <p>Our operational framework is built around transparency, client protection, and adherence to internationally recognized financial regulations. Every aspect of our business—from client onboarding to fund management—is designed to meet and exceed compliance requirements.</p>
        </div>
        
        <div className="compliance-grid">
          <div className="compliance-card">
            <div className="compliance-icon">🔒</div>
            <h3>AML & KYC Procedures</h3>
            <p>We follow global Anti-Money Laundering (AML) and Know Your Customer (KYC) procedures to protect clients and prevent financial misconduct. Every client undergoes thorough verification to ensure a secure trading environment.</p>
          </div>
          
          <div className="compliance-card">
            <div className="compliance-icon">🛡️</div>
            <h3>Client Data Protection</h3>
            <p>Client data is handled with strict privacy and security protocols. We employ advanced encryption technologies and secure storage systems to safeguard all personal and financial information from unauthorized access.</p>
          </div>
          
          <div className="compliance-card">
            <div className="compliance-icon">💼</div>
            <h3>Fund Segregation</h3>
            <p>Funds are managed using segregation principles to ensure operational transparency. Client capital is kept separate from company operational funds, providing an additional layer of protection and accountability.</p>
          </div>
          
          <div className="compliance-card">
            <div className="compliance-icon">⚖️</div>
            <h3>Compliance Standards</h3>
            <p>Our systems and procedures are designed to align with international financial compliance standards applicable to the jurisdictions we serve, ensuring we operate within the boundaries of legal and ethical business practices.</p>
          </div>
          
          <div className="compliance-card">
            <div className="compliance-icon">📋</div>
            <h3>Transaction Monitoring</h3>
            <p>Ongoing transaction monitoring systems help us identify and prevent suspicious activities, maintaining the integrity of our trading platform and protecting all clients from fraudulent behavior.</p>
          </div>
          
          <div className="compliance-card">
            <div className="compliance-icon">🔍</div>
            <h3>Regular Audits</h3>
            <p>Regular internal audits and reviews ensure continuous compliance with regulatory requirements and help us identify areas for improvement in our operational procedures.</p>
          </div>
        </div>
        
        <div className="section">
          <h2>Ethical Business Practices</h2>
          <p>While forex trading involves market risk, we prioritize ethical business practices, transparency, and client protection at every operational level. Our commitment goes beyond mere regulatory compliance—we strive to set industry standards for integrity and professionalism.</p>
          <p>We believe that sustainable success in forex trading requires not just technical excellence, but also an unwavering commitment to doing business the right way. This means treating every client fairly, maintaining transparent pricing, and ensuring that our interests are aligned with those of our traders.</p>
        </div>
        
        <div className="vision-mission-box">
          <div className="vm-card">
            <h3>Our Mission</h3>
            <p>To provide traders with a secure, compliant, and professional trading environment backed by transparency, technology, and risk-focused trading principles.</p>
            <p style={{marginTop: '25px'}}>We are dedicated to creating an ecosystem where traders can focus on developing their skills and strategies, knowing that their capital and data are protected by best-in-class security and compliance measures.</p>
          </div>
          
          <div className="vm-card" style={{background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)', color: '#1a1a2e'}}>
            <h3>Our Vision</h3>
            <p>To become a globally trusted forex brand recognized for compliance, integrity, and long-term trader success.</p>
            <p style={{marginTop: '25px', fontWeight: 600}}>We envision a future where BNR Fx is synonymous with transparent, ethical, and professional forex trading—a brand that traders worldwide can rely on with complete confidence.</p>
          </div>
        </div>
        
        <div className="highlight-box">
          <h3>Trading as a Professional Skill</h3>
          <p>We believe trading is a professional skill — not gambling — and a regulated, disciplined approach is the foundation of sustainable growth.</p>
        </div>
        
        <div className="section">
          <h2>Your Rights and Protections</h2>
          <p>As a client of BNR Fx, you are entitled to certain rights and protections under our compliance framework. These include the right to transparent pricing, fair execution, timely access to your funds, and comprehensive account reporting. We maintain clear grievance procedures should you have any concerns about our services.</p>
          <p>Our compliance team is always available to address questions or concerns related to regulatory matters, account security, or trading practices. We encourage open communication and take every client concern seriously.</p>
        </div>
        
        <div className="disclaimer-box">
          <h4>⚠️ Risk Disclosure</h4>
          <p>Forex trading involves significant risk and may not be suitable for all investors. Past performance is not indicative of future results. While we implement comprehensive compliance and security measures to protect your capital and data, these measures do not eliminate market risk. You should carefully consider your investment objectives, level of experience, and risk appetite before engaging in forex trading.</p>
        </div>
      </div>
    </div>
  );
};

export default Regulation;