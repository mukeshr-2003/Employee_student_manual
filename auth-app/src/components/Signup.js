// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import bgImage from '../assets/movie-poster-background-p5qblffj7cvswl5g.jpg'; // ✅ Use your actual path

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { confirmPassword, ...signupData } = form; // exclude confirmPassword
      const res = await api.post('/signup', signupData);
      alert('Signup successful');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
      <style>
        {`
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
            backdrop-filter: blur(8px);
            background-color: rgba(0, 0, 0, 0.4);
            z-index: -1;
          }

          .signup-form {
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

          .signup-form h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
          }

          .signup-form input {
            width: 100%;
            padding: 12px 15px;
            margin: 10px 0;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 6px;
            transition: border-color 0.3s;
          }

          .signup-form input:focus {
            border-color: #2575fc;
            outline: none;
          }

          .signup-form button {
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

          .signup-form button:hover {
            background-color: #1a5cd8;
          }

          .signup-form p {
            text-align: center;
            margin-top: 15px;
            font-size: 14px;
            color: #555;
          }

          .signup-form a {
            color: #2575fc;
            text-decoration: none;
          }

          .signup-form a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="background" />

      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>MOVIE EXPLORER</h2>
        <h2>Signup</h2>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

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

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Signup</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
}

export default Signup;
