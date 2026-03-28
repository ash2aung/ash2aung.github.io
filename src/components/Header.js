import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import resume from '../assets/resume.pdf';
import '../styles/Header.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for nav shadow + active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Determine active section from scroll position
      const sections = navItems.map((item) => item.href.slice(1));
      let current = 'home';

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`nav-header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <nav className="nav-inner">
        {/* Logo */}
        <a
          href="#home"
          className="nav-logo"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          ash.
        </a>

        {/* Nav Links with animated underline */}
        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
              {activeSection === item.href.slice(1) && (
                <motion.div
                  className="nav-link-indicator"
                  layoutId="nav-indicator"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </a>
          ))}

          {/* Resume — magnetic dark pill */}
          <MagneticButton
            as="a"
            href={resume}
            download
            className="nav-resume-btn"
          >
            Resume
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M5 1v6M2.5 4.5 5 7l2.5-2.5" />
            </svg>
          </MagneticButton>
        </div>
      </nav>
    </motion.header>
  );
}

export default Header;
