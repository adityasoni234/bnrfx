import React from 'react';

const DepositWithdrawal = () => {
  return (
    <div className="deposit-withdrawal">
      <style>{`
        .deposit-withdrawal {
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
        
        .intro-section {
          background: white;
          padding: 60px;
          margin-bottom: 50px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        .intro-section h2 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 30px;
          font-weight: 700;
        }
        
        .intro-section p {
          color: #555;
          font-size: 1.2rem;
          line-height: 2;
          margin-bottom: 25px;
        }
        
        .two-column {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 40px;
          margin: 60px 0;
        }
        
        .column-card {
          background: white;
          padding: 50px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        .column-card h2 {
          color: #1a1a2e;
          font-size: 2.3rem;
          margin-bottom: 30px;
          font-weight: 700;
        }
        
        .column-card h3 {
          color: #1a1a2e;
          font-size: 1.6rem;
          margin: 30px 0 20px;
          font-weight: 600;
        }
        
        .column-card p {
          color: #555;
          font-size: 1.1rem;
          line-height: 1.9;
          margin-bottom: 20px;
        }
        
        .feature-list {
          list-style: none;
          margin-top: 25px;
        }
        
        .feature-list li {
          padding: 15px 0;
          padding-left: 40px;
          position: relative;
          font-size: 1.1rem;
          color: #555;
          line-height: 1.7;
        }
        
        .feature-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          font-weight: bold;
          font-size: 1.5rem;
          color: #00ff88;
        }
        
        .process-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 70px;
          border-radius: 16px;
          color: white;
          margin: 60px 0;
        }
        
        .process-section h2 {
          font-size: 2.8rem;
          margin-bottom: 35px;
          font-weight: 700;
          text-align: center;
        }
        
        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }
        
        .process-card {
          background: rgba(255,255,255,0.1);
          padding: 35px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          text-align: center;
        }
        
        .process-card h4 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .process-card p {
          font-size: 1.05rem;
          line-height: 1.7;
          opacity: 0.95;
        }
        
        .security-section {
          background: white;
          padding: 60px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          margin: 60px 0;
        }
        
        .security-section h2 {
          color: #1a1a2e;
          font-size: 2.5rem;
          margin-bottom: 35px;
          font-weight: 700;
        }
        
        .security-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 35px;
        }
        
        .security-item {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 10px;
          border-left: 4px solid #00ff88;
        }
        
        .security-item h4 {
          color: #1a1a2e;
          font-size: 1.3rem;
          margin-bottom: 12px;
          font-weight: 600;
        }
        
        .security-item p {
          color: #666;
          font-size: 1rem;
          line-height: 1.7;
        }
        
        .notes-section {
          background: #fff3cd;
          border-left: 5px solid #ffc107;
          padding: 40px;
          border-radius: 12px;
        }
        
        .notes-section h3 {
          color: #856404;
          font-size: 1.8rem;
          margin-bottom: 25px;
          font-weight: 700;
        }
        
        .notes-section ul {
          list-style: none;
        }
        
        .notes-section li {
          padding: 12px 0;
          padding-left: 35px;
          position: relative;
          color: #856404;
          font-size: 1.1rem;
        }
        
        .notes-section li:before {
          content: "•";
          position: absolute;
          left: 10px;
          font-weight: bold;
          font-size: 1.5rem;
        }
        
        .disclaimer {
          background: #f8d7da;
          border-left: 5px solid #dc3545;
          padding: 40px;
          border-radius: 12px;
          margin-top: 50px;
        }
        
        .disclaimer h4 {
          color: #721c24;
          font-size: 1.6rem;
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .disclaimer p {
          color: #721c24;
          font-size: 1.1rem;
          line-height: 1.9;
        }
        
        @media (max-width: 968px) {
          .two-column {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2.2rem;
          }
          
          .intro-section {
            padding: 35px;
          }
        }
      `}</style>
      
      <div className="header">
        <h1>Deposit & Withdrawal</h1>
        <p>Fast, secure, and transparent fund management</p>
      </div>
      
      <div className="container">
        <div className="intro-section">
          <h2>Seamless Fund Management</h2>
          <p>We provide a secure, fast, and transparent deposit and withdrawal process to ensure smooth fund management for our clients.</p>
          <p>Our systems are designed to offer easy access to funds while maintaining strict security and compliance standards.</p>
        </div>
        
        <div className="two-column">
          <div className="column-card">
            <h2>💳 Deposits</h2>
            <p>Funding your trading account is quick and simple.</p>
            
            <h3>Deposit Features</h3>
            <ul className="feature-list">
              <li>Multiple secure payment options available</li>
              <li>Fast processing time</li>
              <li>No hidden charges from our side</li>
              <li>Funds credited after successful confirmation</li>
            </ul>
            
            <p style={{marginTop: '30px'}}>Deposits are processed using secure payment gateways and trusted financial partners, ensuring your funds reach your trading account safely and efficiently.</p>
          </div>
          
          <div className="column-card">
            <h2>💰 Withdrawals</h2>
            <p>We understand the importance of timely access to your funds.</p>
            
            <h3>Withdrawal Features</h3>
            <ul className="feature-list">
              <li>Simple and transparent withdrawal process</li>
              <li>Requests processed within defined timelines</li>
              <li>Withdrawals made using same method as deposit, where applicable</li>
              <li>Strict verification for enhanced fund security</li>
            </ul>
            
            <p style={{marginTop: '30px'}}>Withdrawal requests are reviewed to ensure account safety, compliance, and fraud prevention.</p>
          </div>
        </div>
        
        <div className="process-section">
          <h2>Processing Time</h2>
          <div className="process-grid">
            <div className="process-card">
              <h4>Deposits</h4>
              <p>Usually processed instantly or within a short time, depending on payment method</p>
            </div>
            
            <div className="process-card">
              <h4>Withdrawals</h4>
              <p>Processed within 24–72 business hours, depending on payment method and verification status</p>
            </div>
            
            <div className="process-card">
              <h4>Note</h4>
              <p>Processing time may vary based on banking partners and regional regulations</p>
            </div>
          </div>
        </div>
        
        <div className="security-section">
          <h2>Security & Compliance</h2>
          <div className="security-features">
            <div className="security-item">
              <h4>🔐 KYC & AML Policies</h4>
              <p>Strict Know Your Customer and Anti-Money Laundering procedures protect all parties.</p>
            </div>
            
            <div className="security-item">
              <h4>🔒 Encrypted Transactions</h4>
              <p>All transactions are encrypted using advanced security protocols.</p>
            </div>
            
            <div className="security-item">
              <h4>✅ Verification Checks</h4>
              <p>Manual and automated verification systems ensure transaction legitimacy.</p>
            </div>
          </div>
          
          <p style={{marginTop: '35px', fontSize: '1.15rem', color: '#555', lineHeight: '1.9'}}>These measures help protect client funds and ensure secure transactions for all deposits and withdrawals.</p>
        </div>
        
        <div className="notes-section">
          <h3>Important Notes</h3>
          <ul>
            <li>Ensure account verification is completed before requesting withdrawals</li>
            <li>Third-party payments are not accepted</li>
            <li>Minimum and maximum transaction limits may apply</li>
            <li>Fees, if any, depend on payment providers</li>
            <li>All transactions must comply with AML/KYC regulations</li>
            <li>Withdrawal requests are processed in the order received</li>
          </ul>
        </div>
        
        <div className="disclaimer">
          <h4>⚠️ Disclaimer</h4>
          <p>Deposit and withdrawal services are subject to company policies and applicable regulations. Forex trading involves risk. Please trade responsibly.</p>
        </div>
      </div>
    </div>
  );
};

export default DepositWithdrawal;