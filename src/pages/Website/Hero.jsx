import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Website/Hero.css';

function Hero({ onOpenModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const slides = [
    {
      title: "Master the Global Forex Market",
      subtitle: "Trade smarter, not harder.",
      description: "Join BNR Fx and gain access to real-time forex signals, advanced trading tools, and expert strategies to help you make confident moves in the world's largest financial market.",
      cta: "Get Started",
      action: "modal"
    },
    {
      title: "Your Partner in Profitable Forex Trading",
      subtitle: "Turn market opportunities into real results",
      description: "At BNR Fx, we combine cutting-edge technology with deep market insights to help you maximize profits, manage risks, and stay ahead in the ever-changing forex landscape.",
      cta: "Know More",
      action: "modal"
    },
    {
      title: "Trade Anywhere, Anytime",
      subtitle: "Stay connected to your trades 24/7.",
      description: "With BNR Fx's secure and easy-to-use platform, you can access live charts, market news, and instant execution — whether you're at home, at work, or on the go.",
      cta: "Contact Us",
      action: "contact"
    }
  ];

  const stats = [
    { value: "0.0", label: "ZERO SPREAD" },
    { value: "$100", label: "MINIMUM DEPOSIT" },
    { value: "0.13Ms", label: "AVG EXECUTION TIME" },
    { value: "1:1000", label: "MINIMUM LEVERAGE" },
    { value: "24/7", label: "DEDICATED SUPPORT" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleCTAClick = (action) => {
    if (action === "contact") {
      // Navigate to the Contact page
      navigate('/contact');
    } else {
      onOpenModal();
    }
  };

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    window.open('https://wa.me/+12087390893?text=I%20want%20to%20trade%20in%20Fx%20with%20BNR%20Fx', '_blank');
  };

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ 
                backgroundImage: 'linear-gradient(135deg, #0a1628 0%, #1a3a52 100%)',
                display: index === currentSlide ? 'block' : 'none'
              }}
            >
              <div className="hero-content-wrapper">
                <div className="hero-content">
                  <div className="hero-text">
                    <div className="hero-icon">
                      <img src="/pro.png" alt="BNR Fx" className="hero-logo-image" />
                    </div>
                    <p className="hero-subtitle-small">{slide.subtitle}</p>
                    <h1 className="hero-title">
                      {slide.title}
                    </h1>
                    <p className="hero-subtitle">
                      {slide.description}
                    </p>
                    <button 
                      className="btn-get-started" 
                      onClick={() => handleCTAClick(slide.action)}
                    >
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Stats Bar */}
          <div className="stats-bar">
            {stats.map((stat, index) => (
              <div className="stat-item" key={index}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="slide-indicators">
            {slides.map((_, index) => (
              <span 
                key={index} 
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                style={{ 
                  backgroundColor: index === currentSlide ? '#ffd700' : 'rgba(255, 255, 255, 0.4)' 
                }}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Fixed Chat Widget - Outside hero section for proper positioning */}
      <div className="chat-widget-fixed">
        <div className="chat-bubble">Support us</div>
        <div className="chat-prompt">On WhatsApp</div>
        <button className="chat-button" onClick={handleWhatsAppClick} aria-label="Chat on WhatsApp">
          💬
        </button>
      </div>
    </>
  );
}

export default Hero;