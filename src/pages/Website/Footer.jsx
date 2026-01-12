import React from 'react';
import '../../styles/Website/Footer.css';

function Footer() {
  const footerLinks = {
    company: [
      'Why BNR Fx',
      'Contact Us',
      'Awards',
      'Regulation',
      'Career'
    ],
    importantLinks: [
      'Trading Rewards',
      'Exclusive Rewards',
      'Partnership',
      '20% Deposit Bonus'
    ],
    extras: [
      'Social Media',
      'Margin Calculator'
    ],
    accounts: [
      'Demo Account',
      'ENC Account',
      'Standard Account',
      'Premium Account'
    ],
    forex: [
      'Trading',
      'Islamic Account',
      'Trading Condition',
      'Account Comparison'
    ],
    financial: [
      'Security of Funds',
      'Deposit & Withdrawal',
      'Negative Balance Protection'
    ],
    platform: [
      'All Terminal',
      'Download For PC',
      'Download For Android',
      'Download For Apple'
    ]
  };

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="container-wide">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-column footer-brand">
              <div className="footer-logo">
                <div className="logo-icon-footer">
                  <div className="bar bar1"></div>
                  <div className="bar bar2"></div>
                  <div className="bar bar3"></div>
                </div>
                <div className="logo-text-footer">
                  <span className="fx-text">BNR Fx</span>
                </div>
              </div>
              <p className="footer-description">
                BNR Fx is a comprehensive platform designed to empower traders at every level. 
                BNR Fx provides the tools, technology, and support you need to succeed in the 
                dynamic world of forex trading.
              </p>
              
              {/* Social Icons */}
              <div className="social-icons">
                <a href="#twitter" className="social-icon" aria-label="Twitter">
                  <span>𝕏</span>
                </a>
                <a href="#facebook" className="social-icon" aria-label="Facebook">
                  <span>f</span>
                </a>
                <a href="#instagram" className="social-icon" aria-label="Instagram">
                  <span>📷</span>
                </a>
                <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
                  <span>in</span>
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Links */}
            <div className="footer-column">
              <h4 className="footer-heading">Important Links</h4>
              <ul className="footer-links">
                {footerLinks.importantLinks.map((link, index) => (
                  <li key={index}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Extra's */}
            <div className="footer-column">
              <h4 className="footer-heading">Extra's</h4>
              <ul className="footer-links">
                {footerLinks.extras.map((link, index) => (
                  <li key={index}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accounts */}
            <div className="footer-column">
              <h4 className="footer-heading">Accounts</h4>
              <ul className="footer-links">
                {footerLinks.accounts.map((link, index) => (
                  <li key={index}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Forex */}
            <div className="footer-column">
              <h4 className="footer-heading">Forex</h4>
              <ul className="footer-links">
                {footerLinks.forex.map((link, index) => (
                  <li key={index}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Financial */}
            <div className="footer-column">
              <h4 className="footer-heading">Financial</h4>
              <ul className="footer-links">
                {footerLinks.financial.map((link, index) => (
                  <li key={index}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform */}
            <div className="footer-column">
              <h4 className="footer-heading">Platform</h4>
              <ul className="footer-links">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container-wide">
          {/* Risk Statement */}
          <div className="footer-disclaimer">
            <p className="disclaimer-text">
              <strong>Risk Statement:</strong> An investment in derivatives may mean investors may lose an amount even 
              greater than their original investment. Anyone wishing to invest in any of the products mentioned on 
              www.bnrfx.co should seek their own financial or professional advice. Trading of securities, forex, 
              stock market, commodities, options, and futures may not be suitable for everyone and involves the risk 
              of losing part or all of your money.
            </p>
            
            <p className="disclaimer-text">
              <strong>Disclaimer:</strong> You are strongly advised to obtain independent financial, legal and tax 
              advice before proceeding with any currency or spot metals trade. Nothing in this site should be read or 
              construed as constituting advice on the part of BNR Fx PTE. LTD. or any of its affiliates, directors, 
              officers or employees.
            </p>
            
            <p className="disclaimer-text">
              <strong>Restricted Regions:</strong> BNR Fx PTE. LTD. does not provide services for citizens/residents 
              of the United States, Cuba, Iraq, Myanmar, North Korea, Sudan, UAE, India and FATE Blacklisted countries.
            </p>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p className="copyright">
              © {new Date().getFullYear()} BNR Fx PTE. LTD. All Rights Reserved.
            </p>
            <div className="footer-legal-links">
              <a href="#privacy">Privacy policy</a>
              <a href="#risk">Risk Warning</a>
              <a href="#disclaimer">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;