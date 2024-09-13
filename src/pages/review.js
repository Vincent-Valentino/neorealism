import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/navbar';
import axios from 'axios';

const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Animation'];
const decades = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];

const MovieReviewsPage = () => {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({ title: '', content: '', rating: 0, tags: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ genres: [], decades: [], rating: null });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMovies();
    fetchReviews();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://neorealism-be.vercel.app/api/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get('https://neorealism-be.vercel.app/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://neorealism-be.vercel.app/api/reviews', {
        ...newReview,
        movieId: selectedMovie._id,
      });
      fetchReviews();
      setIsDialogOpen(false);
      setNewReview({ title: '', content: '', rating: 0, tags: [] });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const filteredReviews = (reviews.reviews || []).filter(review => {
    const tags = review.tags || [];  // Default to an empty array if tags don't exist
    const matchesGenre = filters.genres.length === 0 || filters.genres.some(genre => tags.includes(genre));
    const matchesDecade = filters.decades.length === 0 || filters.decades.some(decade => tags.includes(decade));
    const matchesRating = !filters.rating || review.rating >= filters.rating;
  
    return matchesGenre && matchesDecade && matchesRating;
  });

  const paginatedReviews = filteredReviews.slice((currentPage - 1) * 6, currentPage * 6);

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 p-8">
        {/* Hero Section */}
        <motion.section 
          className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-20 px-4 rounded-lg shadow-lg mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-center mb-4">Movie Reviews</h1>
          <p className="text-xl text-center">Discover and share your thoughts on the latest films!</p>
        </motion.section>

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full md:w-1/3 p-2 border rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => setIsDialogOpen(true)}
              className="mt-4 md:mt-0 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300"
            >
              Write a Review
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setFilters({...filters, genres: filters.genres.includes(genre) 
                  ? filters.genres.filter(g => g !== genre)
                  : [...filters.genres, genre]})}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.genres.includes(genre)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {decades.map((decade) => (
              <button
                key={decade}
                onClick={() => setFilters({...filters, decades: filters.decades.includes(decade)
                  ? filters.decades.filter(d => d !== decade)
                  : [...filters.decades, decade]})}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.decades.includes(decade)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {decade}
              </button>
            ))}
          </div>
          <div className="flex items-center mt-4">
            <span className="mr-2">Minimum Rating:</span>
            {[...Array(10)].map((_, index) => (
              <button
                key={index}
                onClick={() => setFilters({...filters, rating: index + 1})}
                className={`text-2xl ${filters.rating > index ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(paginatedReviews || []).map((review) => (
            <motion.div 
              key={review._id}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <img src={review.userAvatar} alt="User" className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold">{review.userName}</h3>
                  <p className="text-sm text-gray-500">{new Date(review.postedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2">{review.movieTitle}</h2>
              <h3 className="text-lg font-semibold mb-2">{review.reviewTitle}</h3>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400 text-2xl mr-2">{'★'.repeat(review.star)}</span>
                <span className="text-gray-600">{review.rating}/10</span>
              </div>
              <p className="text-gray-700 mb-4">{review.content}</p>
              <div className="flex flex-wrap gap-2">
                {(review.tags && review.tags.length > 0) ? (
                  review.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No tags available</span> // Optional: Fallback if no tags exist
                )}
              </div>
            </motion.div>
          ))}
        </div>


        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {[...Array(Math.ceil(filteredReviews.length / 6))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-4 py-2 rounded ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Review Dialog */}
        <AnimatePresence>
          {isDialogOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg p-8 max-w-2xl w-full"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
              >
                <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
                <form onSubmit={handleSubmitReview}>
                  <select
                    className="w-full p-2 mb-4 border rounded"
                    onChange={(e) => setSelectedMovie(movies.find(m => m._id === e.target.value))}
                    required
                  >
                    <option value="">Select a movie</option>
                    {movies.map((movie) => (
                      <option key={movie._id} value={movie._id}>{movie.title}</option>
                    ))}
                  </select>
                  {selectedMovie && (
                    <div className="flex items-center mb-4">
                      <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-24 h-36 object-cover mr-4" />
                      <div>
                        <h3 className="font-semibold">{selectedMovie.title}</h3>
                        <p className="text-sm text-gray-500">{selectedMovie.year}</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Review Title"
                    className="w-full p-2 mb-4 border rounded"
                    value={newReview.title}
                    onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                    required
                  />
                  <textarea
                    placeholder="Your review"
                    className="w-full p-2 mb-4 border rounded h-32"
                    value={newReview.content}
                    onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                    required
                  />
                  <div className="flex items-center mb-4">
                    <span className="mr-2">Rating:</span>
                    {[...Array(10)].map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`text-2xl ${newReview.rating > index ? 'text-yellow-400' : 'text-gray-300'}`}
                        onClick={() => setNewReview({...newReview, rating: index + 1})}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {[...genres, ...decades].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setNewReview({...newReview, tags: newReview.tags.includes(tag)
                            ? newReview.tags.filter(t => t !== tag)
                            : [...newReview.tags, tag]})}
                          className={`px-3 py-1 rounded-full text-sm ${
                            newReview.tags.includes(tag)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsDialogOpen(false)}
                      className="mr-4 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MovieReviewsPage;