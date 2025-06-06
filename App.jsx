import React, { useState } from 'react';
import './App.scss';

export default function App() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseInt(tenure) * 12;

    if (!P || !R || !N) {
      alert('Please enter valid numbers in all fields');
      return;
    }

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    setEmi({
      monthly: emiValue.toFixed(2),
      totalPayment: (emiValue * N).toFixed(2),
      totalInterest: (emiValue * N - P).toFixed(2),
    });
  };

  return (
    <div className="app">
      <div className="overlay" />
      <div className="calculator-container">
        <h1 className="title">Loan EMI Calculator</h1>

        <label>Loan Amount (₹):</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="e.g. 500000"
        />

        <label>Annual Interest Rate (%):</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="e.g. 7.5"
        />

        <label>Loan Tenure (Years):</label>
        <input
          type="number"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          placeholder="e.g. 5"
        />

        <button onClick={calculateEMI}>Calculate EMI</button>

        {emi && (
          <div className="result">
            <p><strong>Monthly EMI:</strong> ₹{emi.monthly}</p>
            <p><strong>Total Interest:</strong> ₹{emi.totalInterest}</p>
            <p><strong>Total Payment:</strong> ₹{emi.totalPayment}</p>
          </div>
        )}
      </div>
    </div>
  );
}
