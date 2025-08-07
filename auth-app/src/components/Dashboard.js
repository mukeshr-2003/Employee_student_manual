// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';
import MovieCard from './MovieCard';

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [language, setLanguage] = useState('');
  const [year, setYear] = useState('');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserInfo(res.data);
      } catch (err) {
        alert('Session expired. Please log in again.');
        logout();
      }
    };

    fetchUser();
  }, []);

  const searchMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: 'USE_YOUR_API_KEY',
            query: query,
            language: language || 'en-US',
            primary_release_year: year || undefined
          }
        }
      );
      setMovies(res.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  if (!userInfo) return <p>Loading...</p>;

  return (
    <>
      <style>
        {`
          .dashboard {
            padding: 20px;
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: auto;
          }

          .dashboard h2 {
            margin-bottom: 10px;
          }

          .logout-button {
            background-color: #ff5252;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
          }

          .logout-button:hover {
            background-color: #e04848;
          }

          .search-section {
            margin: 30px 0;
          }

          .search-section input,
          .search-section select {
            padding: 10px;
            font-size: 16px;
            margin-right: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
            width: 200px;
          }

          .search-button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #2575fc;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }

          .search-button:hover {
            background-color: #1a5cd8;
          }

          .movie-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
          }
        `}
      </style>

      <div className="dashboard">
        <h2>Welcome, {userInfo.name}</h2>
        <button className="logout-button" onClick={logout}>Logout</button>

        <hr style={{ margin: '30px 0' }} />

        <h2>🎬 Movie Explorer</h2>
        <div className="search-section">
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search for a movie"
          />

          {/* <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="ml">Malayalam</option>
          </select> */}

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">All Years</option>
            {[...Array(25)].map((_, idx) => {
              const y = 2025 - idx;
              return <option key={y} value={y}>{y}</option>;
            })}
          </select>

          <button className="search-button" onClick={searchMovies}>Search</button>
        </div>

        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
