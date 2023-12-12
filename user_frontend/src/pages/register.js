import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const Register = () =>{
    const config = require('../config');
    const selfuser_url = `${config.SP_BACKEND_URL}/selfuser`

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [register_status, setRegister_status] = useState("");
  

    const register = async () => {
        try {
            const resp = await axios.post(
                `${selfuser_url}/register`,
                {
                    "email": email,
                    "name": name,
                    "password": password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            if (resp.status === 200){
                setRegister_status("success")
            }else{
                setRegister_status("failed")
            }

        }catch (error) {
            setRegister_status("failed")
        }
    }

    return (
      <div style={styles.body}>
        <div style={styles.block}>
          <h1>Register</h1>
          <input 
            style={styles.input}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email*'
          />
          <input 
            style={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='name'
          />
          <input 
            style={styles.input}
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password*'
          />
          <button style={styles.button} onClick={register}>register</button>{register_status}
          <nav style={styles.link}>
              <Link to="/login">Login</Link>
          </nav>
        </div>
      </div>
    );
  }

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
      padding: '16px',
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

  export default Register;
  