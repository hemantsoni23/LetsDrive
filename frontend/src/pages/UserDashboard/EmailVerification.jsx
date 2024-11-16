import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailVerification = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROUTE}/users/verify-email`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Failed to verify email');
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-2xl font-semibold">Email Verification</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default EmailVerification;
