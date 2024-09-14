import React, { useState, useEffect, useCallback } from 'react';
import Loading from '../utilities/loading';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, VideoIcon, BookmarkIcon } from 'lucide-react';
import { Button } from 'evergreen-ui';
import Navbar from "../components/navbar"; // Ensure this path is correct

const MovieDetails = ({ bookmarkedMovies, toggleBookmark }) => {
  const { movie_id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  const fetchMovie = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/movies/${movie_id}`);
      if (!response.ok) throw new Error("Failed to fetch movie data");
      const data = await response.json();
      setMovie(data.data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  }, [movie_id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const handleWatchNow = () => navigate(`/movies/${movie_id}/watch`);
  const handleTrailerClick = () => {
    if (movie?.trailer) window.open(movie.trailer, '_blank');
    else alert('Trailer not available');
  };

  if (!movie) return <div><Loading/></div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-[28rem]">
        <video
          src={movie?.video}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end p-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie?.title}</h1>
            <p className="text-xl">{movie?.director}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        {/* Left Column - Movie Information */}
        <div className="md:w-2/3 pr-8">
          {/* Tabs */}
          <div className="flex mb-6">
            {['about', 'cast', 'awards'].map((tab) => (
              <button
                key={tab}
                className={`mr-4 pb-2 ${
                  activeTab === tab ? 'border-b-2 border-blue-500' : ''
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'about' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Plot</h2>
                  <p>{movie?.overview}</p>
                  <div className="mt-4">
                    <p><strong>Genres:</strong> {movie?.genres.join(', ')}</p>
                    <p><strong>Runtime:</strong> {movie?.runtime}</p>
                    <p><strong>IMDB Rating:</strong> {movie?.imdbRating}</p>
                  </div>
                </div>
              )}
              {activeTab === 'cast' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Cast & Crew</h2>
                  <p><strong>Director:</strong> {movie?.director}</p>
                  <p><strong>Writer:</strong> {movie?.writer}</p>
                  <p><strong>Cast:</strong> {movie?.cast.join(', ')}</p>
                </div>
              )}
              {activeTab === 'awards' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Awards</h2>
                  {movie?.awards && (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Won</h3>
                      <ul className="list-disc list-inside mb-4">
                        {movie.awards.winner.map((award, index) => (
                          <li key={index}>{award.category} - {award.award}</li>
                        ))}
                      </ul>
                      <h3 className="text-xl font-semibold mb-2">Nominated</h3>
                      <ul className="list-disc list-inside">
                        {movie.awards.nominated.map((award, index) => (
                          <li key={index}>{award.category} - {award.award}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column - Action Buttons */}
        <div className="md:w-1/5 mt-8 md:mt-0">
          <div className="lg:ml-10 sticky top-8 bg-transparent border-2 border-lapis-lazuli p-2 rounded-lg flex flex-col justify-center mx-auto mt-10">
            <Button
              marginX="auto"
              appearance="primary"
              intent="success"
              iconBefore={PlayIcon}
              onClick={handleWatchNow}
              width="90%"
              height={40}
              marginBottom={8}
            >
              Watch Now
            </Button>
            <Button
              marginX="auto"
              appearance="primary"
              intent="none"
              iconBefore={VideoIcon}
              onClick={handleTrailerClick}
              width="90%"
              height={40}
              marginBottom={8}
            >
              Watch Trailer
            </Button>
            <Button
              marginX="auto"
              appearance={bookmarkedMovies[movie_id] ? "primary" : "default"}
              intent={bookmarkedMovies[movie_id] ? "warning" : "none"}
              iconBefore={BookmarkIcon}
              onClick={() => toggleBookmark(movie_id)}
              width="90%"
              height={40}
            >
              {bookmarkedMovies[movie_id] ? 'Bookmarked' : 'Bookmark'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;