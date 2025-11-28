import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import portfolioImage from '../assets/personal.png';
import emergencyReporterImage from '../assets/emergency.png';
import chaosImage from '../assets/chess.png';

const projects = [
  {
    title: 'Portfolio Website',
    desc: 'Personal portfolio built with React and modern CSS features to showcase projects and skills.',
    tags: ['React', 'CSS3', 'Responsive'],
    github: 'https://github.com/ash2aung/ash2aung.github.io',
    demo: 'https://ash2aung.github.io',
    image: portfolioImage
  },
  {
    title: 'Emergency Reporter',
    desc: 'Real-time reporting system enabling users to track emergencies with live location mapping.',
    tags: ['TypeScript', 'Leaflet', 'HTML/CSS'],
    github: 'https://github.com/dagemd/272-FInal-project',
    demo: '#',
    image: emergencyReporterImage
  },
  {
    title: 'Order & Chaos',
    desc: 'Strategic board game implementation in C++ featuring Human vs AI gameplay on variable grids.',
    tags: ['C++', 'Algorithm', 'Game Dev'],
    github: 'https://replit.com/@ashhhh1507/chaos-and-order?v=1',
    demo: '#',
    image: chaosImage
  }
];

function Projects() {
  return (
    <div className="container section">
      <h2 className="h2">Featured Projects</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {projects.map((project, index) => (
          <div key={index} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '180px', overflow: 'hidden', borderBottom: '1px solid hsl(var(--border))' }}>
              <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 className="h3" style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
              <p className="muted" style={{ fontSize: '0.9rem', flex: 1 }}>{project.desc}</p>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
                {project.tags.map(tag => (
                  <span key={tag} className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>{tag}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ width: '100%', height: '2rem' }}>
                  <Github size={14} style={{ marginRight: '0.5rem' }} /> Code
                </a>
                <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', height: '2rem' }}>
                  <ExternalLink size={14} style={{ marginRight: '0.5rem' }} /> Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;