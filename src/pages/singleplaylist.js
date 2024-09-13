import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { motion } from 'framer-motion';
import { Button, PlayIcon, VideoIcon, BookmarkIcon } from 'evergreen-ui';

const SinglePlaylist = () => {
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedMovies, setBookmarkedMovies] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playlistResponse, moviesResponse] = await Promise.all([
          fetch(`http://localhost:4000/api/playlist/${playlistId}`),
          fetch('http://localhost:4000/api/movies')
        ]);

        if (!playlistResponse.ok || !moviesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [playlistData, moviesData] = await Promise.all([
          playlistResponse.json(),
          moviesResponse.json()
        ]);

        setPlaylist(playlistData);
        setMovies(moviesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [playlistId]);

  const toggleBookmark = (movieId) => {
    setBookmarkedMovies(prev => ({
      ...prev,
      [movieId]: !prev[movieId]
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!playlist) return <div>No playlist data available</div>;

  const playlistMovies = movies.filter(movie => playlist.movieIds.includes(movie._id));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Navbar />
      <div className="text-white bg-[#1a1a2e] min-h-screen p-8">
        {/* Header */}
        <motion.div 
          className='flex sm:flex-col md:flex-row w-full h-auto md:h-1/4 bg-gradient-to-r from-electric-purple via-purple-950 to-pink-600 px-3 py-2 mb-5 rounded-2xl'
          variants={itemVariants}>
          <div className="mb-8 sm:w-full md:w-1/2">
            <h1 className="sm:text-2xl md:text-4xl font-bold mt-5 mb-2">{playlist.name}</h1>
            <p className="text-xl mb-2">{playlist.description}</p>
            <p className="text-md mb-4">{playlistMovies.length} movies</p>
            <motion.button 
              className="bg-purple-600 hover:bg-purple-700 border-golden-rod border-2 text-white font-bold mx-2 px-2 py-1 rounded flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayIcon size={16} className="mr-2" />
              Play All
            </motion.button>
          </div>
          <motion.div 
            className='sm:w-full md:w-1/2 flex md:justify-end mr-10 my-2'
            variants={itemVariants}
          >
            <img className='w-1/2 h-auto rounded-xl' src={`${playlist.image}`} alt={`${playlist.name}`}/>
          </motion.div>
        </motion.div>

          {/* Movie Grid */}
          <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {playlistMovies.map(movie => (
            <motion.div
              key={movie._id}
              className="bg-[#16213e] rounded-lg overflow-hidden flex cursor-pointer"
              variants={itemVariants}
              onClick={() => navigate(`../movies/${movie._id}`)}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-1/2 h-auto object-cover"
              />
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                  <p className="text-sm mb-1">{movie.runtime}</p>
                  <p className="text-sm mb-2 line-clamp-3">{movie.overview || 'No overview available.'}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button 
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
                  <Button iconBefore={PlayIcon} appearance="primary" intent="success" height={32}>
                    Watch Now
                  </Button>
                  <Button 
                    iconBefore={BookmarkIcon} 
                    appearance={bookmarkedMovies[movie._id] ? "primary" : "default"} 
                    intent={bookmarkedMovies[movie._id] ? "warning" : "none"} 
                    height={32}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(movie._id);
                    }}
                  >
                    {bookmarkedMovies[movie._id] ? "Bookmarked" : "Bookmark"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Random Playlists Section */}
        <motion.h2 
          className="text-2xl font-bold mt-12 mb-4"
          variants={itemVariants}
        >
          Explore More Playlists
        </motion.h2>
      </div>
    </motion.div>
  );
};
      
export default SinglePlaylist;