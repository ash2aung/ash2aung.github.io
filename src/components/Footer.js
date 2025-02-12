// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">  {/* New: Added className */}
      <div className="footer-content">
      <p>&copy; {new Date().getFullYear()} Ash Aung. All rights reserved.</p>  {/* New: Dynamic year */}
      <a href="https://github.com/ash2aung" target="_blank" rel="noopener noreferrer">  {/* New: Added GitHub link */}
            GitHub
      </a>
      <a href="https://linkedin.com/in/ash2aung" target="_blank" rel="noopener noreferrer">  {/* New: Added LinkedIn link */}
            LinkedIn
      </a>
      </div>
      </footer>
  );
}

export default Footer;