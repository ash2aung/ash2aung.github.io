import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import portfolioImage from '../assets/personal.png';
import emergencyReporterImage from '../assets/emergency.png';
import chaosImage from '../assets/chess.png';

const projects = [
  {
    title: 'Portfolio Website',
    desc: 'Personal portfolio built with React and modern CSS features.',
    tags: ['React', 'CSS3', 'Responsive'],
    github: 'https://github.com/ash2aung/ash2aung.github.io',
    demo: 'https://ash2aung.github.io',
    image: portfolioImage
  },
  {
    title: 'Emergency Reporter',
    desc: 'Real-time reporting system tracking emergencies with live mapping.',
    tags: ['TypeScript', 'Leaflet', 'HTML/CSS'],
    github: 'https://github.com/dagemd/272-FInal-project',
    demo: null,
    image: emergencyReporterImage
  },
  {
    title: 'Order & Chaos',
    desc: 'Strategic board game in C++ featuring Human vs AI gameplay.',
    tags: ['C++', 'Algorithm', 'Game Dev'],
    github: 'https://replit.com/@ashhhh1507/chaos-and-order?v=1',
    demo: null,
    image: chaosImage
  }
];

function Projects() {
  const [toast, setToast] = useState({ show: false, message: '' });

  const handleDemoClick = (e, project) => {
    if (!project.demo) {
      e.preventDefault();
      setToast({ show: true, message: `You caught me! No demo for ${project.title} yet 😅` });
      setTimeout(() => setToast({ show: false, message: '' }), 3000);
    }
  };

  return (
    <div className="container section">
      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#111',
          border: '1px solid #333',
          color: '#e0e6ed',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius)',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}>
          {toast.message}
        </div>
      )}

      <h2 className="h2">Selected Work</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project, index) => (
          <div key={index} className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '200px', overflow: 'hidden', borderBottom: '1px solid #222' }}>
              <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, transition: 'opacity 0.3s' }} 
                onMouseOver={(e) => e.target.style.opacity = 1}
                onMouseOut={(e) => e.target.style.opacity = 0.8}
              />
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <h3 className="h3" style={{ fontSize: '1.1rem', margin: 0 }}>{project.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a href={project.github} target="_blank" rel="noreferrer" style={{ color: '#666', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = '#666'}><Github size={18} /></a>
                  <a 
                    href={project.demo || '#'} 
                    target={project.demo ? '_blank' : '_self'}
                    rel="noreferrer" 
                    style={{ color: project.demo ? '#666' : '#444', transition: 'color 0.2s', cursor: 'pointer' }} 
                    onMouseOver={e => e.target.style.color = project.demo ? '#fff' : '#666'} 
                    onMouseOut={e => e.target.style.color = project.demo ? '#666' : '#444'}
                    onClick={(e) => handleDemoClick(e, project)}
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
              <p className="muted" style={{ fontSize: '0.9rem', flex: 1, marginBottom: '1.5rem' }}>{project.desc}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {project.tags.map(tag => (
                  <span key={tag} className="badge">{tag}</span>
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