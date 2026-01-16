import React from 'react';

const AccountComparison = () => {
  return (
    <div className="account-comparison">
      <style>{`
        .account-comparison { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .container { max-width: 1400px; margin: 0 auto; padding: 80px 20px; }
        .comparison-table { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #1a1a2e; color: white; padding: 20px; text-align: left; font-size: 1.2rem; }
        td { padding: 20px; border-bottom: 1px solid #eee; font-size: 1.1rem; }
        tr:hover { background: #f8f9fa; }
        .feature-name { font-weight: 600; color: #1a1a2e; }
        .check { color: #00ff88; font-size: 1.5rem; }
        @media (max-width: 768px) { .header h1 { font-size: 2.2rem; } }
      `}</style>
      
      <div className="header">
        <h1>Account Comparison</h1>
        <p>Compare all account types side by side</p>
      </div>
      
      <div className="container">
        <div className="comparison-table">
          <table>
            <thead>
              <tr><th>Feature</th><th>ENC</th><th>Standard</th><th>Premium</th><th>Islamic</th></tr>
            </thead>
            <tbody>
              <tr><td className="feature-name">Spreads From</td><td>0.0 pips</td><td>1.0 pips</td><td>0.5 pips</td><td>1.0 pips</td></tr>
              <tr><td className="feature-name">Commission</td><td>$3/lot</td><td>$0</td><td>$0</td><td>$0</td></tr>
              <tr><td className="feature-name">Min Deposit</td><td>$500</td><td>$100</td><td>$5,000</td><td>$100</td></tr>
              <tr><td className="feature-name">Max Leverage</td><td>1:500</td><td>1:1000</td><td>1:1000</td><td>1:1000</td></tr>
              <tr><td className="feature-name">Swap Free</td><td>-</td><td>-</td><td>-</td><td className="check">✓</td></tr>
              <tr><td className="feature-name">Scalping</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td className="feature-name">EA Trading</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td className="feature-name">Hedging</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td className="feature-name">Account Manager</td><td>-</td><td>-</td><td className="check">✓</td><td>-</td></tr>
              <tr><td className="feature-name">Premium Support</td><td>-</td><td>-</td><td className="check">✓</td><td>-</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountComparison;