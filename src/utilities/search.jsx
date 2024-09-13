import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchComponent = ({ data = [] }) => { // Default empty array if data is not provided
  const [query, setQuery] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Ensure that data is an array and handle cases where it's not
  const filteredData = Array.isArray(data) 
    ? data.filter(item => 
        typeof item === 'string' && item.toLowerCase().includes(query.toLowerCase())
      ) 
    : [];

  return (
    <div className="p-4">
      <button 
        onClick={toggleSearchBox}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {showSearchBox ? 'Hide Search' : 'Show Search'}
      </button>

      <div className={`mt-4 transition-opacity duration-300 ${showSearchBox ? 'opacity-100' : 'opacity-0'}`}>
        {showSearchBox && (
          <input 
            type="text" 
            value={query} 
            onChange={handleChange} 
            placeholder="Search..." 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      <ul className="mt-4">
        {filteredData.map((item, index) => (
          <li key={index} className="py-1">{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Add PropTypes for type checking
SearchComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string) // Expect an array of strings
};

export default SearchComponent;
