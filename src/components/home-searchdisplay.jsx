import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button, BookmarkIcon, VideoIcon, PlayIcon, InfoSignIcon } from "evergreen-ui";

const SearchDisplay = ({ movies, bookmarkedMovies, toggleBookmark }) => {
  const navigate = useNavigate();
  const [showOverview, setShowOverview] = useState({});

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 bg-ebony-black pb-20"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.slice(0, 12).map((movie, index) => (
          <motion.div
            key={movie._id || index}
            className="relative bg-night border border-licorice rounded-lg shadow-lg overflow-hidden"
            onClick={() => navigate(`/movies/${movie._id}`)}
          >
            <div className="relative cursor-pointer">
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="w-full h-auto object-cover rounded-t-lg cursor-pointer"
              />
              <BookmarkIcon
                size={30}
                className="absolute top-2 right-2 text-white cursor-pointer lg:hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(movie._id);
                }}
                color={bookmarkedMovies[movie._id] ? "warning" : "muted"}
              />
              {showOverview[movie._id] && (
                <div className="absolute inset-0 bg-black bg-opacity-80 text-white p-2 overflow-y-auto">
                  <p className="text-sm">{movie.overview || 'No overview available.'}</p>
                </div>
              )}
            </div>
            <div className="p-2 lg:hidden">
              <h3 className="text-sm font-semibold mb-2 text-white truncate">{movie.title}</h3>
              <div className="flex flex-col space-y-2">
                <Button 
                  width="100%"
                  iconBefore={PlayIcon}
                  appearance="primary"
                  intent="success"
                  height={32}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/movies/${movie._id}/watch`)}}
                >
                  Play
                </Button>
                <Button 
                  width="100%"
                  iconBefore={VideoIcon}
                  appearance="primary"
                  intent="none"
                  height={32}
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
                <Button
                  width="100%"
                  iconBefore={InfoSignIcon}
                  appearance="primary"
                  intent="warning"
                  height={32}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOverview(prev => ({ ...prev, [movie._id]: !prev[movie._id] }))}}
                >
                  Info
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex flex-col text-blue-50">
              <h1 className="text-pretty text-center my-2">{movie.title}</h1>
              <h1 className="text-xs text-center mb-3">{movie.genres.join(', ')}</h1>
            </div>
            {/* Desktop hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black bg-opacity-80 text-white p-4 lg:flex-col lg:justify-center items-center space-y-2 hidden lg:flex"
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
              <Button 
                width="70%"
                iconBefore={PlayIcon} 
                appearance="primary" 
                intent="success" 
                height={28}
                onClick={() => navigate(`/movies/${movie._id}/watch`)}
              >
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
      {movies.length > 11 && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 text-center"
        >
          <Button onClick={() => navigate("/movies")} appearance="primary" intent="none" height={40}>
            Load More
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchDisplay;
