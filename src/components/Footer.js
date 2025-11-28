import React from 'react';
import { Github, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid hsl(var(--border))', padding: '2rem 0', marginTop: '2rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="muted small">
          © {new Date().getFullYear()} Ash Aung. Built with React.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a 
            href="https://github.com/ash2aung" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'hsl(var(--muted-foreground))', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'hsl(var(--primary))'}
            onMouseOut={(e) => e.currentTarget.style.color = 'hsl(var(--muted-foreground))'}
          >
            <Github size={20} />
          </a>
          <a 
            href="https://linkedin.com/in/ash2aung" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'hsl(var(--muted-foreground))', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'hsl(var(--primary))'}
            onMouseOut={(e) => e.currentTarget.style.color = 'hsl(var(--muted-foreground))'}
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;