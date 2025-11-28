import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
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
          <section id="home"><Home /></section>
          <section id="about"><About /></section>
          <section id="projects"><Projects /></section>
          <section id="skills"><Skills /></section>
          <section id="contact"><Contact /></section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;