import React, { useState } from 'react'

export default function App() {
  const [form, setForm] = useState({
    age: '',
    sex: '',
    bmi: '',
    hba1c: '',
    duration: '',
    sbp: '',
    dbp: '',
    fpg: '',
    twohpp: ''
  });

  const [risk, setRisk] = useState(null);
  const [cutoff, setCutoff] = useState(0.5);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const calculateRisk = () => {
    const {
      age, sex, bmi, hba1c, duration, sbp, dbp, fpg, twohpp
    } = form;

    let logit = -5 +
      0.05 * Number(age) +
      0.8 * (sex === 'female' ? 1 : 0) +
      0.1 * Number(bmi) +
      0.3 * Number(hba1c) +
      0.07 * Number(duration) +
      0.02 * Number(sbp) +
      0.02 * Number(dbp) +
      0.015 * Number(fpg) +
      0.01 * Number(twopp);

    const prob = 1 / (1 + Math.exp(-logit));
    setRisk(prob);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>DPN Risk Checker</h1>
      <p>Enter patient details:</p>
      <div>
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label>
              {key.toUpperCase()}: 
              <input type="text" name={key} value={form[key]} onChange={handleChange} />
            </label>
          </div>
        ))}
      </div>
      <div>
        <label>
          Risk Cutoff (%):
          <input type="number" step="0.01" value={cutoff} onChange={(e) => setCutoff(e.target.value)} />
        </label>
      </div>
      <button onClick={calculateRisk}>Check Risk</button>
      {risk !== null && (
        <div>
          <h3>Predicted Risk: {(risk * 100).toFixed(2)}%</h3>
          {risk >= cutoff ? (
            <p style={{ color: 'red' }}>⚠️ High Risk for DPN</p>
          ) : (
            <p style={{ color: 'green' }}>✅ Low Risk for DPN</p>
          )}
        </div>
      )}
    </div>
  );
}