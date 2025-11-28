import React from "react";

function Header() {
  return (
    <header className="header" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 50, 
      borderBottom: '1px solid #222', /* Subtle border */
      backgroundColor: 'rgba(0, 0, 0, 0.6)', /* More transparency */
      backdropFilter: 'blur(12px)', /* Higher blur */
      WebkitBackdropFilter: 'blur(12px)'
    }}>
      <nav className="container nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        <a href="#home" className="logo" style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: '#fff', 
          textDecoration: 'none', 
          letterSpacing: '-0.02em'
        }}>
          Ash Aung
        </a>
        <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
          {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              style={{ 
                textDecoration: 'none', 
                color: '#888', 
                fontSize: '0.875rem', 
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
      </nav>
    </header>
  );
}

export default Header;