import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Watch from "./pages/watch";
import Home from './pages/home';
import Login from './pages/login';
import Movies from './pages/movies';
import Reels from './pages/reels';
import Account from './pages/account';
import Movie from './pages/singlemovie';
import Top from './pages/top250';
import Playlist from "./pages/playlist";
import SinglePlaylist from "./pages/singleplaylist";
import Review from "./pages/review";
import Explore from "./pages/explore";
import Japan from "./components/explore/content/japanese_cinema/japanese_cinema";
import Neorealism from "./components/explore/content/neorealism/italian-neorealism";
import ProtectedRoute from './components/protectedroute';

function App() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch bookmarks only if authenticated
  const fetchBookmarks = useCallback(async () => {
    try {
      const response = await fetch('https://neorealism-be.vercel.app/api/users/bookmarks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookmarks');
      }

      const data = await response.json();
      const bookmarksObject = data.bookmarkedMovies.reduce((acc, movieId) => {
        acc[movieId] = true;
        return acc;
      }, {});
      setBookmarkedMovies(bookmarksObject);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchBookmarks(); // Fetch bookmarks only after setting isAuthenticated to true
    }
  }, [fetchBookmarks]);

  const toggleBookmark = async (movieId) => {
    try {
      const isBookmarked = bookmarkedMovies[movieId];

      const response = await fetch(
        `https://neorealism-be.vercel.app/api/users/bookmarks`,  
        {
          method: isBookmarked ? 'DELETE' : 'POST',  // Use DELETE for unbookmarking and POST for bookmarking
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ movieId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${isBookmarked ? 'unbookmark' : 'bookmark'} movie`);
      }

      // Update the bookmarkedMovies state locally to avoid refetching
      setBookmarkedMovies((prevBookmarks) => ({
        ...prevBookmarks,
        [movieId]: !isBookmarked, // Toggle bookmark state
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<Navigate to="/home" />} />
      ) : (
        <Route path="/" element={<Login onLogin={() => {
          setIsAuthenticated(true);
          fetchBookmarks(); // Fetch bookmarks on login
        }} />} />
      )}

      {/* Protected Routes */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute element={<Home bookmarkedMovies={bookmarkedMovies} toggleBookmark={toggleBookmark} />} />
        } 
      />
      <Route 
        path="/reels" 
        element={
          <ProtectedRoute element={<Reels toggleBookmark={toggleBookmark} />} />
        } 
      />
      <Route 
        path="/movies" 
        element={
          <ProtectedRoute element={<Movies bookmarkedMovies={bookmarkedMovies} toggleBookmark={toggleBookmark} />} />
        } 
      />

      <Route 
        path="/review" 
        element={
          <ProtectedRoute element={<Review />} />
        } 
      />
      <Route 
        path="/account" 
        element={
          <ProtectedRoute element={<Account toggleBookmark={toggleBookmark}/>} />
        } 
      />

      <Route 
        path="/movies/:movie_id" 
        element={
          <ProtectedRoute element={<Movie bookmarkedMovies={bookmarkedMovies} toggleBookmark={toggleBookmark} />} />
        } 
      />

      <Route 
        path="/playlist/:playlistId" 
        element={
          <ProtectedRoute element={<SinglePlaylist bookmarkedMovies={bookmarkedMovies} toggleBookmark={toggleBookmark} />} />
        }
      />

      <Route 
        path="/explore" 
        element={
          <ProtectedRoute element={<Explore/>} />
        } 
      />

      <Route 
        path="/explore/neorealism" 
        element={
          <ProtectedRoute element={<Neorealism/>} />
        } 
      />

      <Route 
        path="/explore/japanese_cinema" 
        element={
          <ProtectedRoute element={<Japan/>} />
        } 
      />

      <Route 
        path="/playlist" 
        element={
          <ProtectedRoute element={<Playlist/>} />
        } 
      />

      <Route 
        path="/movies/:movie_id/watch" 
        element={
          <ProtectedRoute element={<Watch/>} />
        } 
      />

      <Route 
        path="/imdb250" 
        element={
          <ProtectedRoute element={<Top/>} />
        } 
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
