import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Home from './components/Home';
import AboutOverlay from './components/AboutOverlay';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/App.css';
import './styles/Cursor.css';

function App() {
  // State for the About overlay
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleOpenAbout = () => {
    setIsAboutOpen(true);
  };

  const handleCloseAbout = () => {
    setIsAboutOpen(false);
  };

  return (
    <ThemeProvider>
      {/* Global Elastic Cursor */}
      <Cursor />
      
      <div className="app-container" style={{ position: 'relative', backgroundColor: 'hsl(var(--background))' }}>
        {/* Background Pattern Layer */}
        <div className="bg-grid" style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100vh', 
          zIndex: 0, 
          pointerEvents: 'none' 
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Header />
          <main>
            <section id="home">
              <Home onOpenAbout={handleOpenAbout} />
            </section>
            <section id="about"><About /></section>
            <section id="projects"><Projects /></section>
            <section id="skills"><Skills /></section>
            <section id="experience"><Experience /></section>
            <section id="contact"><Contact /></section>
          </main>
          <Footer />
        </div>
      </div>

      {/* About Overlay - Rendered at root level to cover everything */}
      <AnimatePresence>
        {isAboutOpen && (
          <AboutOverlay 
            isOpen={isAboutOpen} 
            onClose={handleCloseAbout} 
          />
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
