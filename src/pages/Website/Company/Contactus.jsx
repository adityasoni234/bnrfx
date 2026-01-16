import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-us">
      <style>{`
        .contact-us {
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
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.8;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 20px;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 35px;
          margin-bottom: 70px;
        }
        
        .contact-card {
          background: white;
          padding: 45px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .contact-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        }
        
        .contact-icon {
          width: 90px;
          height: 90px;
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          font-size: 2.5rem;
        }
        
        .contact-card h3 {
          color: #1a1a2e;
          font-size: 1.6rem;
          margin-bottom: 18px;
          font-weight: 600;
        }
        
        .contact-card p {
          color: #666;
          font-size: 1.05rem;
          margin-bottom: 12px;
          line-height: 1.6;
        }
        
        .contact-card a {
          color: #00ff88;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: color 0.3s ease;
        }
        
        .contact-card a:hover {
          color: #00d4ff;
        }
        
        .form-container {
          background: white;
          padding: 60px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          margin-bottom: 70px;
        }
        
        .form-container h2 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 40px;
          text-align: center;
          font-weight: 700;
        }
        
        .form-group {
          margin-bottom: 30px;
        }
        
        .form-group label {
          display: block;
          color: #1a1a2e;
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 16px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 1.05rem;
          font-family: inherit;
          transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #00ff88;
        }
        
        .form-group textarea {
          resize: vertical;
          min-height: 180px;
        }
        
        .submit-button {
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          color: #1a1a2e;
          padding: 20px 60px;
          border: none;
          border-radius: 50px;
          font-size: 1.3rem;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          transition: transform 0.3s ease;
        }
        
        .submit-button:hover {
          transform: scale(1.02);
        }
        
        .info-section {
          background: white;
          padding: 60px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        .info-section h2 {
          color: #1a1a2e;
          font-size: 2.2rem;
          margin-bottom: 30px;
          font-weight: 700;
        }
        
        .info-section p {
          color: #666;
          font-size: 1.15rem;
          line-height: 1.9;
          margin-bottom: 20px;
        }
        
        .office-info {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          border-radius: 12px;
          margin-top: 30px;
        }
        
        .office-info h3 {
          font-size: 1.8rem;
          margin-bottom: 20px;
        }
        
        .office-info p {
          font-size: 1.1rem;
          margin-bottom: 12px;
          opacity: 0.95;
        }
        
        .office-info strong {
          display: inline-block;
          min-width: 100px;
        }
        
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2.2rem;
          }
          
          .form-container {
            padding: 35px 25px;
          }
          
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="header">
        <h1>Contact BNR Fx</h1>
        <p>We're here to support your trading journey. Reach out and experience professional customer service.</p>
      </div>
      
      <div className="container">
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <h3>Email Support</h3>
            <p>Get assistance via email</p>
            <p><a href="mailto:support@bnrfx.com">support@bnrfx.com</a></p>
            <p style={{fontSize: '0.95rem', color: '#999', marginTop: '12px'}}>Response within 24 hours</p>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">💬</div>
            <h3>Live Chat</h3>
            <p>Instant support in real-time</p>
            <p style={{marginTop: '18px'}}><a href="#">Start Chat Now</a></p>
            <p style={{fontSize: '0.95rem', color: '#999', marginTop: '12px'}}>Available during business hours</p>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">📱</div>
            <h3>WhatsApp</h3>
            <p>Connect via messenger</p>
            <p style={{marginTop: '18px'}}><a href="https://wa.me/971501234567">+971 50 123 4567</a></p>
            <p style={{fontSize: '0.95rem', color: '#999', marginTop: '12px'}}>Quick and convenient</p>
          </div>
        </div>
        
        <div className="form-container">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+971 XX XXX XXXX"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="account">Account Related</option>
                <option value="technical">Technical Support</option>
                <option value="deposits">Deposits & Withdrawals</option>
                <option value="trading">Trading Question</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Please provide detailed information about your inquiry..."
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
        
        <div className="info-section">
          <h2>Our Office</h2>
          <p>Visit us at our Dubai headquarters or reach out through any of the channels above. We're committed to providing you with the support you need to succeed in the forex markets.</p>
          
          <div className="office-info">
            <h3>🇦🇪 BNR Fx - Dubai Office</h3>
            <p><strong>Location:</strong> Dubai, United Arab Emirates</p>
            <p><strong>Email:</strong> support@bnrfx.com</p>
            <p><strong>WhatsApp:</strong> +971 50 123 4567</p>
            <p><strong>Hours:</strong> Sunday - Thursday: 9:00 AM - 6:00 PM GST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;