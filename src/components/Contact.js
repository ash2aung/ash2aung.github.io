import React from 'react';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

function Contact() {
  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius)',
    border: '1px solid #333',
    backgroundColor: '#0a0a0a',
    color: '#fff',
    fontSize: '0.875rem',
    marginBottom: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  const focusStyle = (e) => e.target.style.borderColor = '#666';
  const blurStyle = (e) => e.target.style.borderColor = '#333';

  return (
    <div className="container section">
      <div className="grid-2" style={{ gap: '4rem' }}>
        
        {/* Left Side: Text & Socials */}
        <div>
          <h2 className="h2">Get in touch</h2>
          <p className="muted" style={{ marginBottom: '2rem' }}>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="mailto:hwa201@sfu.ca" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', padding: '1rem' }}>
              <Mail size={20} color="#fff" />
              <span style={{ color: '#888' }}>hwa201@sfu.ca</span>
            </a>
            <a href="https://github.com/ash2aung" target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', padding: '1rem' }}>
              <Github size={20} color="#fff" />
              <span style={{ color: '#888' }}>github.com/ash2aung</span>
            </a>
            <a href="https://linkedin.com/in/ash2aung" target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', padding: '1rem' }}>
              <Linkedin size={20} color="#fff" />
              <span style={{ color: '#888' }}>linkedin.com/in/ash2aung</span>
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="card">
          <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="John Doe"
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>
            
            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Email</label>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="john@example.com"
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Message</label>
              <textarea 
                name="message" 
                required 
                rows="4" 
                placeholder="Hello, I'd like to talk about..."
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={focusStyle}
                onBlur={blurStyle}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Send Message <Send size={16} style={{ marginLeft: '0.5rem' }} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;