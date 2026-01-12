import React, { useState } from 'react';
import '../../styles/Website/Funding.css';

function Funding() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { 
      q: 'How long do deposits take?', 
      a: 'UPI/IMPS deposits are instant. Bank transfers take 2-4 hours.' 
    },
    { 
      q: 'What are withdrawal processing times?', 
      a: 'Withdrawals are processed within 24 hours on business days.' 
    },
    { 
      q: 'Is KYC mandatory?', 
      a: 'Yes, KYC is required for all deposits above $500 and for withdrawals.' 
    }
  ];

  return (
    <section className="funding" id="funding">
      <div className="container">
        <h2 className="section-title">Funding & KYC</h2>
        <p className="section-subtitle">Fast, secure, and compliant payment processing</p>
        
        <div className="payment-methods">
          <div className="payment-badge">🏦 UPI</div>
          <div className="payment-badge">💳 IMPS</div>
          <div className="payment-badge">🏛️ Bank Transfer</div>
          <div className="payment-badge">₮ USDT</div>
        </div>

        <p className="instant-note">✅ Instant credit for UPI/IMPS deposits</p>

        <div className="faq">
          <h3>Frequently Asked Questions</h3>
          {faqs.map((faq, i) => (
            <div className="faq-item" key={i}>
              <div 
                className="faq-question" 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && <div className="faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Funding;