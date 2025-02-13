// src/App.js
import React, { useEffect } from 'react'; // Added useEffect to the import
import { HashRouter as Router, Routes, Route } from 'react-router-dom';  // Added Routes and Route
import favicon from './assets/favicon.ico'; // Added favicon import

// Import our components
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

// Import styles
import './styles/App.css';

function App() {
  useEffect(() => {
    // Set favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = favicon;
    document.head.appendChild(link);
  }, []);
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;