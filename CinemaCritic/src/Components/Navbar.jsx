import React, { useRef, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCategory } from '../Context/CategoryContext';
import search from '../assets/search.svg';
import logo from '../assets/logo.png';

const Navbar = ({ moviesRef }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useCategory();

  const handleClick = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToMovies: true } });
    } else {
      scrollToMovies();
    }
  };

  const scrollToMovies = () => {
    if (moviesRef && moviesRef.current) {
      moviesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSearch = () => {
    if (window.innerWidth < 720) {
      setIsSearchOpen(true);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className={`navbar-container ${isSearchOpen ? 'search-open' : ''}`}>
      <div className='navbar-left'>
        <img src={logo} alt='logo' />
        <h2>
          <Link style={{ textDecoration: 'none' }} to='/'>
            CinemaCritic
          </Link>
        </h2>
      </div>
      <div className='navbar-right'>
        <div className='search-bar'>
          <img
            src={search}
            alt='search-icon'
            className='search-icon'
            onClick={toggleSearch}
          />
          <input
            type='text'
            placeholder='Search the movies...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={handleClick}
            className='search-input'
            autoFocus={isSearchOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
