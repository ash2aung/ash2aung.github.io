import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import MagneticButton from './MagneticButton';
import '../styles/Projects.css';

// Project data matching the prototype
const projects = [
  {
    id: 0,
    icon: '🗺️',
    title: 'Emergency Reporter',
    desc: 'Real-time emergency reporting with live mapping.',
    detailDesc: 'Real-time reporting system tracking emergencies with live mapping. Built with TypeScript and Leaflet for geolocation tracking.',
    tags: ['TypeScript', 'Leaflet'],
    github: 'https://github.com/dagemd/272-FInal-project',
    demo: 'https://em3rgency-reporter.vercel.app/',
  },
  {
    id: 1,
    icon: '♟️',
    title: 'Order & Chaos',
    desc: 'Strategic board game with AI opponent.',
    detailDesc: 'A strategic 6x6 board game with AI opponent powered by minimax algorithm with alpha-beta pruning.',
    tags: ['Java', 'JavaFX'],
    github: 'https://replit.com/@ashhhh1507/chaos-and-order?v=1',
    demo: null,
  },
  {
    id: 2,
    icon: '🌐',
    title: 'Portfolio',
    desc: 'This site — React + Framer Motion.',
    detailDesc: 'The site you\'re on. Designed for maximum interactivity with scroll animations and micro-interactions.',
    tags: ['React', 'Framer'],
    github: 'https://github.com/ash2aung/ash2aung.github.io',
    demo: 'https://ash2aung.github.io',
  },
  {
    id: 3,
    icon: '📊',
    title: 'Data Dashboard',
    desc: 'Analytics dashboard with live charts.',
    detailDesc: 'Interactive analytics dashboard with real-time data visualization using D3.js and Python backend.',
    tags: ['Python', 'D3.js'],
    github: '#',
    demo: null,
  },
  {
    id: 4,
    icon: '🤖',
    title: 'CLI Tool',
    desc: 'Productivity tool for developers.',
    detailDesc: 'Command-line productivity tool for developers. Fast file search, templating, and project scaffolding.',
    tags: ['C++', 'CMake'],
    github: '#',
    demo: null,
  },
  {
    id: 5,
    icon: '🎮',
    title: 'Game Engine',
    desc: '2D game engine from scratch.',
    detailDesc: 'A lightweight 2D game engine built from scratch with OpenGL rendering and entity component system.',
    tags: ['C++', 'OpenGL'],
    github: '#',
    demo: null,
  },
];

// Animation variants for scroll reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Project Card Component with 3D Tilt
function ProjectCard({ project, isExpanded, onToggle, index }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (isExpanded || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Calculate rotation (±10 degrees)
    const rotateX = (y - 0.5) * -10;
    const rotateY = (x - 0.5) * 10;
    
    setTiltStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
    
    // Track mouse position for gradient effect
    setMousePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    if (!isExpanded) {
      setTiltStyle({ transform: 'perspective(600px) rotateX(0deg) rotateY(0deg)' });
    }
  };

  const handleClick = () => {
    onToggle(isExpanded ? null : project.id);
  };

  const formatIndex = (num) => String(num + 1).padStart(2, '0');

  return (
    <motion.div
      ref={cardRef}
      layout
      className={`proj-card ${isExpanded ? 'expanded' : ''}`}
      style={{
        ...tiltStyle,
        '--mx': `${mousePos.x}%`,
        '--my': `${mousePos.y}%`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      variants={itemVariants}
    >
      {/* Icon (hidden when expanded) */}
      <motion.div 
        className="proj-icon-top"
        animate={{ opacity: isExpanded ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {project.icon}
      </motion.div>
      
      {/* Number badge */}
      <div className={`proj-num-top ${isExpanded ? 'active' : ''}`}>
        {formatIndex(index)}
      </div>
      
      {/* Basic content */}
      <div className="proj-basic-content">
        <h3>{project.title}</h3>
        <p className="proj-desc">{project.desc}</p>
        <div className="proj-tags">
          {project.tags.map(tag => (
            <span key={tag} className="ptag">{tag}</span>
          ))}
        </div>
      </div>
      
      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="proj-expand-content"
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 300 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="proj-screenshot">
              Screenshot
            </div>
            <div className="proj-detail-section">
              <p className="proj-detail-desc">{project.detailDesc}</p>
              <div className="proj-links" onClick={(e) => e.stopPropagation()}>
                <MagneticButton
                  as="a"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="pl-btn dark"
                >
                  GitHub ↗
                </MagneticButton>
                {project.demo && (
                  <MagneticButton
                    as="a"
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="pl-btn outline"
                  >
                    Live Demo ↗
                  </MagneticButton>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Projects() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="section proj-section-wrapper">
      <div className="proj-section">
        {/* Section header with scroll reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          <motion.div className="s-label" variants={itemVariants}>
            Selected work
          </motion.div>
          <motion.h2 className="s-title" variants={itemVariants}>
            Things I've built.
          </motion.h2>
        </motion.div>
        
        {/* Project grid */}
        <LayoutGroup>
          <motion.div
            className="proj-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isExpanded={expandedId === project.id}
                onToggle={setExpandedId}
              />
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}

export default Projects;
