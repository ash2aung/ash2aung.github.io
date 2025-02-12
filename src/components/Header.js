// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import favicon from '../assets/favicon.ico';


function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
        <img src={favicon} alt="Logo" className="favicon" /> {/* New: Added favicon image */}
          Ash Aung
        </Link>

        {/* Navigation menu */}
        <nav className="navigation">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>  {/* New Link */}
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/skills" className="nav-link">Skills</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;