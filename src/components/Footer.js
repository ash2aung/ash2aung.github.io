// src/components/Footer.js
import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Ash Aung</p>
      <div className="social-links">
        <a href="https://github.com/ash2aung" target="_blank" rel="noopener noreferrer">
          <Github size={20} />
          <span>GitHub</span>
        </a>
        <a href="https://linkedin.com/in/ash2aung" target="_blank" rel="noopener noreferrer">
          <Linkedin size={20} />
          <span>LinkedIn</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;