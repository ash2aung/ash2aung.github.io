import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import '../styles/ThemeToggle.css';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="theme-toggle-track">
        <div className={`theme-toggle-thumb ${theme === 'light' ? 'light' : 'dark'}`}>
          {theme === 'light' ? (
            <Sun size={14} className="theme-icon" />
          ) : (
            <Moon size={14} className="theme-icon" />
          )}
        </div>
      </div>
    </button>
  );
}

export default ThemeToggle;

