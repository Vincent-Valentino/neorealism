import React, { useEffect, useRef, useState } from 'react';
import { Play, Plus, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MoviePlaylist = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);  // State to store playlists
  const sectionRef = useRef(null);

  // Fetch playlists from the API
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/playlist/playlists');  // Fetch from backend API
        const data = await response.json();
        setPlaylists(data.playlists);  // Set the fetched playlists to state
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();  // Call the fetch function
  }, []);

  // Animation for section scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const slicedPlaylists = playlists.slice(0,4);

  return (
    <div className="w-full h-auto mt-[2px] mb-[2px] md:min-h-screen bg-gradient-to-br from-matte-black via-onyx-black to-night text-white p-8">
      <div ref={sectionRef} className="opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <h2 className="text-3xl md:text-5xl font-bold mt-10 mb-10">What's on the watchlist tonight, Vincent?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {slicedPlaylists.map((playlist, index) => (
            <div key={index}  onClick={() => navigate(`/playlist/${playlist._id}`)} className="bg-pearl bg-opacity-10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-36 sm:h-48 bg-azure bg-opacity-20">
                <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-azure">{playlist.name}</h3>
                <div className="text-xs sm:text-sm text-pearl mb-1 sm:mb-2">
                  Created by {playlist.creator?.username || 'Unknown'}
                </div>
                <p className="text-xs sm:text-sm text-pearl mb-3 sm:mb-4">{playlist.description}</p>
                <button className="bg-azure text-black font-bold py-1 sm:py-2 px-3 sm:px-4 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-colors duration-300 text-sm">
                  <Play size={14} className="mr-1 sm:mr-2" />
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-start gap-4">
          <button onClick={() => navigate(`/playlist/`)} className="bg-azure bg-opacity-20 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors duration-300 text-sm sm:text-base">
            <Plus size={16} className="mr-2" />
            Create Playlist
          </button>
          <button onClick={() => navigate(`/playlist/`)} className="bg-azure bg-opacity-20 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors duration-300 text-sm sm:text-base">
            Discover More
            <ChevronRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviePlaylist;
