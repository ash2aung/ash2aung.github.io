import React from 'react';

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #222', padding: '3rem 0', marginTop: '4rem' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="muted small">
          © {new Date().getFullYear()} Ash Aung. Built with React.
        </p>
      </div>
    </footer>
  );
}

export default Footer;