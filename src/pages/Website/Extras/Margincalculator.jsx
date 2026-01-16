import React, { useState } from 'react';

const MarginCalculator = () => {
  const [formData, setFormData] = useState({
    accountCurrency: 'USD',
    currencyPair: 'EURUSD',
    lotSize: '1',
    leverage: '100',
    price: ''
  });
  
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const lots = parseFloat(formData.lotSize) || 0;
    const lev = parseFloat(formData.leverage) || 100;
    const contractSize = 100000;
    const marginRequired = (lots * contractSize) / lev;
    setResult({ margin: marginRequired.toFixed(2) });
  };

  return (
    <div className="margin-calculator">
      <style>{`
        .margin-calculator { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background: #f8f9fa; }
        .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 100px 20px; text-align: center; }
        .header h1 { font-size: 3.5rem; margin-bottom: 25px; font-weight: 700; }
        .header p { font-size: 1.4rem; opacity: 0.95; max-width: 900px; margin: 0 auto; line-height: 1.8; }
        .container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
        .calculator-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 60px 0; }
        .calculator-form { background: white; padding: 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .calculator-form h2 { color: #1a1a2e; font-size: 2.2rem; margin-bottom: 35px; font-weight: 700; }
        .form-group { margin-bottom: 25px; }
        .form-group label { display: block; color: #1a1a2e; font-weight: 600; margin-bottom: 10px; font-size: 1.1rem; }
        .form-group input, .form-group select { width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1.05rem; }
        .form-group input:focus, .form-group select:focus { outline: none; border-color: #00ff88; }
        .calc-button { width: 100%; padding: 18px; background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); color: #1a1a2e; border: none; border-radius: 50px; font-size: 1.3rem; font-weight: 700; cursor: pointer; margin-top: 20px; }
        .calc-button:hover { transform: scale(1.02); }
        .result-panel { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px; border-radius: 16px; color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; }
        .result-panel h3 { font-size: 2rem; margin-bottom: 30px; font-weight: 700; }
        .result-value { font-size: 4rem; font-weight: 900; margin: 20px 0; }
        .result-label { font-size: 1.3rem; opacity: 0.9; }
        .info-section { background: white; padding: 60px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .info-section h2 { color: #1a1a2e; font-size: 2.5rem; margin-bottom: 30px; font-weight: 700; }
        .info-section p { color: #555; font-size: 1.15rem; line-height: 2; margin-bottom: 20px; }
        .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 40px; }
        .info-card { background: #f8f9fa; padding: 30px; border-radius: 10px; border-left: 4px solid #00ff88; }
        .info-card h4 { color: #1a1a2e; font-size: 1.3rem; margin-bottom: 12px; font-weight: 600; }
        .info-card p { color: #666; font-size: 1rem; line-height: 1.7; }
        @media (max-width: 968px) { .calculator-wrapper { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .header h1 { font-size: 2.2rem; } }
      `}</style>
      
      <div className="header">
        <h1>Margin Calculator</h1>
        <p>Calculate required margin for your forex trades</p>
      </div>
      
      <div className="container">
        <div className="calculator-wrapper">
          <div className="calculator-form">
            <h2>Calculate Margin</h2>
            
            <div className="form-group">
              <label>Account Currency</label>
              <select value={formData.accountCurrency} onChange={(e) => setFormData({...formData, accountCurrency: e.target.value})}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="AED">AED</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Currency Pair</label>
              <select value={formData.currencyPair} onChange={(e) => setFormData({...formData, currencyPair: e.target.value})}>
                <option value="EURUSD">EUR/USD</option>
                <option value="GBPUSD">GBP/USD</option>
                <option value="USDJPY">USD/JPY</option>
                <option value="AUDUSD">AUD/USD</option>
                <option value="USDCAD">USD/CAD</option>
                <option value="NZDUSD">NZD/USD</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Lot Size</label>
              <input type="number" step="0.01" value={formData.lotSize} onChange={(e) => setFormData({...formData, lotSize: e.target.value})} placeholder="1.00" />
            </div>
            
            <div className="form-group">
              <label>Leverage</label>
              <select value={formData.leverage} onChange={(e) => setFormData({...formData, leverage: e.target.value})}>
                <option value="50">1:50</option>
                <option value="100">1:100</option>
                <option value="200">1:200</option>
                <option value="500">1:500</option>
                <option value="1000">1:1000</option>
              </select>
            </div>
            
            <button className="calc-button" onClick={handleCalculate}>Calculate Margin</button>
          </div>
          
          <div className="result-panel">
            <h3>Required Margin</h3>
            {result ? (
              <>
                <div className="result-value">${result.margin}</div>
                <div className="result-label">{formData.accountCurrency}</div>
              </>
            ) : (
              <p style={{fontSize: '1.2rem', opacity: 0.9}}>Enter values and click calculate to see required margin</p>
            )}
          </div>
        </div>
        
        <div className="info-section">
          <h2>Understanding Margin</h2>
          <p>Margin is the amount of capital required to open and maintain a trading position. It acts as a good faith deposit, allowing you to control larger positions with a smaller amount of capital through leverage.</p>
          <p>Understanding margin requirements is crucial for effective risk management and preventing margin calls.</p>
          
          <div className="info-grid">
            <div className="info-card">
              <h4>What is Margin?</h4>
              <p>The collateral required to open and maintain leveraged trading positions.</p>
            </div>
            
            <div className="info-card">
              <h4>Leverage Impact</h4>
              <p>Higher leverage reduces margin requirements but increases risk exposure.</p>
            </div>
            
            <div className="info-card">
              <h4>Free Margin</h4>
              <p>The amount available to open new positions after accounting for used margin.</p>
            </div>
            
            <div className="info-card">
              <h4>Margin Call</h4>
              <p>Occurs when account equity falls below required margin levels, requiring additional funds or position closure.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarginCalculator;