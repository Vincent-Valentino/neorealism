import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setIsMenuOpen(false);
    window.location.reload();
  };

  const NavLink = ({ to, icon, disabled, children }) => (
    <Link 
      to={disabled ? '#' : to}  // If disabled, don't navigate anywhere
      className={`flex items-center px-4 py-3 text-white transition-colors duration-200 ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-800'}`}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();  // Prevent click if the link is disabled
        } else {
          setIsMenuOpen(false);
        }
      }}
    >
      <FontAwesomeIcon icon={icon} className="mr-3 w-5" />
      {children}
    </Link>
  );

  return (
    <>
      <nav className="bg-charcoal shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/home" className="flex-shrink-0">
              <span className="text-white text-2xl font-bold">Surrealism</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-300 focus:outline-none"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Side Menu */}
      <div 
        className={`fixed top-0 right-0 w-64 h-full bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <span className="text-white text-xl font-semibold">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-blue-300 focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            <NavLink to="/home" icon={faHome}>Home</NavLink>
            <NavLink to="/movies" icon={faFilm}>Movies</NavLink> {/* New /movies path */}
            <NavLink disabled to="/coming" icon={faUser}>Account</NavLink> {/* Disabled */}
            <NavLink to="/playlist" icon={faTv}>Playlist</NavLink>
            <NavLink disabled to="/coming" icon={faStar}>Review</NavLink> {/* Disabled */}
            <NavLink disabled to="/coming" icon={faCompass}>Explore</NavLink> {/* Disabled */}
          </div>
          <div className="border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-white hover:bg-blue-800 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
