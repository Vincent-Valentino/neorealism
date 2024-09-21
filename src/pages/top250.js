import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';

function Top() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://neorealism-be.vercel.app/api/movies');
        const movieData = await response.json();
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Top Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <motion.div
              key={movie._id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white mb-2">{movie.title}</h2>
                <p className="text-gray-400 text-sm mb-2">{movie.director}</p>
                <p className="text-yellow-400 font-bold mb-2">{movie.imdbRating}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {movie.genres.map((genre, idx) => (
                    <span key={idx} className="bg-gray-700 text-xs text-white px-2 py-1 rounded">
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm line-clamp-3">{movie.overview}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Top;