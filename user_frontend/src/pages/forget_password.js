import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const ForgetPassword = () =>{
    const [email, setEmail] = useState('');
    const [send_status, setSend_status] = useState('');
    const config = require('../config');
    const selfuser_url = `${config.SP_BACKEND_URL}/selfuser`
  
    const send_reset_email = async () =>{
        try {
            const resp = await axios.post(
                `${selfuser_url}/forget_password`,
                {
                    "email": email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            
            if (resp.status === 200) {
                setSend_status("email sent")
            }else{
                setSend_status(resp.data)
            }
        } catch(error){
            setSend_status("failed")
        }
    }
  
    return (
      <div>
        <h2>Forget password</h2>
        <input 
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={send_reset_email}>Send reset email</button>{send_status}
        <nav>
            <Link to="/login">Login</Link>
        </nav>
      </div>
    );
  }

  export default ForgetPassword;
  