import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const config = require('./config');
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
            navigate("/product");
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
    <div>
      <h2>Login</h2>
      <div>
        <label>email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button> {error}
      <button onClick={register}>Register</button>
      <nav>
            <Link to="/forget_password">Forget password</Link>
      </nav>
    </div>
  );
};

export default Login;
