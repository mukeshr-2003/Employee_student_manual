// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import bgImage from '../assets/movie-poster-background-p5qblffj7cvswl5g.jpg'; // ✅ Ensure correct path

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <style>
        {`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body, html, #root {
            height: 100%;
          }

          .background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url(${bgImage});
            background-size: cover;
            background-position: center;
            z-index: -2;
          }

          .background::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(8px); /* ✨ BLUR HERE */
            background-color: rgba(0, 0, 0, 0.4); /* Optional: darker overlay */
            z-index: -1;
          }

          .login-form {
            width: 100%;
            max-width: 400px;
            margin: 80px auto;
            padding: 30px 40px;
            background-color: rgba(255, 255, 255, 0.95);
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            font-family: 'Segoe UI', sans-serif;
            position: relative;
            z-index: 1;
          }

          .login-form h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
          }

          .login-form input {
            width: 100%;
            padding: 12px 15px;
            margin: 10px 0;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 6px;
            transition: border-color 0.3s;
          }

          .login-form input:focus {
            border-color: #2575fc;
            outline: none;
          }

          .login-form button {
            width: 100%;
            padding: 12px;
            margin-top: 15px;
            background-color: #2575fc;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .login-form button:hover {
            background-color: #1a5cd8;
          }

          .login-form p {
            text-align: center;
            margin-top: 15px;
            font-size: 14px;
            color: #555;
          }

          .login-form a {
            color: #2575fc;
            text-decoration: none;
          }

          .login-form a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="background" />
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>MOVIE EXPLORER</h2>
        <h2>Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </>
  );
}

export default Login;
