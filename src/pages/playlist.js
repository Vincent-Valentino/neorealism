import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import { Play, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Dialog,
  Pane,
  TextInputField,
  TextareaField,
  Combobox, 
  Pill,
  toaster
} from 'evergreen-ui';

// Color scheme (darkMoody theme)
const colorScheme = {
  background: 'bg-matte-black',
  text: 'text-soft-white',
  accent: 'bg-electric-purple',
  card: 'bg-gray-800',
  hover: 'hover:bg-gray-700',
};

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const [showMovies, setShowMovies] = useState(false);

  return (
    <div 
      className={`${colorScheme.card} rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${colorScheme.hover}`}
      onMouseEnter={() => setShowMovies(true)}
      onMouseLeave={() => setShowMovies(false)}
    >
      <div className="h-48 relative">
        <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover" />
        {showMovies && (
          <div className={`absolute inset-0 ${colorScheme.background} bg-opacity-90 p-2 overflow-y-auto`}>
            <h4 className={`${colorScheme.text} font-semibold mb-2`}>Movies:</h4>
            <ul className={`${colorScheme.text} text-sm`}>
              {playlist.movies.map((movie, index) => (
                <li key={index}>{movie.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className={`text-xl font-semibold mb-2 ${colorScheme.text}`}>{playlist.name}</h3>
        <p className={`text-sm ${colorScheme.text} opacity-75 mb-4`}>{playlist.description}</p>
        <button onClick={() => navigate(`/playlist/${playlist._id}`)} className={`${colorScheme.accent} ${colorScheme.text} font-bold py-2 px-4 rounded-full flex items-center justify-center hover:opacity-80 transition-colors duration-300`}>
          <Play size={16} className="mr-2" />
          Play
        </button>
      </div>
    </div>
  );
};

const CreatePlaylistModal = ({ isShown, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [imageFile, setImageFile] = useState(null); // Store the image file
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieSelect = (selectedMovie) => {
    if (!selectedMovies.some(movie => movie.value === selectedMovie.value)) {
      setSelectedMovies([...selectedMovies, selectedMovie]);
    }
  };

  const handleMovieRemove = (movieToRemove) => {
    setSelectedMovies(selectedMovies.filter(movie => movie.value !== movieToRemove.value));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('movieIds', selectedMovies.map(movie => movie.value).join(',')); // Send movie IDs as a string
    if (imageFile) {
      formData.append('image', imageFile); // Add the image file to the form data
    }

    onSubmit(formData);
  };

  return (
    <Dialog
      isShown={isShown}
      title="Create New Playlist"
      onCloseComplete={onClose}
      confirmLabel="Create Playlist"
      onConfirm={handleSubmit}
    >
      <Pane>
        <TextInputField
          label="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextareaField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        
        {/* Movie selection combobox */}
        <Pane marginBottom={16}>
          <Combobox
            items={movies.map(movie => ({ label: movie.title, value: movie._id }))}
            itemToString={item => item ? item.label : ''}
            onChange={handleMovieSelect}
            placeholder="Select movies..."
          />
          {/* Show selected movies */}
          <Pane marginTop={8}>
            {selectedMovies.map((movie, index) => (
              <Pill
                key={index}
                display="inline-flex"
                margin={4}
                color="green"
                isSolid
                onRemove={() => handleMovieRemove(movie)}
              >
                {movie.label}
              </Pill>
            ))}
          </Pane>
        </Pane>

        {/* Image file input */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])} // Save the image file
        />
      </Pane>
    </Dialog>
  );
};

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('https://neorealism-be.vercel.app/api/playlist/playlists');
        const data = await response.json();
        setPlaylists(data.playlists);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.length > 2) {
      try {
        // Send the search term as a query parameter to filter by playlist name
        const response = await fetch(`https://neorealism-be.vercel.app/api/playlists/playlist?searchTerm=${term}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };
  

  const handleCreatePlaylist = async (formData) => {
    try {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage
  
      const response = await fetch('https://neorealism-be.vercel.app/api/playlist/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Add the token in the Authorization header
        },
        body: formData, // Send the formData (including the image file)
      });
  
      if (response.ok) {
        toaster.success('Playlist created successfully!');
        setIsModalOpen(false);
  
        // Refetch playlists to update the list
        const updatedPlaylistsResponse = await fetch('https://neorealism-be.vercel.app/api/playlist/playlists');
        const updatedPlaylistsData = await updatedPlaylistsResponse.json();
        setPlaylists(updatedPlaylistsData.playlists);
      } else {
        throw new Error('Failed to create playlist');
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      toaster.danger('Failed to create playlist. Please try again.');
    }
  };
  
  const filteredPlaylists = playlists.filter(playlist => 
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Navbar />
      <div className={`min-h-screen ${colorScheme.background}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            className={`${colorScheme.accent} rounded-lg p-8 mb-8 text-center`}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className={`text-4xl font-bold ${colorScheme.text} mb-4`}>Discover Amazing Playlists</h1>
            <p className={`${colorScheme.text} text-lg mb-4`}>Explore our curated collection of movie playlists</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${colorScheme.background} ${colorScheme.text} font-bold py-2 px-6 rounded-full hover:opacity-80 transition-colors duration-300`}
            >
              Explore Now
            </motion.button>
          </motion.div>

          {/* Search and Create Playlist */}
          <div className="flex justify-between items-center mb-8">
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search playlists or movies..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className={`w-full py-2 px-4 pl-10 rounded-full ${colorScheme.card} ${colorScheme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-${colorScheme.accent}`}
              />
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${colorScheme.text} opacity-50`} size={20} />
            </div>
            <motion.button 
              onClick={() => setIsModalOpen(true)}
              className={`${colorScheme.accent} ${colorScheme.text} font-bold py-2 px-4 rounded-full flex items-center justify-center hover:opacity-80 transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: [1, 1.05, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              <Plus size={16} className="mr-2" />
              Create Playlist
            </motion.button>
          </div>

          {/* Create Playlist Modal */}
          <CreatePlaylistModal 
            isShown={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreatePlaylist}
          />

          {/* Search Results */}
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${colorScheme.card} rounded-lg p-4 mb-8`}
            >
              <h2 className={`${colorScheme.text} text-xl font-semibold mb-2`}>Search Results:</h2>
              <ul className={`${colorScheme.text} text-sm`}>
                {searchResults.map((movie, index) => (
                  <li key={index} className="mb-1">{movie.title}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Playlists Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPlaylists.map((playlist) => (
              <motion.div key={playlist._id} variants={itemVariants}>
                <PlaylistCard playlist={playlist} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaylistPage;