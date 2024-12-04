import React, { useState } from 'react'
import axios from 'axios';
import VerifyOTPForm from '../OTP/VerifyOTPForm.jsx'

const VerifyOTP = () => {
    const [email, setEmail] = useState('');
  const [showVerifyForm, setShowVerifyForm] = useState(false);

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    // const backendURL = "https://intern-8hmo.vercel.app";
  axios.post(`https://intern-a3y7.vercel.app/api/send-otp`, { email })
  .then(response => {
      alert(response.data);
    setShowVerifyForm(true);
        console.log(response);


  })
  .catch(error => console.error(error));
  };

  //     const handleRequestOTP = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('https://intern-8hmo.vercel.app/api/send-otp', {
  //       email,
  //     });
  //     alert(response.data); // Show success message
  //     setShowVerifyForm(true); // Show the OTP verification form
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.response?.data || 'Error sending OTP');
  //   }
  // };

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
