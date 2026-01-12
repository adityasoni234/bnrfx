import React from 'react';
import '../../styles/Website/AccountOpening.css';

function AccountOpening({ onOpenModal }) {
  const steps = [
    {
      number: '1',
      title: 'Register',
      description: 'Choose an account type and complete our fast and secure application form'
    },
    {
      number: '2',
      title: 'Verify',
      description: 'Use our digital onboarding system for fast verification'
    },
    {
      number: '3',
      title: 'Fund',
      description: 'Fund your trading account using a wide range of funding methods'
    },
    {
      number: '4',
      title: 'Trade',
      description: 'Start trading on your live account and access +2,100 instruments'
    }
  ];

  const paymentMethods = [
    { name: 'GPay', icon: '💳' },
    { name: 'Skrill', icon: '💰' },
    { name: 'Neteller', icon: '💵' },
    { name: 'PayPal', icon: '💸' },
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'Apple Pay', icon: '🍎' }
  ];

  return (
    <>
      {/* Payment Methods Section */}
      <section className="payment-section">
        <div className="container-wide">
          <div className="payment-content">
            <h2 className="section-title-dark">Your Money, Your Way</h2>
            
            <div className="payment-features">
              <div className="payment-feature">
                <span className="feature-icon">✓</span>
                <span>Instant Deposit</span>
              </div>
              <div className="payment-feature">
                <span className="feature-icon">✓</span>
                <span>Fast Withdrawal</span>
              </div>
              <div className="payment-feature">
                <span className="feature-icon">✓</span>
                <span>0% Commission</span>
              </div>
            </div>

            <div className="payment-methods-box">
              <h3>Payment methods</h3>
            </div>

            <p className="payment-info">
              For more information on deposits, withdrawals and how to fund your trading account, 
              <a href="#funding"> Go here</a>
            </p>

            <div className="payment-logos">
              {paymentMethods.map((method, index) => (
                <div className="payment-logo" key={index}>
                  <span>{method.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Account Opening Steps */}
      <section className="account-steps">
        <div className="container-wide">
          <h2 className="section-title-large center">Open an account in 4 simple steps</h2>
          
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div className="step-card" key={index}>
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="account-cta">
            <button className="btn-open-account" onClick={onOpenModal}>
              Open an account
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default AccountOpening;