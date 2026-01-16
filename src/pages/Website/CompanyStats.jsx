import React from 'react';
import '../../styles/Website/CompanyStats.css';

function CompanyStats({ onOpenModal }) {
  return (
    <>
      {/* About Section */}
      <section className="about-section">
        <div className="container-wide">
          <div className="about-badge">
            <span className="badge-icon"></span>
            <span>About Us</span>
          </div>
          
          <div className="about-grid">
            <div className="about-images">
              <div className="about-image-main">
                <div className="experience-badge">
                  <div className="experience-number">13+</div>
                  <div className="experience-text">Years of<br/>Experience</div>
                </div>
              </div>
              <div
  className="about-image-secondary"
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  <img
    src="/logo.png"
    alt="BNR Fx"
    width="150"
    style={{ height: 'auto' }}
  />
</div>

            </div>
            
            <div className="about-content">
              <h2 className="about-title">Your Path to Successful Trading</h2>
              <p className="about-description">
                BNR Fx was founded by business professionals with extensive and practical knowledge of 
                the financial markets. Our goal is to help our clients grow jointly in this fast-paced 
                global financial industry by giving them the best services and original solutions.
              </p>
              <p className="about-description">
                Our overarching goal is to excel at BNR Fx. By offering the best possible customer 
                service and making sure that our customers are treated fairly, we want to accomplish this. 
                In the international forex market, we wish to be your dependable global partner.
              </p>
              
              <div className="about-features">
                <div className="about-feature-item">
                  <span className="check-icon">✓</span>
                  <span>Trusted by Traders since 2011</span>
                </div>
                <div className="about-feature-item">
                  <span className="check-icon">✓</span>
                  <span>Registered CFD Broker</span>
                </div>
                <div className="about-feature-item">
                  <span className="check-icon">✓</span>
                  <span>Professional Support User</span>
                </div>
                <div className="about-feature-item">
                  <span className="check-icon">✓</span>
                  <span>Comprehensive Analysis</span>
                </div>
                <div className="about-feature-item">
                  <span className="check-icon">✓</span>
                  <span>Optimized Trading Solutions</span>
                </div>
                <div className="about-feature-item">
                  <span className="check-icon">✓</span>
                  <span>Multiple trading Instruments</span>
                </div>
              </div>
              
              <button className="btn-read-more">Read More</button>
              
              <div className="whatsapp-support">
                <span className="support-text">Support us</span>
                <a href="#whatsapp" className="whatsapp-link">On Whatsapp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container-wide">
          <div className="section-badge-center">
            <span className="badge-icon">⭐</span>
            <span>Benefit from the words NO.1 online financial derivatives broker</span>
          </div>
          
          <h2 className="section-title-center">Why Traders Worldwide Choose BNR Fx</h2>
          <p className="section-subtitle-center">
            BNR Fx empowers 2M+ clients with fast execution, advanced platforms, and unbeatable pricing 
            — delivering consistent, profitable trading.
          </p>
          
          <div className="why-choose-grid">
            <div className="why-card">
              <div className="why-icon">
                <span>🛡️</span>
                <div className="why-number">01</div>
              </div>
              <h3 className="why-title">Heavily Regulated Across 17+ Jurisdictions</h3>
              <p className="why-description">
                BNR Fx operates with the highest standards of trust and transparency, backed by 
                subsidiaries regulated under leading global financial authorities — including ASIC, 
                AUSTRAC, BaFin, CIMA, ESCA, CySEC, FSC, FMA, MAS, TFG, VARA, FSCM, FSAS, FIU, and VFSC.
              </p>
            </div>
            
            <div className="why-card">
              <div className="why-icon">
                <span>💰</span>
                <div className="why-number">02</div>
              </div>
              <h3 className="why-title">Daily Turnover: US $35 Billion</h3>
              <p className="why-description">
                At FX Trade, we process a daily turnover of over US $35 billion, showcasing our 
                record-breaking performance and strong growth momentum as of April 2025.
              </p>
            </div>
            
            <div className="why-card">
              <div className="why-icon">
                <span>📈</span>
                <div className="why-number">03</div>
              </div>
              <h3 className="why-title">Leverage up to 500:1</h3>
              <p className="why-description">
                We empower traders with leverage of up to 500:1, offering one of the highest levels 
                in the market to help maximize trading opportunities and potential returns.
              </p>
            </div>
            
            <div className="why-card">
              <div className="why-icon">
                <span>🎧</span>
                <div className="why-number">04</div>
              </div>
              <h3 className="why-title">24/7 Support</h3>
              <p className="why-description">
                To ensure seamless experiences, our customer support desk operates 24/7, providing 
                timely assistance whenever and wherever our clients need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="partnership-cta-section">
        <div className="container-wide">
          <div className="partnership-cta-content">
            <h2 className="partnership-cta-title">Become a Partner & Start your IB Journey</h2>
            <p className="partnership-cta-subtitle">
              We have a dedicated support team to resolve all your queries, we are available 24x7 
              on chat, skype, and WhatsApp.
            </p>
            <button className="btn-know-more">Know More</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default CompanyStats;