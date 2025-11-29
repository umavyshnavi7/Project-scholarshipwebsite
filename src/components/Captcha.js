import React, { useState, useEffect } from 'react';
import './Captcha.css';

const Captcha = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    setIsVerified(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    if (userInput === captchaText) {
      setIsVerified(true);
      onVerify(true);
    } else {
      setIsVerified(false);
      onVerify(false);
      generateCaptcha();
    }
  };

  return (
    <div className="captcha-container">
      <div className="captcha-box">
        <div className="captcha-text">{captchaText}</div>
        <button className="refresh-btn" onClick={generateCaptcha}>🔄</button>
      </div>
      <input
        type="text"
        className="captcha-input"
        placeholder="Enter CAPTCHA"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button className="verify-btn" onClick={handleVerify}>
        Verify
      </button>
      {isVerified && <span className="success-msg">✓ Verified</span>}
    </div>
  );
};

export default Captcha;