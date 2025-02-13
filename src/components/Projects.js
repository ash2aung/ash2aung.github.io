import React, { useState } from 'react';
import { Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import '../styles/Projects.css';
import portfolioImage from '../assets/personal.png';
import emergencyReporterImage from '../assets/emergency.png';
import chaosImage from '../assets/chess.png';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio website to showcase my projects and skills. Built with React and modern CSS features.',
    technologies: ['React', 'CSS3', 'React Router', 'Responsive Design'],
    date: 'Feb 2025',
    github: 'https://github.com/ash2aung/ash2aung.github.io',
    liveDemo: 'https://ash2aung.github.io',
    image: portfolioImage
  },
  {
    title: 'Emergency Reporter',
    description: 'A real-time emergency reporting system that enables users to report and track emergencies. Features include live updates, location mapping, and priority categorization.',
    technologies: ['TypeScript', 'CSS', 'HTML', 'JavaScript'],
    date: 'Nov 2024',
    github: 'https://github.com/dagemd/272-FInal-project',
    liveDemo: '#',
    image: emergencyReporterImage
  },
  {
    title: 'Order and Chaos Game',
    description: 'Strategic board game implementation where two players (Human vs AI) compete on a grid between 6x6 and 9x9. One player takes the role of Order, trying to create a line of 5 identical symbols (Xs or Os), while the other plays as Chaos, attempting to prevent such a line from forming.',
    technologies: ['C++'],
    date: 'March 2024',
    github: 'https://replit.com/@ashhhh1507/chaos-and-order?v=1',
    liveDemo: 'https://replit.com/@ashhhh1507/chaos-and-order?v=1',
    image: chaosImage
  }
];

function Projects() {
  const [showMessage, setShowMessage] = useState(false);

  const handleDemoClick = (e, projectTitle) => {
    if (projectTitle === 'Emergency Reporter') {
      e.preventDefault();
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <div className="projects">
      {showMessage && (
        <div className="demo-message">
          Ahh you got me. I don't have a live demo for that project yet! 😅
        </div>
      )}
      <h1 className="projects-title">My Projects</h1>
      <p className="projects-subtitle">A collection of my recent work and side projects</p>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <Github size={20} />
                    <span>Code</span>
                  </a>
                  <a 
                    href={project.liveDemo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link"
                    onClick={(e) => handleDemoClick(e, project.title)}
                  >
                    <ExternalLink size={20} />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="project-content">
              <h2 className="project-title">{project.title}</h2>
              <div className="project-meta">
                <span>
                  <Calendar size={16} />
                  {project.date}
                </span>
                <span>
                  <Tag size={16} />
                  {project.technologies.length} Technologies
                </span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;