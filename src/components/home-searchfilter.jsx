  import React, { useState } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faSearch, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

  const genresOptions = [
    'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance',
    'Sci-Fi', 'Thriller', 'Adventure', 'Animation', 'Documentary',
    'War', 'Family', 'Film Noir', 'Mystery', 'Musical', 'Western'
  ];

  const countries = [
    { value: 'France', label: 'France' },
    { value: 'Italy', label: 'Italy' },
    { value: 'USA', label: 'USA' },
    { value: 'Germany', label: 'Germany' },
    { value: 'Japan', label: 'Japan' },
    { value: 'South Korea', label: 'South Korea' },
    { value: 'China', label: 'China' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Brazil', label: 'Brazil' },
    { value: 'Australia', label: 'Australia' }
  ];

  const awards = [
    { value: 'Academy Awards', label: 'Academy Awards' },
    { value: 'Cannes Film Festival', label: 'Cannes Film Festival' },
    { value: 'Golden Globe Awards', label: 'Golden Globe Awards' },
    { value: 'BAFTA Awards', label: 'BAFTA Awards' },
    { value: 'Screen Actors Guild Awards', label: 'Screen Actors Guild Awards' },
    { value: 'Critics\' Choice Awards', label: 'Critics\' Choice Awards' },
    { value: 'Venice Film Festival', label: 'Venice Film Festival' },
    { value: 'Berlin International Film Festival', label: 'Berlin International Film Festival' },
    { value: 'Sundance Film Festival', label: 'Sundance Film Festival' },
    { value: 'Toronto International Film Festival', label: 'Toronto International Film Festival' }
  ];

  const awardStatusOptions = [
    { value: 'All', label: 'All' },
    { value: 'Nominated', label: 'Nominated' },
    { value: 'Winner', label: 'Winner' }
  ];

  const SearchFilter = ({ onFilterChange, onSearch }) => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedAward, setSelectedAward] = useState('');
    const [selectedAwardStatus, setSelectedAwardStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterExpanded, setIsFilterExpanded] = useState(true);

    const handleSelectGenre = (genre) => {
      if (!selectedGenres.includes(genre) && selectedGenres.length < 3) {
        const newGenres = [...selectedGenres, genre];
        setSelectedGenres(newGenres);
        updateFilters(newGenres, selectedCountry, selectedAward, selectedAwardStatus);
      }
    };

    const removeGenre = (genre) => {
      const newGenres = selectedGenres.filter(g => g !== genre);
      setSelectedGenres(newGenres);
      updateFilters(newGenres, selectedCountry, selectedAward, selectedAwardStatus);
    };

    const handleCountryChange = (event) => {
      const country = event.target.value;
      setSelectedCountry(country);
      updateFilters(selectedGenres, country, selectedAward, selectedAwardStatus);
    };

    const handleAwardChange = (event) => {
      const award = event.target.value;
      setSelectedAward(award);
      updateFilters(selectedGenres, selectedCountry, award, selectedAwardStatus);
    };

    const handleAwardStatusChange = (event) => {
      const status = event.target.value;
      setSelectedAwardStatus(status);
      updateFilters(selectedGenres, selectedCountry, selectedAward, status);
    };

    const handleSearchChange = (event) => {
      const term = event.target.value;
      setSearchTerm(term);
      onSearch(term);
    };

    const updateFilters = (genres, country, award, awardStatus) => {
      onFilterChange({ genres, country, award, awardStatus });
    };

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-night p-4 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-grow mr-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search movies..."
              className="w-full bg-onyx-black text-soft-white p-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-electric-purple"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-electric-purple" />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="bg-electric-purple text-soft-white px-4 py-2 rounded-full flex items-center"
          >
            Filters
            <FontAwesomeIcon icon={isFilterExpanded ? faChevronUp : faChevronDown} className="ml-2" />
          </motion.button>
        </div>

        <AnimatePresence>
          {isFilterExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-soft-white mb-2">Genre</label>
                  <select
                    onChange={(e) => handleSelectGenre(e.target.value)}
                    value=""
                    className="w-full bg-onyx-black text-soft-white p-2 rounded appearance-none"
                  >
                    <option value="" disabled>Select Genre</option>
                    {genresOptions.filter(g => !selectedGenres.includes(g)).map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-soft-white mb-2">Country</label>
                  <select
                    onChange={handleCountryChange}
                    value={selectedCountry}
                    className="w-full bg-onyx-black text-soft-white p-2 rounded appearance-none"
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => <option key={country.value} value={country.value}>{country.label}</option>)}
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-soft-white mb-2">Award</label>
                  <select
                    onChange={handleAwardChange}
                    value={selectedAward}
                    className="w-full bg-onyx-black text-soft-white p-2 rounded appearance-none"
                  >
                    <option value="">Select Award</option>
                    {awards.map(award => <option key={award.value} value={award.value}>{award.label}</option>)}
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-soft-white mb-2">Award Status</label>
                  <select
                    onChange={handleAwardStatusChange}
                    value={selectedAwardStatus}
                    className={`w-full bg-onyx-black text-soft-white p-2 rounded appearance-none ${!selectedAward ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!selectedAward}
                  >
                    {awardStatusOptions.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedGenres.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 p-2 bg-onyx-black rounded-lg"
          >
            <div className="flex flex-wrap gap-2">
              {selectedGenres.map(genre => (
                <span key={genre} className="bg-electric-purple text-soft-white px-2 py-1 rounded-full text-sm flex items-center">
                  {genre}
                  <button onClick={() => removeGenre(genre)} className="ml-2 text-soft-white hover:text-fiery-red">
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  export default SearchFilter;