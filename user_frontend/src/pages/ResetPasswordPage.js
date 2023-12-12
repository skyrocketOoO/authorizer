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
    <div style={styles.body}>
      {isValid ? (
        <div style={styles.block}>
          <h2>Reset Password</h2>
          <input
            style={styles.input}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='new password*'
          />
          <br></br>
          <input
            style={styles.input}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='confirm password*'
          />
          {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
          <button style={styles.button} onClick={handleResetPassword}>Reset Password</button>
        </div>
      ) : (
        <p>{resetStatus || 'Invalid or expired token. Page not found.'}</p>
      )}
    </div>
  );
};

const styles = {
  body: {
    background: 'linear-gradient(to bottom, #282c34, #555)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  block: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    minHeight: '300px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)', // Added a subtle box shadow
  },
  heading: {
    color: '#333', // Dark gray text color
    // textShadow: '1px 1px blue'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4caf50', // Green button color
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: '#2196F3', // Blue link color
    margin: '0 10px',
  },
};

export default ResetPasswordPage;
