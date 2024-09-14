import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { motion, AnimatePresence } from 'framer-motion';
import { Pane, Spinner, Text, Button, BookmarkIcon, VideoIcon, PlayIcon } from "evergreen-ui";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch (error) {
    return true;
  }
};

const AccountPage = ({ toggleBookmark }) => {
  const [userData, setUserData] = useState({
    bookmarkedMovies: [],
    username: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(2); // Default to bookmarked movies
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');

        if (!token || isTokenExpired(token)) {
          navigate('/login');
          return;
        }

        const response = await fetch('https://neorealism-be.vercel.app/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
          }
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const data = await response.json();

        const movieDetailsPromises = data.bookmarks.map(async (movieId) => {
          const movieResponse = await fetch(`https://neorealism-be.vercel.app/api/movies/${movieId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return movieResponse.json();
        });

        const movies = await Promise.all(movieDetailsPromises);

        setUserData({
          bookmarkedMovies: movies,
          username: data.username,
          avatar: data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.username)}&background=random`,
        });
      } catch (error) {
        setError('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleToggleBookmark = async (movieId) => {
    await toggleBookmark(movieId);
    setUserData((prevData) => ({
      ...prevData,
      bookmarkedMovies: prevData.bookmarkedMovies.filter((movie) => movie.data._id !== movieId),
    }));
  };

  if (loading) return <Pane display="flex" alignItems="center" justifyContent="center" height="100vh"><Spinner /></Pane>;
  if (error) return <Pane><Text color="danger">{error}</Text></Pane>;

  const tabs = ['Reels', 'Liked Reels', 'Bookmarked Movies', 'Reviews', 'Upload Reels'];

  return (
    <div>
      <Navbar />
      <div className="bg-matte-black min-h-screen text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 sticky top-8">
                <img 
                  src={userData.avatar}
                  alt={userData.username}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-center mb-2">{userData.username}</h2>
                <nav>
                  {tabs.map((tab, index) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(index)}
                      className={`w-full text-left py-2 px-4 rounded ${
                        selectedTab === index ? 'bg-purple-600' : 'hover:bg-gray-700'
                      } ${index !== 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={index !== 2}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedTab === 2 && (
                    <BookmarkedMovies
                      movies={userData.bookmarkedMovies}
                      handleToggleBookmark={handleToggleBookmark}
                      navigate={navigate}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookmarkedMovies = ({ movies, handleToggleBookmark, navigate }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-x-2 lg:gap-y-6">
    {movies.map((movie) => (
      <motion.div
        key={movie.data._id}
        className="bg-night border border-licorice rounded-lg shadow-lg overflow-hidden"
        whileHover={{ scale: 1.05 }}
      >
        <img 
          src={movie.data.poster} 
          alt={movie.data.title} 
          className="w-full h-auto object-cover rounded-t-lg cursor-pointer"
          onClick={() => navigate(`/movies/${movie.data._id}`)}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-white truncate">{movie.data.title}</h3>
          <div className="flex flex-col space-y-2">
            <Button 
              iconBefore={PlayIcon}
              appearance="primary"
              intent="success"
              onClick={() => navigate(`/movies/${movie.data._id}/watch`)}
            >
              Watch Now
            </Button>
            <Button 
              iconBefore={VideoIcon}
              appearance="primary"
              intent="none"
              onClick={(e) => {
                e.stopPropagation();
                if (movie.data.trailer) {
                  window.open(movie.data.trailer, '_blank');
                } else {
                  alert('Trailer not available');
                }
              }}
            >
              Trailer
            </Button>
            <Button 
              iconBefore={BookmarkIcon}
              appearance="primary"
              intent="danger"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleBookmark(movie.data._id);
              }}
            >
              Unbookmark
            </Button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default AccountPage;