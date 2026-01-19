import React, { useState } from 'react';
import '../../styles/Website/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    message: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${formData.name}! We'll contact you soon.`);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <p className="contact-subtitle">GET IN TOUCH</p>
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-description">
            Have questions or need assistance? Our team is here to help you succeed in your trading journey.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info Cards */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3 className="info-title">Email Us</h3>
              <p className="info-text">support@bnrfx.com</p>
              <p className="info-text">sales@bnrfx.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3 className="info-title">Call Us</h3>
              <p className="info-text">+1 (208) 739-0893</p>
              <p className="info-text">Mon-Fri: 9AM - 6PM EST</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3 className="info-title">Visit Us</h3>
              <p className="info-text">123 Trading Street</p>
              <p className="info-text">New York, NY 10001</p>
            </div>

            <div className="info-card">
              <div className="info-icon">💬</div>
              <h3 className="info-title">Live Chat</h3>
              <p className="info-text">Available 24/7</p>
              <button className="whatsapp-btn" onClick={() => window.open('https://wa.me/+12087390893', '_blank')}>
                Chat on WhatsApp
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="John Doe"
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="john@example.com"
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject">
                    <option>General Inquiry</option>
                    <option>Account Support</option>
                    <option>Technical Issue</option>
                    <option>Partnership</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Your Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  placeholder="Tell us how we can help you..."
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">
                Send Message
                <span className="btn-arrow">→</span>
              </button>
            </form>
          </div>
        </div>

        {/* Map or Additional Info */}
        <div className="contact-map">
          <div className="map-placeholder">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6173903920035!2d-73.98823492346067!3d40.74844097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1704901234567!5m2!1sen!2sus"
              width="100%" 
              height="400" 
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen="" 
              loading="lazy"
              title="BNR Fx Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;