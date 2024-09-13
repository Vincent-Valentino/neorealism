import React from 'react';

const MovieCard = ({ poster, title, description }) => {
  return (
    <div className="w-11/12 mx-auto pb-20">
      <h1 className="text-3xl text-gray-200 mb-4 ml-2" >Most Popular</h1>
      <div className="w-64 h-80 bg-gray-800 rounded-xl shadow-xl p-4 relative text-white">
        {/* Poster Image with Placeholder */}
        <div className="h-2/3 bg-gray-700 rounded-t-xl flex items-center justify-center">
          {poster ? (
            <img src={poster} alt={title} className="w-full h-full object-cover rounded-t-xl" />
          ) : (
            <span className="text-gray-300 text-sm">No Image Available</span>
          )}
        </div>

        {/* Overlay for Dark Neumorphism Effect */}
        <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>

        {/* Card Content with Placeholders */}
        <div className="relative mt-4 p-2">
          <h2 className="text-xl font-bold truncate">{title || "Placeholder Title"}</h2>
          <p className="text-gray-400 mt-2 text-sm truncate">{description || "Placeholder description text goes here, providing a brief overview of the content."}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
