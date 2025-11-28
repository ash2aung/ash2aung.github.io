import React from "react";
import profileImage from "../assets/profile.jpg";
import resume from "../assets/resume.pdf";
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <div className="container section">
      <div className="grid-2" style={{ alignItems: 'center' }}>
        <div className="left-content">
          <div className="badge badge-secondary" style={{ marginBottom: '1rem' }}>Available for work</div>
          <h1 className="h1" style={{ marginBottom: '1rem' }}>Hi, I'm Ash.</h1>
          <p className="lead" style={{ marginBottom: '2rem' }}>
            I'm a second year Software Systems student at SFU, passionate about building modern, accessible web applications.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="#projects" className="btn btn-primary">
              View Work <ArrowRight size={16} style={{ marginLeft: '0.5rem' }}/>
            </a>
            <a href={resume} className="btn btn-outline" download>
              Download CV
            </a>
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem' }}>
            <a href="https://github.com/ash2aung" target="_blank" rel="noreferrer" className="muted"><Github size={20} /></a>
            <a href="https://linkedin.com/in/ash2aung" target="_blank" rel="noreferrer" className="muted"><Linkedin size={20} /></a>
            <a href="mailto:hwa201@sfu.ca" className="muted"><Mail size={20} /></a>
          </div>
        </div>

        <div className="profile-image-container" style={{ display: 'flex', justifyContent: 'center' }}>
          <img 
            src={profileImage} 
            alt="Ash Aung" 
            style={{ 
              width: '280px', 
              height: '280px', 
              borderRadius: 'var(--radius)', 
              objectFit: 'cover',
              border: '1px solid hsl(var(--border))',
              padding: '0.5rem',
              backgroundColor: 'hsl(var(--card))'
            }} 
          />
        </div>
      </div>
    </div>
  );
}

export default Home;