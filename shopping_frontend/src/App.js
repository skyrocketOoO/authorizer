import './App.css';
import Login from './login';
import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from 'react';
import ForgetPassword from './forget_password';
import Register from './register';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

function Home(){
  return(
    <>
      <main>
        <h1> Home </h1>
      </main>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
    </>
  );
}

function Product(){
  return (
    <>
      <main>
        <h1>  Hi </h1>
      </main>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
    </>
  );
}


export default App;
