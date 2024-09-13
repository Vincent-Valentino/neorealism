import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';  // Import framer-motion
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faClapperboard, faVideo, faMasksTheater, faCameraRetro, faMountain, faSun, faCity, faGlobe, faUserSecret } from '@fortawesome/free-solid-svg-icons';

const filmMovements = [
  { id: 1, title: 'Italian Neorealism', icon: faCity, description: 'Post-Mussolini Italian cinema known for its social realism.', link:'/explore/neorealism'},
  { id: 2, title: 'French New Wave', icon: faCameraRetro, description: 'Experimental 1960s French cinema that rejected traditional conventions.' },
  { id: 3, title: 'German Expressionism', icon: faMasksTheater, description: 'Highly stylized films reflecting the anxieties of 1920s Germany.' },
  { id: 4, title: 'Japanese Cinema', icon: faMountain, description: 'Rich tradition including works of Kurosawa, Ozu, and anime.' },
  { id: 5, title: 'Surrealism', icon: faSun, description: 'Films that challenge reality and explore the subconscious.' },
  { id: 6, title: 'Film Noir', icon: faUserSecret, description: 'Dark, cynical crime dramas of the 1940s and 1950s full of mystery.' },
  { id: 7, title: 'New Hollywood', icon: faClapperboard, description: 'American New Wave cinema of the late 1960s to early 1980s.' },
  { id: 8, title: 'Dogme 95', icon: faVideo, description: 'Avant-garde filmmaking movement started in Denmark.' },
  { id: 9, title: 'Bollywood', icon: faGlobe, description: 'The vibrant and musical world of Indian cinema.' },
  { id: 10, title: 'Hong Kong Action', icon: faFilm, description: 'Known for martial arts and heroic bloodshed films.' },
];

const FilmMovementCard = ({ movement, index, scrollY }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: scrollY * 0.1,
        scale: isHovered ? 1.05 : 1,
        boxShadow: isHovered ? '0 10px 30px -5px rgba(0, 0, 0, 0.3)' : '0 5px 15px -3px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-lg overflow-hidden"
    >
      <div className="p-4">
        <FontAwesomeIcon icon={movement.icon} className="text-4xl text-blue-500 mb-2" />
        <h3 className="text-xl font-semibold mb-2">{movement.title}</h3>
        <p className="text-gray-600 text-sm">{movement.description}</p>
      </div>
      <div className="bg-blue-500 p-2">
        <button  onClick={() => navigate(movement.link)} className="relative bottom-0 w-full text-white font-semibold rounded hover:bg-blue-600 transition-colors">
          Learn More
        </button>
      </div>
    </motion.div>
  );
};

const FilmMovementsMasonry = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-[120vh] w-full overflow-hidden bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-5 text-center">Explore Film Movements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filmMovements.map((movement, index) => (
          <FilmMovementCard key={movement.id} movement={movement} index={index} scrollY={scrollY} />
        ))}
      </div>
    </div>
  );
};

export default FilmMovementsMasonry;
