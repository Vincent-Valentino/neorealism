import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { motion, AnimatePresence } from 'framer-motion';
import { Pane, Text, Button, BookmarkIcon, VideoIcon, PlayIcon } from "evergreen-ui";
import Loading from "../utilities/loading";

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

  if (loading) return (<div><Loading /></div>);
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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {movies.map((movie) => (
      <motion.div
        key={movie.data._id}
        className="bg-night border border-licorice rounded-lg shadow-lg overflow-hidden flex flex-col"
        whileHover={{ scale: 1.03 }}
      >
        <div className="relative pt-[150%] w-full">
          <img 
            src={movie.data.poster} 
            alt={movie.data.title} 
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg cursor-pointer"
            onClick={() => navigate(`/movies/${movie.data._id}`)}
          />
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <h3 className="text-lg font-semibold mb-2 text-white truncate">{movie.data.title}</h3>
          <div className="flex flex-col space-y-2">
            <Button 
              appearance="primary" 
              className="w-full"
              variant="default"
              intent="success"
              onClick={() => navigate(`/movies/${movie.data._id}/watch`)}
            >
              <PlayIcon className="w-4 h-4 mr-2" /> Watch Now
            </Button>
            <Button 
              appearance="primary" 
              className="w-full"
              variant="default"
              intent="none"
              onClick={() => {
                if (movie.data.trailer) {
                  window.open(movie.data.trailer, '_blank');
                } else {
                  alert('Trailer not available');
                }
              }}
            >
              <VideoIcon className="w-4 h-4 mr-2" /> Trailer
            </Button>
            <Button 
              appearance="primary" 
              className="w-full"
              variant="default"
              intent="danger"
              onClick={() => handleToggleBookmark(movie.data._id)}
            >
              <BookmarkIcon className="w-4 h-4 mr-2" /> Unbookmark
            </Button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default AccountPage;