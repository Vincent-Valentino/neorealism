import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar";  // Ensure this path is correct
import Loading from "../utilities/loading";

const VideoPlayerPage = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (movie_id) {
        try {
          // Fetch movie details
          const movieResponse = await fetch(`https://neorealism-be.vercel.app/api/movies/${movie_id}`);
          const movieData = await movieResponse.json();
          setMovie(movieData);
        } catch (error) {
          console.error("Failed to fetch movie data:", error);
        }
      }
    };

    fetchMovie();
  }, [movie_id]);

  if (!movie) {
    return <div><Loading /></div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="aspect-video bg-black mb-8">
          {/* Play the video using the media link */}
          {movie ? (
            <iframe title='Welcome' src={`https://vidsrc.cc/v2/embed/movie/${movie.data.media}`} className='border-2 border-black' name="myiFrame" allowFullScreen></iframe>
          ) : (
            <div><Loading/></div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.data.title}</h1>
          <p className="text-gray-400 mb-4">{movie.data.director}</p>
          <p className="text-gray-300">{movie.data.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
