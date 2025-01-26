import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDarkMode } from '../../../context/DarkModeContext';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    // Update the URL to include the search query
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    } else {
      navigate(`/`); // Reset to homepage if search is cleared
    }
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      <a className="logo" href='http://localhost:5174/'>Movie Website Clone</a>

      <div className={`menu ${isMenuActive ? 'active' : ''}`}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;
