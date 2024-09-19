import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faFilm,
  faUser,
  faStar,
  faCompass,
  faSignOutAlt,
  faBars,
  faTimes,
  faTv
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const colors = useMemo(() => ['#C8AD7F','#DAA520', '#FFD700', '#F0FFFF'], []); // Memoized color array
  const navigate = useNavigate();
  const location = useLocation();

  // Cycle through colors
  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 3000); // Change color every 3 seconds

    return () => clearInterval(colorChangeInterval);
  }, [colors]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setIsMenuOpen(false);
    window.location.reload();
  };

  const NavLink = ({ to, icon, disabled, children }) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={disabled ? '#' : to}
        className={`flex items-center px-4 py-3 text-white transition-colors duration-200 ${
          disabled
            ? 'cursor-not-allowed opacity-50'
            : isActive
            ? 'bg-blue-600'
            : 'hover:bg-blue-700'
        }`}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
          } else {
            setIsMenuOpen(false);
          }
        }}
      >
        <FontAwesomeIcon icon={icon} className={`mr-3 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
        <span className={isActive ? 'font-semibold' : ''}>{children}</span>
      </Link>
    );
  };

  const menuVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  return (
    <>
      <nav className="bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/home" className="flex-shrink-0">
              <motion.span
                animate={{ color: colors[currentColorIndex] }}
                transition={{ duration: 1 }}
                className="text-2xl font-bold"
                style={{ fontFamily: "Kanit" }}
              >
                Surrealism
              </motion.span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 right-0 w-64 h-full bg-gray-800 z-50 overflow-y-auto"
        variants={menuVariants}
        initial="closed"
        animate={isMenuOpen ? 'open' : 'closed'}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <span className="text-white text-xl font-semibold">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-grow">
            <NavLink to="/home" icon={faHome}>Home</NavLink>
            <NavLink to="/movies" icon={faFilm}>Movies</NavLink>
            <NavLink to="/account" icon={faUser}>Account</NavLink>
            <NavLink to="/playlist" icon={faTv}>Playlist</NavLink>
            <NavLink disabled to="/coming" icon={faStar}>Review</NavLink>
            <NavLink disabled to="/coming" icon={faCompass}>Explore</NavLink>
          </div>
          <div className="border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-white hover:bg-red-600 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 w-5" />
              Logout
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;