// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '10px', 
      width: '200px',
      margin: '10px',
      textAlign: 'center',
      padding: '10px'
    }}>
      <img src={imageUrl} alt={movie.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}</p>
      <p>📅 {movie.release_date}</p>
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieCard;
