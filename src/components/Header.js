import React from "react";

function Header() {
  return (
    <header className="header" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 50, 
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)', /* Even subtler border */
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)'
    }}>
      <nav className="container" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr auto 1fr', /* Left, Center, Right alignment */
        alignItems: 'center', 
        height: '70px',
        padding: '0 2rem'
      }}>
        
        {/* 1. Logo Section (Left) */}
        <div style={{ justifySelf: 'start' }}>
          <a href="#home" className="logo" style={{ 
            fontSize: '1.1rem', 
            fontWeight: '700', 
            color: '#fff', 
            textDecoration: 'none', 
            letterSpacing: '-0.02em'
          }}>
            Ash Aung
          </a>
        </div>

        {/* 2. Navigation Links (Centered) */}
        <div className="nav-links" style={{ display: 'flex', gap: '2.5rem' }}>
          {['About', 'Projects', 'Skills'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              style={{ 
                textDecoration: 'none', 
                color: '#888', 
                fontSize: '0.9rem', 
                fontWeight: '500', 
                transition: 'color 0.2s' 
              }}
              onMouseOver={(e) => e.target.style.color = '#fff'}
              onMouseOut={(e) => e.target.style.color = '#888'}
            >
              {item}
            </a>
          ))}
        </div>

        {/* 3. Contact Button (Right) */}
        <div style={{ justifySelf: 'end' }}>
          <a 
            href="#contact" 
            style={{ 
              textDecoration: 'none',
              backgroundColor: '#fff',
              color: '#000',
              padding: '0.6rem 1.2rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'inline-block'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.15)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Contact Me
          </a>
        </div>
        
      </nav>
    </header>
  );
}

export default Header;