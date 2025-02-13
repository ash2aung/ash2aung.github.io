import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import '../styles/Contact.css';

function Contact() {
  return (
    <section className="contact">
      <div className="contact-header">
        <h1>Let's Connect!</h1>
        <p className="contact-subtitle">
          I'm always looking for new opportunities and my inbox is always open.
        </p>
      </div>
      
      <div className="contact-links">
        <a href="https://github.com/ash2aung" target="_blank" rel="noopener noreferrer" className="contact-link">
          <Github size={24} />
          <span>GitHub</span>
        </a>
        <a href="https://linkedin.com/in/ash2aung" target="_blank" rel="noopener noreferrer" className="contact-link">
          <Linkedin size={24} />
          <span>LinkedIn</span>
        </a>
        <a href="mailto:ash2aung@example.com" className="contact-link">
          <Mail size={24} />
          <span>Email</span>
        </a>
      </div>
    </section>
  );
}

export default Contact;