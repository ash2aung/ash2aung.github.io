import React, { useState } from "react";
import profileImage from "../assets/profile.jpg";
import resume from "../assets/resume.pdf";
import { Github, Linkedin, Mail } from 'lucide-react';

function Home() {
  const [toast, setToast] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('hwa201@sfu.ca');
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="container section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      {/* Toast Notification */}
      {toast && (
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
          Email copied to clipboard!
        </div>
      )}
      <div className="grid-2" style={{ alignItems: 'center' }}>
        <div className="left-content">
          
          <h1 className="h1">Ash Aung</h1>
          
          <p className="lead" style={{ marginBottom: '2.5rem' }}>
            Hi, I'm Ash, a Software Systems student at SFU. I enjoy building niche websites and tools that solve problems I personally care about.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href={resume} className="btn btn-outline" download>
              Resume
            </a>
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a 
              href="https://github.com/ash2aung"
              target="_blank" 
              rel="noreferrer" 
              style={{ color: '#666', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.color = '#666'}
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/ash2aung"
              target="_blank" 
              rel="noreferrer" 
              style={{ color: '#666', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.color = '#666'}
            >
              <Linkedin size={20} />
            </a>
            <button
              onClick={handleEmailClick}
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: 0,
                cursor: 'pointer',
                color: '#666', 
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.color = '#666'}
            >
              <Mail size={20} />
            </button>
          </div>
        </div>

        <div className="profile-image-container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            position: 'relative',
            width: '280px', 
            height: '280px',
          }}>
            {/* Subtle glow effect behind image */}
            <div style={{
              position: 'absolute',
              inset: '-20px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)',
              borderRadius: '50%',
              zIndex: 0
            }} />
            <img 
              src={profileImage} 
              alt="Ash Aung" 
              style={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '1px solid #333',
                position: 'relative',
                zIndex: 1
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;