import React from 'react';

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid hsl(var(--border))', padding: '1.25rem 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="muted small" style={{ margin: 0 }}>
          © {new Date().getFullYear()} Ash Aung. Built with React.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
