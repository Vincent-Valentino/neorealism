import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar.jsx";
import SearchFilter from "../components/home-searchfilter.jsx";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, PlayIcon, VideoIcon, BookmarkIcon } from 'evergreen-ui';

function Movies({ bookmarkedMovies, toggleBookmark }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://neorealism-be.vercel.app/api/movies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data); // Initialize filteredMovies with all movies
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = movies.filter(movie => {
      const titleMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const directorMatch = movie.director.toLowerCase().includes(searchTerm.toLowerCase());
      const castMatch = movie.cast.some(castMember =>
        castMember.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      return titleMatch || directorMatch || castMatch;
    });
  
    setFilteredMovies(filtered);
  };  

  const handleFilterChange = (filter) => {
    const filtered = movies.filter(movie => {
      const matchesGenres = filter.genres.length === 0 || filter.genres.every(genre => movie.genres.includes(genre));
      const matchesCountry = filter.country === '' || movie.country === filter.country;
      const matchesAward = !filter.award || (
        filter.awardStatus === 'All' && (
          movie.awards?.winner?.some(a => a.award === filter.award) || 
          movie.awards?.nominated?.some(a => a.award === filter.award)
        )
      ) || (
        filter.awardStatus === 'Winner' && movie.awards?.winner?.some(a => a.award === filter.award)
      ) || (
        filter.awardStatus === 'Nominated' && movie.awards?.nominated?.some(a => a.award === filter.award)
      );
      return matchesGenres && matchesCountry && matchesAward;
    });

    setFilteredMovies(filtered);
  };

  return (
    <div>
      <Navbar />
      <SearchFilter onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="p-4 bg-ebony-black pb-20 min-h-screen"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-3">
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={movie._id || index}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/movies/${movie._id}`)}
              className="h-auto cursor-pointer relative bg-night border border-licorice rounded-lg shadow-lg overflow-hidden"
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-auto object-cover rounded-t-lg" />
              <div className="p-3">
                <h3 className="text-md font-semibold mb-1 text-white truncate">{movie.title}</h3>
                <p className="text-sm text-gray-400 truncate">
                  {Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres || 'Unknown Genre'}
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black bg-opacity-80 text-white p-4 flex flex-col justify-center items-center space-y-1"
              >
                <p className="text-sm text-center text-gray-300 line-clamp-3 mb-2">{movie.overview || 'No overview available.'}</p>
                <Button 
                  width="70%"
                  iconBefore={VideoIcon} 
                  appearance="primary" 
                  intent="none" 
                  height={28} 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (movie.trailer) {
                      window.open(movie.trailer, '_blank');
                    } else {
                      alert('Trailer not available');
                    }
                  }}
                >
                  Trailer
                </Button>
                <Button iconBefore={PlayIcon} width="70%" appearance="primary" intent="success" height={28}>
                  Watch Now
                </Button>
                <Button 
                  width="70%"
                  iconBefore={BookmarkIcon} 
                  appearance={bookmarkedMovies[movie._id] ? "primary" : "default"} 
                  intent={bookmarkedMovies[movie._id] ? "warning" : "none"} 
                  height={28}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(movie._id);
                  }}
                >
                  {bookmarkedMovies[movie._id] ? "Bookmarked" : "Bookmark"}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Movies;
