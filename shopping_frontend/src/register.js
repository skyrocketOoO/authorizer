import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const Register = () =>{
    const config = require('./config');
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
      <div>
        <h2>Register</h2>
        <div>
        <label>email:</label>
        <input 
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div>
        <label>name:</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div>
        <label>password:</label>
        <input 
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button onClick={register}>register</button>{register_status}
        <nav>
            <Link to="/login">Login</Link>
        </nav>
      </div>
    );
  }

  export default Register;
  