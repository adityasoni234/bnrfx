import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Website/Navbar.css';

function Navbar({ onOpenModal }) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleStartTrading = () => {
    navigate('/register');
    setIsMobileMenuOpen(false);
  };

  const handleBrokerLogin = () => {
    navigate('/broker-admin/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <a href="#client" className="top-link active">CLIENT</a>
            <span className="separator">|</span>
            <a href="#partners" className="top-link">PARTNERS</a>
            <span className="separator">|</span>
            <a href="#blog" className="top-link">BLOG</a>
          </div>
          <div className="top-bar-right">
            <a href="#ic-social" className="top-link">BNRFx Social</a>
            <span className="separator">|</span>
            <a href="#webtrader" className="top-link">WebTrader</a>
            <span className="separator">|</span>
            <button 
              onClick={handleStartTrading} 
              className="top-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Start Trading
            </button>
            <span className="separator">|</span>
            <a href="#demo" className="top-link">Try a Free Demo</a>
            <span className="separator">|</span>
            <a href="#contact" className="top-link">Contact Us</a>
            <span className="separator">|</span>
            <div className="language-selector">
              <span>🌐 EN ▼</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-brand">
            <a href="/" className="logo-link">
              <img src="/logo.png" alt="BNR Fx" className="navbar-logo" />
            </a>
          </div>
          
          {/* Navigation Menu */}
          <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li className="mobile-menu-header">
  <button
    className="mobile-menu-close"
    onClick={() => setIsMobileMenuOpen(false)}
    aria-label="Close menu"
  >
    ✕
  </button>
</li>
            <li><a href="#quickstart" onClick={() => scrollToSection('quickstart')}>Quickstart</a></li>
            <li><a href="#trading" onClick={() => scrollToSection('trading')}>Trading</a></li>
            <li><a href="#platforms" onClick={() => scrollToSection('platforms')}>Platforms</a></li>
            {/* <li><a href="#more" onClick={() => scrollToSection('more')}>More</a></li> */}
             <li className="mobile-actions">
    <button className="btn-start-trading mobile-btn" onClick={handleStartTrading}>
      Start Trading
    </button>
    <button className="btn-broker-login mobile-btn" onClick={handleBrokerLogin}>
      Broker Login
    </button>
  </li>
          </ul>
          
          {/* CTA Buttons */}
          <div className="navbar-actions">
            <button className="btn-start-trading" onClick={handleStartTrading}>
              Start Trading
            </button>
            <button className="btn-broker-login" onClick={handleBrokerLogin}>
              Broker Login
            </button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="navbar-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;