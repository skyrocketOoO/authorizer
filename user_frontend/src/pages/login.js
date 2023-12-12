import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const config = require('../config');
  const selfuser_url = `${config.SP_BACKEND_URL}/selfuser`
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const resp = await axios.post(
            `${selfuser_url}/login`,
            {
                "email": email,
                "password": password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (resp.status === 200) {
            localStorage.setItem('authToken', resp.data.token);
            navigate("/");
        }else{
            console.error('Login failed:', resp);
            setError("Login failed");
        }
    }catch (error){
        console.log(error);
        setError("Login failed");
    }
  };

  const register = async () => {
    navigate("/register");
  };

  return (
    <div style={styles.body}>
      <div style={styles.block}>
        <div style={styles.heading}>
          <h1>Account system</h1>
        </div>
        <div>
          <input
            style={styles.input}
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder='email*'
          />
        </div>
        <div>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password*'
          />
        </div>
        <br></br>
        <button style={styles.button} onClick={handleLogin}>Login</button> {error}
        <button style={styles.button} onClick={register}>Register</button>
        <nav>
          <br></br>
          <Link style={styles.link} to="/forget_password">Forget password?</Link>
        </nav>
      </div>
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


export default Login;
