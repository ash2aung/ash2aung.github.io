import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Light mode only - clear any old dark theme from localStorage
  const theme = 'light';
  const toggleTheme = () => {}; // No-op for now

  useEffect(() => {
    // Clear old theme preference and remove data-theme attribute
    localStorage.removeItem('theme');
    document.documentElement.removeAttribute('data-theme');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
