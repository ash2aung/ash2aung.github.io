// src/components/Contact.js
import React from 'react';
import '../styles/Contact.css';

function Contact() {
  return (
    <div className="contact">
      <p>You can reach out to me via email or through my social profiles below.</p>  {/* Updated: Contact message */}
      <div className="contact-info">  {/* New: Added contact info */}
        <p>Email: <a href="mailto:hwa201@sfu.ca">hwa201@sfu.ca</a></p>  {/* New: Added email link */}
        <p>LinkedIn: <a href="https://linkedin.com/in/ash2aung" target="_blank" rel="noopener noreferrer">linkedin.com/in/ash2aung</a></p>  {/* New: Added LinkedIn link */}
        <p>GitHub: <a href="https://github.com/ash2aung" target="_blank" rel="noopener noreferrer">github.com/ash2aung</a></p>  {/* New: Added GitHub link */}
      </div>
    </div>
  );
}

export default Contact;