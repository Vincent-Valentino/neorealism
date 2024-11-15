import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, VideoIcon, BookmarkIcon, PlayIcon } from 'evergreen-ui';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ movies = [], video = [], bookmarkedMovies = {}, toggleBookmark }) => {
  const navigate = useNavigate();
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Swiper Control with useRef
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (movies.length > 0) {
      setCurrentMovieIndex(0);
    }
  }, [movies]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          if (error.name !== 'AbortError') {
            console.error('Playback failed:', error);
          }
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.slideToLoop(0, 0);
    }
  }, []);

  const handleSwiperChange = (swiper) => {
    const newIndex = swiper.realIndex;
    if (newIndex !== currentMovieIndex) {
      setCurrentMovieIndex(newIndex);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  // Ensure movie data is available and correctly access the first item in the array
  const currentMovie = movies[currentMovieIndex]?.[0] || {};

  return (
    <div className="relative w-full" style={{ fontFamily: 'Oswald' }}>
      {/* Video Section */}
      <div className="relative lg:h-screen">
        {video[currentMovieIndex] ? (
          <video
            ref={videoRef}
            className="w-full h-auto min-h-[300px] max-h-[600px] lg:h-full lg:max-h-none object-cover"
            src={video[currentMovieIndex]}
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
        ) : (
          <div className="w-full h-auto min-h-[300px] max-h-[600px] bg-gray-800">Video Loading...</div>
        )}

        {/* Video Controls - Hidden on lg screens */}
        <div className="absolute top-4 right-4 flex space-x-2 lg:hidden">
          <Button onClick={togglePlay} iconBefore={isPlaying ? 'pause' : 'play'}>
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button onClick={toggleMute} iconBefore={isMuted ? 'volume-off' : 'volume-up'}>
            {isMuted ? 'Unmute' : 'Mute'}
          </Button>
        </div>

        {/* Overlay for lg screens */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 hidden lg:block"></div>
      </div>

      {/* Content Container */}
      <div className="lg:absolute lg:inset-0 flex flex-col lg:flex-row justify-between lg:items-end p-4 sm:p-6 lg:p-8 z-10">
        {/* Movie Information */}
        <div className="text-yellow-50 w-full lg:w-1/3 mb-4 lg:mb-0 lg:mr-8 text-center lg:text-left">
          {movies.length > 0 ? (
            <>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 lg:mb-4">
                {currentMovie.title || 'Title Loading...'}
              </h1>
              <p className="text-sm sm:text-base lg:text-2xl mb-2" style={{ fontFamily: 'Lato' }}>
                {currentMovie.overview || 'Overview Loading...'}
              </p>
              <div className="hidden lg:block" style={{ fontFamily: 'Lato' }}>
                <p className="text-lg">Genres: {currentMovie.genres?.join(', ') || 'N/A'}</p>
                <p className="text-lg">Rating: {currentMovie.imdbRating || 'N/A'}</p>
                <p className="text-lg mb-5">Director: {currentMovie.director || 'N/A'}</p>
              </div>
              <div className="flex text-sm justify-center lg:justify-start gap-2">
                <Button
                  iconBefore={VideoIcon}
                  appearance="primary"
                  intent="none"
                  height={32}
                  onClick={() => window.open(currentMovie.trailer)}
                >
                  Trailer
                </Button>
                <Button
                  iconBefore={PlayIcon}
                  appearance="primary"
                  intent="success"
                  height={32}
                  onClick={() => navigate(`/movies/${currentMovie._id}/watch`)}
                >
                  Watch Now
                </Button>
                <Button
                  iconBefore={BookmarkIcon}
                  appearance={bookmarkedMovies[currentMovie._id] ? 'primary' : 'default'}
                  intent={bookmarkedMovies[currentMovie._id] ? 'danger' : 'none'}
                  height={32}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(currentMovie._id);
                  }}
                >
                  {bookmarkedMovies[currentMovie._id] ? 'Bookmarked' : 'Bookmark'}
                </Button>
              </div>
            </>
          ) : (
            <h1 className="text-2xl">Loading...</h1>
          )}
        </div>

        {/* Swiper Carousel */}
        <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
          <Swiper
            ref={swiperInstanceRef}
            spaceBetween={10}
            slidesPerView={2.5}
            breakpoints={{
              640: { slidesPerView: 3.5, spaceBetween: 15 },
              768: { slidesPerView: 4.5, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
            centeredSlides={true}
            onSlideChange={handleSwiperChange}
            onSwiper={(swiper) => {
              swiperInstanceRef.current = swiper;
              swiper.slideToLoop(0, 0);
            }}
          >
            {movies.map((movieArr, index) => {
              const movie = movieArr[0]; // Access the first movie object in the array
              return (
                <SwiperSlide key={movie._id} className="slide-container">
                  <img
                    src={movie.poster}
                    alt={`${movie.title || 'Movie'} Poster`}
                    className={`rounded-md w-full h-auto cursor-pointer shadow-lg transition-transform duration-300 hover:scale-105
                    ${index === currentMovieIndex ? 'scale-110 z-10' : 'scale-90 opacity-75'}`}
                    onClick={() => navigate(`/movies/${movie._id}`)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
