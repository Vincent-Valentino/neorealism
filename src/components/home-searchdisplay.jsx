import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button, BookmarkIcon, VideoIcon, PlayIcon } from "evergreen-ui";

const SearchDisplay = ({ movies, bookmarkedMovies, toggleBookmark }) => {
  const navigate = useNavigate();

  if (!movies || movies.length === 0) {
    return <div className="p-4 text-center text-gray-400">No movies to display.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 bg-ebony-black pb-20"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-3">
        {movies.slice(0, 12).map((movie, index) => (
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
      {movies.length > 11 && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 text-center"
        >
          <Button onClick={()=>navigate("/movies")} appearance="primary" intent="none" height={40}>
            Load More
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchDisplay;