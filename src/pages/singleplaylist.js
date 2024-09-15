import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from "../utilities/loading";
import Navbar from '../components/navbar';
import { motion } from 'framer-motion';
import { Button, BookmarkIcon, VideoIcon, PlayIcon, InfoSignIcon } from "evergreen-ui";

const SinglePlaylist = ({ bookmarkedMovies, toggleBookmark }) => {
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOverview, setShowOverview] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playlistResponse, moviesResponse] = await Promise.all([
          fetch(`https://neorealism-be.vercel.app/api/playlist/${playlistId}`),
          fetch('https://neorealism-be.vercel.app/api/movies')
        ]);

        if (!playlistResponse.ok || !moviesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [playlistData, moviesData] = await Promise.all([
          playlistResponse.json(),
          moviesResponse.json()
        ]);

        setPlaylist(playlistData);
        setMovies(moviesData.filter(movie => playlistData.movieIds.includes(movie._id)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [playlistId]);

  if (loading) return <div className="text-white"><Loading /></div>;
  if (error) return <div className="text-white">Error: {error}</div>;
  if (!playlist) return <div className="text-white">No playlist data available</div>;

  return (
    <div>
      <Navbar />
      <div className="bg-[#1a1a2e] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div 
            className="flex flex-col md:flex-row w-full bg-gradient-to-r from-electric-purple via-purple-950 to-pink-600 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{playlist.name}</h1>
              <p className="text-lg text-white mb-2">{playlist.description}</p>
              <p className="text-md text-white mb-4">{movies.length} movies</p>
              <Button 
                appearance="primary"
                intent="success"
                onClick={() => {/* Add play all functionality */}}
              >
                <PlayIcon className="mr-2" />
                Play All
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img className="w-full md:w-2/3 h-auto rounded-xl" src={playlist.image} alt={playlist.name}/>
            </div>
          </motion.div>

          {/* Movie Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-ebony-black pb-20"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {movies.map((movie, index) => (
                <motion.div
                  key={movie._id || index}
                  className="relative bg-night border border-licorice rounded-lg shadow-lg overflow-hidden"
                  onClick={() => navigate(`/movies/${movie._id}`)}
                >
                  <div className="relative">
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
                      onClick={(e) =>{
                        e.stopPropagation();
                        navigate(`/movies/${movie._id}/watch`)}}
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlaylist;