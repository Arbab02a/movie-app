'use client'

import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image'

const API_KEY = '1e1e11ee'; // Replace this with your own API key
const BASE_URL = 'http://www.omdbapi.com/';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const searchMovies = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          s: query,
        },
      });
      if (response.data.Search) {
        setMovies(response.data.Search);
        setError(null);
      } else {
        setError(response.data.Error);
      }
    } catch (error) {
      setError('Error fetching data');
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies();
  };

  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold mt-8 mb-4 ">Movie Searcher</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a movie..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-full outline-none text-black"
        />
        <button
          type="submit"
          className="bg-[#ff0000] text-white px-4 py-2 w-full rounded-lg mt-2 "
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border border-gray-300 rounded-lg p-4">
            <img src={movie.Poster} alt={movie.Title} className="mb-2" />
            <h2 className="text-lg font-bold">{movie.Title}</h2>
            <p className="text-gray-500">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
