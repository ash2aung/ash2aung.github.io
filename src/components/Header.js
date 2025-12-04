import React from "react";

function Header() {
  return (
    <header className="header" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 50, 
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
          color: '#fff', 
          textDecoration: 'none', 
          letterSpacing: '-0.02em'
        }}>
          Ash Aung
        </a>

        {/* Nav Links + Contact (Right) */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {['About', 'Projects', 'Skills', 'Experience'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              style={{ 
                textDecoration: 'none', 
                color: '#8a9bab', 
                fontSize: '0.9rem', 
                fontWeight: '500', 
                transition: 'color 0.2s' 
              }}
              onMouseOver={(e) => e.target.style.color = '#fff'}
              onMouseOut={(e) => e.target.style.color = '#8a9bab'}
            >
              {item}
            </a>
          ))}
          
          <a 
            href="#contact" 
            style={{ 
              textDecoration: 'none',
              backgroundColor: 'transparent',
              color: '#e0e6ed',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius, 0.5rem)',
              border: '1px solid #333',
              fontSize: '0.85rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              display: 'inline-block',
              marginLeft: '0.5rem'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = '#666';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = '#333';
              e.target.style.color = '#e0e6ed';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Contact
          </a>
        </div>
        
      </nav>
    </header>
  );
}

export default Header;
