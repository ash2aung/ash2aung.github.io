// Import React and routing functionality
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';  // Changed this line

// Import our components
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
    <Router>  {/* This now uses HashRouter instead of BrowserRouter */}
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
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