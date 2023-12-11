import './App.css';
import Login from './login';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect} from 'react';
import ForgetPassword from './forget_password';
import Register from './register';
import ResetPasswordPage from './ResetPasswordPage';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset_password" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <main>
        <h1>Home</h1>
      </main>
    </>
  );
}


export default App;
