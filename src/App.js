import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Home from './components/Home';
import AboutOverlay from './components/AboutOverlay';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/App.css';
import './styles/Cursor.css';

/* ─���─ Architectural Crosshair Divider ─── */
function SectionDivider() {
  return (
    <div className="crosshair-divider" aria-hidden="true">
      <span className="crosshair-mark left">+</span>
      <div className="crosshair-line" />
      <span className="crosshair-mark right">+</span>
    </div>
  );
}

/* ─── Page-Wide Gradient Blobs (mouse parallax) ─── */
function PageBlobs() {
  const blobRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mx = e.clientX / window.innerWidth - 0.5;
      const my = e.clientY / window.innerHeight - 0.5;

      blobRefs.forEach((ref, i) => {
        if (!ref.current) return;
        const factor = (i + 1) * 12;
        ref.current.style.transform = `translate(${mx * factor}px, ${my * factor}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="page-blobs" aria-hidden="true">
      <div className="blob blob-1" ref={blobRefs[0]} />
      <div className="blob blob-2" ref={blobRefs[1]} />
      <div className="blob blob-3" ref={blobRefs[2]} />
    </div>
  );
}

function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      {/* Global Elastic Cursor */}
      <Cursor />

      {/* Page-wide ambient blobs — fixed, behind everything */}
      <PageBlobs />

      <div className="app-container">
        {/* Background Grid Pattern */}
        <div className="bg-grid" />

        <div className="app-content">
          <Header />

          <main>
            <section id="home">
              <Home onOpenAbout={() => setIsAboutOpen(true)} />
            </section>

            <SectionDivider />

            <section id="experience">
              <Experience />
            </section>

            <SectionDivider />

            <section id="projects">
              <Projects />
              <Skills />
            </section>

            <SectionDivider />

            <section id="contact">
              <Contact />
            </section>
          </main>

          <Footer />
        </div>
      </div>

      {/* About Overlay — rendered at root level to cover everything */}
      <AnimatePresence>
        {isAboutOpen && (
          <AboutOverlay
            isOpen={isAboutOpen}
            onClose={() => setIsAboutOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
