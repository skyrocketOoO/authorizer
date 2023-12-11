// src/ResetPasswordPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const sp_server_url = "http://localhost:8000/selfuser"

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetStatus, setResetStatus] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const isValidToken = async () => {
    const token = getResetTokenFromUrl();

    try {
      const response = await axios.post(`${sp_server_url}/is_token_valid?token=${token}`);
      return response.data === true;
    } catch (error) {
      return false;
    }
  };

  const handleResetPassword = async () => {
    if (!passwordsMatch) {
      return;  // Prevent further execution if passwords don't match
    }

    const token = getResetTokenFromUrl();
    try {
      const response = await axios.post(`${sp_server_url}/reset_password?token=${token}`, {
        "new_password": newPassword,
      });
      setResetStatus('Password reset successful');
    } catch (error) {
      setResetStatus('Password reset failed. Please try again.');
    }
  };

  const getResetTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      const isValid = await isValidToken();
      setIsValid(isValid);
      if (!isValid) {
        setResetStatus('Invalid or expired token. Page not found.');
      }
    };

    checkTokenValidity();
  }, []);

  useEffect(() => {
    // Check if passwords match whenever newPassword or confirmPassword changes
    setPasswordsMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  return (
    <div>
      {isValid ? (
        <>
          <h2>Reset Password</h2>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ border: passwordsMatch ? '1px solid #ccc' : '1px solid red' }}
            />
            {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
          </div>
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      ) : (
        <p>{resetStatus || 'Invalid or expired token. Page not found.'}</p>
      )}
    </div>
  );
};

export default ResetPasswordPage;
