import React, { useState } from 'react';
import Select from 'react-select';

const GenreSelect = () => {
  const options = [
    { value: 'action', label: 'Action' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'animation', label: 'Animation' },
    { value: 'horror', label: 'Horror' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'thriller', label: 'Thriler' },
    { value: 'noir', label: 'Film Noir' },
    { value: 'romance', label: 'Romance' },
    { value: 'crime', label: 'Crime' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'documentary', label: 'Documentary' },
    { value: 'scifi', label: 'Sci-fi' },
    { value: 'history', label: 'History' },
    { value: 'biography', label: 'Biography' },
  ];

  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div className='mb-3'>
      <h1 className='mb-2 text-slate-900 text-sm font-semibold'>Genres</h1>
      <Select
        className='text-xs py-1'
        isMulti
        options={options}
        value={selectedGenres}
        onChange={setSelectedGenres}
        placeholder="Select genres..."
    />
    </div>
  );
};

export default GenreSelect;
