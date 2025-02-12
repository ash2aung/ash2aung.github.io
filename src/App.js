// src/App.js

// Import React and routing functionality
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import our new components (we'll create these next)
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

// Import styles
import './styles/App.css';

function App() {
  return (
    // Router wraps our entire app to enable navigation
    <Router>
      <div className="app-container">
        {/* Header will show on all pages */}
        <Header />
        
        {/* Main content area */}
        <main className="main-content">
          {/* Routes define what component shows at each URL */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        {/* Footer will show on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;