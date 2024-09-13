import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar"; // Ensure this path is correct

const VideoPlayerPage = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (movie_id) {
        try {
          const response = await fetch(`https://neorealism-be.vercel.app/api/movies/${movie_id}`);
          const data = await response.json();
          console.log("API Response:", data);
          setMovie(data);
        } catch (error) {
          console.error("Failed to fetch movie data:", error);
        }
      }
    };
    fetchMovie();
  }, [movie_id]);

  if (!movie) {
    return <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
      <div className="text-2xl">Loading...</div>
    </div>;
  }

  console.log(movie.data.media);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="aspect-video bg-black mb-8">
          <iframe
            src={movie.data.media}
            title={movie.data.title}
            allowFullScreen
            className="w-full h-full"
          ></iframe>
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