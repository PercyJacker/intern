import React, { useState } from 'react'
import axios from 'axios';
import VerifyOTPForm from '../OTP/VerifyOTPForm.jsx'

const VerifyOTP = () => {
    const [email, setEmail] = useState('');
  const [showVerifyForm, setShowVerifyForm] = useState(false);

  const handleRequestOTP = async (e) => {
    e.preventDefault();

    const backendURL = "https://nullclass-j711.vercel.app";
    axios.post(`${backendURL}/api/send-otp`, { email })
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }
  return (
    <div>VerifyOTP
         {!showVerifyForm ? (
        <form onSubmit={handleRequestOTP} style={{ marginBottom: '20px' }}>
          <label>
            Enter Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
          <button type="submit" style={{ marginLeft: '10px' }}>
            Request OTP
          </button>
        </form>
      ) : (
        <VerifyOTPForm email={email} />
      )}
    </div>
  )
}

export default VerifyOTP