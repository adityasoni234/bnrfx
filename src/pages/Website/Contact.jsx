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
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Have questions? We're here to help</p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
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
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              value={formData.message} 
              onChange={handleChange} 
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;