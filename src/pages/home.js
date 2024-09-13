import React, { useState, useEffect } from 'react';
import Header from "../components/navbar.jsx";
import Main from "../components/home-main.jsx";
import Intro from "../components/home-intro.jsx";
import SearchFilter from "../components/home-searchfilter.jsx";
import SearchDisplay from "../components/home-searchdisplay.jsx";

function Home({ bookmarkedMovies, toggleBookmark }) {
  const [movies, setMovies] = useState([]);  // State for all movies
  const [filteredMovies, setFilteredMovies] = useState([]);  // State for filtered movies
  const [selectedMovies, setSelectedMovies] = useState([]);  // State for selected movies

  // Predefined clips for movies
  const MoviesClip = [
    `yourname.mp4`, 
    `akira.mp4`, 
    `interstellar.mp4`, 
    `theshining.mp4`,
    `apocalypsenow.mp4`,
    `yiyi.mp4`,
    `eternalsunshine.mp4`,
    `blackswan.mp4`,
    `taxidriver.mp4`,
    `dreams.mp4`
  ];

  // useEffect hook to fetch movies when the component mounts
  useEffect(() => {
    let isActive = true;
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://neorealism-be.vercel.app/api/movies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (isActive) {
          setMovies(data);
          setFilteredMovies(data);

          // Filter and select specific movies by title
          const selectedTitles = [
            'Your Name (2016)',
            'Akira (1988)',
            'Interstellar (2014)',
            'The Shining (1980)',
            'Apocalypse Now (1979)',
            'Yi Yi (2000)',
            'Eternal Sunshine of the Spotless Mind (2004)',
            'Black Swan (2010)',
            'Taxi Driver (1976)',
            'Dreams (1990)'
          ];
          const selected = selectedTitles.map(title => data.find(movie => movie.title === title)).filter(movie => movie !== undefined);
          setSelectedMovies(selected);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchMovies();
    return () => {
      isActive = false;
    };
  }, []);

  const handleFilterChange = (filter) => {
    const filtered = movies.filter(movie => {
      const matchesGenres = filter.genres.length === 0 || filter.genres.every(genre => movie.genres.includes(genre));
      const matchesCountry = filter.country === '' || movie.country === filter.country;
      const matchesAward = !filter.award || (
        filter.awardStatus === 'All' && (
          movie.awards?.winner?.some(a => a.award === filter.award) || 
          movie.awards?.nominated?.some(a => a.award === filter.award)
        )
      ) || (
        filter.awardStatus === 'Winner' && movie.awards?.winner?.some(a => a.award === filter.award)
      ) || (
        filter.awardStatus === 'Nominated' && movie.awards?.nominated?.some(a => a.award === filter.award)
      );
      return matchesGenres && matchesCountry && matchesAward;
    });

    setFilteredMovies(filtered);
  };
  
  const handleSearch = (searchTerm) => {
    const filtered = movies.filter(movie => {
      const titleMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const directorMatch = movie.director.toLowerCase().includes(searchTerm.toLowerCase());
      const castMatch = movie.cast.some(castMember =>
        castMember.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      return titleMatch || directorMatch || castMatch;
    });
  
    setFilteredMovies(filtered);
  };  

  return (
    <div className='bg-charcoal'>
      <Header />
      <Main movies={selectedMovies} video={MoviesClip} bookmarkedMovies={bookmarkedMovies} toggleBookmark={toggleBookmark} />
      <Intro />
      <SearchFilter onFilterChange={handleFilterChange} onSearch={handleSearch} />
      <SearchDisplay movies={filteredMovies} onLoadMore={() => {}} bookmarkedMovies={bookmarkedMovies} toggleBookmark={toggleBookmark} />
    </div>
  );
}

export default Home;
