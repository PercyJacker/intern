import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOTPForm = ({email}) => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleVerifyOTP = async (e) => {
      e.preventDefault();
      const backendURL = "https://intern-8hmo.vercel.app/";

      try {
        const response = await axios.post(`${backendURL}/api/send-otp`, {
          email,
          otp,
        });
        console.log('Backend Response:', response.data);

        // alert(response.data); // Show success message
        if (response.data.success) {
          alert('OTP Verified Successfully!');
          navigate('/uploadvideo'); // Redirect to the upload video page
        } else {
          setError(response.data.message || 'Invalid OTP. Please try again.');
        }
      } catch (err) {
        console.error(err);
        alert(err.response?.data || 'Error verifying OTP');
      }

    };
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <form
          onSubmit={handleVerifyOTP}
          className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP:
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="mt-1 w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Verify OTP
          </button>
        </form>
      </div>
    );
    
}

export default VerifyOTPForm
