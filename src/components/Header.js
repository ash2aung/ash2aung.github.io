import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src={process.env.PUBLIC_URL + '/favicon.ico'} alt="Logo" className="favicon" />
            <span className="name">Ash <br /> Aung</span>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;