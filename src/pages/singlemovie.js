import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from "../utilities/loading";
import { PlayIcon, VideoIcon, BookmarkIcon } from 'lucide-react';
import { Button } from 'evergreen-ui';
import Navbar from "../components/navbar";

const MovieDetails = ({ bookmarkedMovies, toggleBookmark }) => {
  const { movie_id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  const fetchMovie = useCallback(async () => {
    try {
      const response = await fetch(`https://neorealism-be.vercel.app/api/movies/${movie_id}`);
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
      <div className="relative h-[28rem] md:h-[32rem] lg:h-[36rem]">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <video
          src={movie?.video}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 flex items-end p-4 md:p-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2" style={{fontFamily:"Oswald"}}>{movie?.title}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-2 py-8">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Movie Information */}
          <div className="lg:w-2/3 lg:pr-8">
            {/* Tabs */}
            <div className="flex mb-6 ml-3 overflow-x-auto" style={{fontFamily:"Bebas Neue"}}>
              {['about', 'cast', 'awards'].map((tab) => (
                <button
                  key={tab}
                  className={`mr-4 pb-2 whitespace-nowrap ${
                    activeTab === tab ? 'border-b-2 border-blue-500 ' : ''
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
                className="bg-gray-800 w-11/12 mx-auto lg:mx-0 lg:ml-3 p-6 rounded-lg shadow-lg"
                style={{fontFamily:"Dosis"}}
              >
                {activeTab === 'about' && (
                  <div>
                    <h2 className="text-md md:text-xl mb-4">{movie?.overview}</h2>
                    <div className="flex flex-col gap-3">
                      <p><strong>Genres:</strong> {movie?.genres.join(', ')}</p>
                      <p><strong>Runtime:</strong> {movie?.runtime}</p>
                      <p><strong>IMDB Rating:</strong> {movie?.imdbRating}</p>
                    </div>
                  </div>
                )}
                {activeTab === 'cast' && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Cast & Crew</h2>
                    <p className="mb-2"><strong>Director:</strong> {movie?.director}</p>
                    <p className="mb-2"><strong>Writer:</strong> {movie?.writer}</p>
                    <p><strong>Cast:</strong> {movie?.cast.join(', ')}</p>
                  </div>
                )}
                {activeTab === 'awards' && (
                  <div>
                    {movie?.awards ? (
                      <>
                        <h3 className="text-xl font-semibold mb-2">Won</h3>
                        {movie.awards.winner && movie.awards.winner.length > 0 ? (
                          <ul className="list-disc list-inside mb-4">
                            {movie.awards.winner.map((award, index) => (
                              <li key={index}>{award.category} - {award.award}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className='mb-5'>None</p> // Display "None" if no awards won
                        )}
                        <h3 className="text-xl font-semibold mb-2">Nominated</h3>
                        {movie.awards.nominated && movie.awards.nominated.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {movie.awards.nominated.map((award, index) => (
                              <li key={index}>{award.category} - {award.award}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className='mb-5'>None</p> // Display "None" if no nominations
                        )}
                      </>
                    ) : (
                      <p>None</p> // Display "None" if the entire awards object is missing or empty
                    )}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Action Buttons */}
          <div className="lg:w-1/3 mt-8">
            <div className="sticky top-8 bg-gray-800 border-2 border-onyx-black p-4 rounded-lg flex flex-col justify-center mx-auto mt-10">
              <Button
                marginX="auto"
                appearance="primary"
                intent="success"
                iconBefore={PlayIcon}
                onClick={handleWatchNow}
                width="100%"
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
                width="100%"
                height={40}
                marginBottom={8}
              >
                Watch Trailer
              </Button>
              <Button
                marginX="auto"
                appearance={bookmarkedMovies[movie_id] ? "primary" : "default"}
                intent={bookmarkedMovies[movie_id] ? "danger" : "none"}
                iconBefore={BookmarkIcon}
                onClick={() => toggleBookmark(movie_id)}
                width="100%"
                height={40}
              >
                {bookmarkedMovies[movie_id] ? 'Bookmarked' : 'Bookmark'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;