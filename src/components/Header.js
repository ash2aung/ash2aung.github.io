import React from "react";
import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="header" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 50, 
      borderBottom: '1px solid hsl(var(--border))',
      backgroundColor: 'hsl(var(--background) / 0.6)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)'
    }}>
      <nav className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        height: '70px',
        padding: '0 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        {/* Logo (Left) */}
        <a href="#home" className="logo" style={{ 
          fontSize: '1.1rem', 
          fontWeight: '700', 
          color: 'hsl(var(--foreground))', 
          textDecoration: 'none', 
          letterSpacing: '-0.02em'
        }}>
          Ash Aung
        </a>

        {/* Nav Links + Contact + Theme Toggle (Right) */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {['About', 'Projects', 'Skills', 'Experience'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              style={{ 
                textDecoration: 'none', 
                color: 'hsl(var(--text-muted))', 
                fontSize: '0.9rem', 
                fontWeight: '500', 
                transition: 'color 0.2s' 
              }}
              onMouseOver={(e) => e.target.style.color = 'hsl(var(--foreground))'}
              onMouseOut={(e) => e.target.style.color = 'hsl(var(--text-muted))'}
            >
              {item}
            </a>
          ))}
          
          <a 
            href="#contact" 
            style={{ 
              textDecoration: 'none',
              backgroundColor: 'transparent',
              color: 'hsl(var(--foreground))',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius, 0.5rem)',
              border: '1px solid hsl(var(--border))',
              fontSize: '0.85rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              display: 'inline-block',
              marginLeft: '0.5rem'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = 'hsl(var(--muted-foreground))';
              e.target.style.color = 'hsl(var(--foreground))';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = 'hsl(var(--border))';
              e.target.style.color = 'hsl(var(--foreground))';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Contact
          </a>
          
          <ThemeToggle />
        </div>
        
      </nav>
    </header>
  );
}

export default Header;
