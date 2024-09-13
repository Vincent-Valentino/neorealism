import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { motion, AnimatePresence } from 'framer-motion';
import { Pane, Spinner, Text,  Button, BookmarkIcon, VideoIcon, PlayIcon, StarIcon, UploadIcon } from "evergreen-ui";

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
    reels: [],
    bio: '',
    likedReels: [],
    bookmarkedMovies: [],
    reviews: [],
    username: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
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

        const response = await fetch('http://localhost:4000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
          }
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const data = await response.json();

        const movieDetailsPromises = data.bookmarks.map(async (movieId) => {
          const movieResponse = await fetch(`http://localhost:4000/api/movies/${movieId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return movieResponse.json();
        });

        const movies = await Promise.all(movieDetailsPromises);

        setUserData({
          ...data,
          bookmarkedMovies: movies,
          reviews: [], // Placeholder for reviews data
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
                  src={userData.avatar || 'https://via.placeholder.com/150'} 
                  alt={userData.username}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-center mb-2">{userData.username}</h2>
                <p className="text-center text-gray-400 mb-4">{userData.bio}</p>
                <nav>
                  {tabs.map((tab, index) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(index)}
                      className={`w-full text-left py-2 px-4 rounded ${selectedTab === index ? 'bg-purple-600' : 'hover:bg-gray-700'}`}
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
                  {selectedTab === 0 && <ReelsGrid reels={userData.reels} />}
                  {selectedTab === 1 && <ReelsGrid reels={userData.likedReels} />}
                  {selectedTab === 2 && <BookmarkedMovies movies={userData.bookmarkedMovies} handleToggleBookmark={handleToggleBookmark} />}
                  {selectedTab === 3 && <ReviewsGrid reviews={userData.reviews} />}
                  {selectedTab === 4 && <UploadReelForm />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReelsGrid = ({ reels }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {reels.map((reel) => (
      <motion.div
        key={reel.id}
        className="bg-gray-800 rounded-lg overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src={reel.thumbnail} alt={reel.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{reel.title}</h3>
          <p className="text-gray-400">{reel.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

const BookmarkedMovies = ({ movies, handleToggleBookmark }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {movies.map((movie) => (
      <motion.div
        key={movie.data._id}
        className="bg-gray-800 rounded-lg overflow-hidden relative"
        whileHover={{ scale: 1.05 }}
      >
        <img src={movie.data.poster} alt={movie.data.title} className="w-full h-auto object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
          <h3 className="text-lg font-semibold mb-4 text-center">{movie.data.title}</h3>
          <div className="space-y-2 flex justify-center flex-col">
            <Button width='160' iconBefore={VideoIcon} appearance="primary" intent="none">Trailer</Button>
            <Button width='160' iconBefore={PlayIcon} appearance="primary" intent="success">Watch Now</Button>
            <Button 
              width='160'
              iconBefore={BookmarkIcon} 
              appearance="primary" 
              intent="warning"
              onClick={() => handleToggleBookmark(movie.data._id)}
            >
              Unbookmark
            </Button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const ReviewsGrid = ({ reviews }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {reviews.map((review, index) => (
      <motion.div
        key={index}
        className="bg-gray-800 rounded-lg p-6"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-lg font-semibold mb-2">{review.movieTitle}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} color={i < review.rating ? 'yellow' : 'gray'} marginRight={4} />
          ))}
        </div>
        <p className="text-gray-400">{review.content}</p>
      </motion.div>
    ))}
  </div>
);

const UploadReelForm = () => (
  <div className="bg-gray-800 rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">Upload a New Reel</h2>
    <form className="space-y-4">
      <div>
        <label className="block mb-2">Title</label>
        <input type="text" className="w-full bg-gray-700 rounded px-3 py-2" />
      </div>
      <div>
        <label className="block mb-2">Description</label>
        <textarea className="w-full bg-gray-700 rounded px-3 py-2" rows="4"></textarea>
      </div>
      <Button appearance="primary" intent="success" iconBefore={UploadIcon}>
        Select Reel to Upload
      </Button>
    </form>
  </div>
);

export default AccountPage;