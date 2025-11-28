import React from "react";

function Header() {
  return (
    <header className="header" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 50, 
      borderBottom: '1px solid hsl(var(--border))', 
      backgroundColor: 'rgba(0, 0, 0, 0.8)', /* Changed to Black */
      backdropFilter: 'blur(8px)' 
    }}>
      <nav className="container nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
        <a href="#home" className="logo" style={{ fontSize: '1.25rem', fontWeight: '700', color: 'hsl(var(--foreground))', textDecoration: 'none' }}>
          Ash Aung<span style={{ color: 'hsl(var(--primary))' }}>.</span>
        </a>
        <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
          {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="small muted"
              style={{ textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.target.style.color = 'hsl(var(--primary))'} /* Hover turns Teal */
              onMouseOut={(e) => e.target.style.color = 'hsl(var(--muted-foreground))'}
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