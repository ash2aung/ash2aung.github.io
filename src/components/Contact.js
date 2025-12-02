import React, { useState } from 'react';
import { Github, Linkedin, Mail, Send, Check } from 'lucide-react';

function Contact() {
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [toast, setToast] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('hwa201@sfu.ca');
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xeoykkwn', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="container section">
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#111',
          border: '1px solid #333',
          color: '#e0e6ed',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius)',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}>
          Email copied to clipboard!
        </div>
      )}

      <div className="grid-2" style={{ gap: '4rem' }}>
        
        {/* Left Side: Text & Socials */}
        <div>
          <h2 className="h2">Get in touch</h2>
          <p className="muted" style={{ marginBottom: '2rem' }}>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              onClick={handleEmailClick}
              className="card" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                textDecoration: 'none', 
                padding: '1rem',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                fontSize: '1rem',
                color: '#8a9bab'
              }}
            >
              <Mail size={20} color="#fff" />
              hwa201@sfu.ca
            </button>
            <a href="https://github.com/ash2aung" target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', padding: '1rem' }}>
              <Github size={20} color="#fff" />
              <span style={{ color: '#8a9bab' }}>github.com/ash2aung</span>
            </a>
            <a href="https://linkedin.com/in/ash2aung" target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', padding: '1rem' }}>
              <Linkedin size={20} color="#fff" />
              <span style={{ color: '#8a9bab' }}>linkedin.com/in/ash2aung</span>
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="card">
          <form onSubmit={handleSubmit}>
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

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={status === 'sending'}
            >
              {status === 'idle' && <>Send Message <Send size={16} style={{ marginLeft: '0.5rem' }} /></>}
              {status === 'sending' && 'Sending...'}
              {status === 'success' && <>Sent! <Check size={16} style={{ marginLeft: '0.5rem' }} /></>}
              {status === 'error' && 'Error - Try again'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;