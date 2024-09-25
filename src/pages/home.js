import React, { useState, useEffect } from 'react';
import Header from "../components/navbar.jsx";
import Main from "../components/home-main.jsx";
import Intro from "../components/home-intro.jsx";
import SearchFilter from "../components/home-searchfilter.jsx";
import SearchDisplay from "../components/home-searchdisplay.jsx";

function Home({ bookmarkedMovies, toggleBookmark }) {
  const [data, setData] = useState([]);
  const [randomizedMovies, setRandomizedMovies] = useState([]);  // State for shuffled movies
  const [filteredMovies, setFilteredMovies] = useState([]);  // State for filtered movies
  const [selectedMovies, setSelectedMovies] = useState([]);  // State for specific selected movies
  const [video, setVideo] = useState([]); // State for videos

  // useEffect hook to fetch movies when the component mounts
  useEffect(() => {
    let isActive = true;
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://neorealism-be.vercel.app/api/movies');
        const displayResponse = await fetch("https://neorealism-be.vercel.app/api/content/main");
        if (!response.ok || !displayResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const displaydata = await displayResponse.json();
        if (isActive) {
          setData(displaydata);
          const randomized = randomizeMoviesArray(data);
          setRandomizedMovies(randomized);  // Use the randomized data for initial display
          setFilteredMovies(randomized);  // Initialize filtered movies with the randomized data
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

  useEffect(() => {
    const videoArray = [];
    const selected = [];
    
    // Use forEach instead of map since you're not returning anything
    data.forEach((obj) => {
      videoArray.push(obj.clip);
      selected.push(obj.movie);
    });
  
    setVideo(videoArray);
    setSelectedMovies(selected);
  }, [data]);

  // Efficient shuffling function
  const randomizeMoviesArray = (moviesArray) => {
    const moviesCopy = [...moviesArray]; // Copy the array to avoid mutation
    for (let i = moviesCopy.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [moviesCopy[i], moviesCopy[randomIndex]] = [moviesCopy[randomIndex], moviesCopy[i]]; // Swap elements
    }
    return moviesCopy;
  };

  const handleFilterChange = (filter) => {
    const filtered = randomizedMovies.filter(movie => {
      const matchesGenres = filter.genres.length === 0 || filter.genres.every(genre => movie.genres?.includes(genre));
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
    const filtered = randomizedMovies.filter(movie => {
      const titleMatch = movie.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const directorMatch = movie.director?.toLowerCase().includes(searchTerm.toLowerCase());
      const castMatch = movie.cast?.some(castMember =>
        castMember.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      return titleMatch || directorMatch || castMatch;
    });
  
    setFilteredMovies(filtered);
  };  

  return (
    <div className='bg-charcoal'>
      <Header />
      <Main movies={selectedMovies} video={video} bookmarkedMovies={bookmarkedMovies} toggleBookmark={toggleBookmark} />
      <Intro />
      <SearchFilter onFilterChange={handleFilterChange} onSearch={handleSearch} />
      <SearchDisplay movies={filteredMovies} onLoadMore={() => {}} bookmarkedMovies={bookmarkedMovies} toggleBookmark={toggleBookmark} />
    </div>
  );
}

export default Home;
