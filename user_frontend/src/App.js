import './App.css';
import Login from './pages/login';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect} from 'react';
import ForgetPassword from './pages/forget_password';
import Register from './pages/register';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Home from './pages/home';


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


export default App;
