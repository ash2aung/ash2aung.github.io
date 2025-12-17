import React, { useState } from 'react';
import { Github, Linkedin, Mail, Send, Check } from 'lucide-react';
import '../styles/Contact.css';

function Contact() {
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [toast, setToast] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('hwa201@sfu.ca');
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

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
    <section className="contact-section">
      {/* Toast Notification */}
      {toast && (
        <div className="contact-toast">
          Email copied to clipboard!
        </div>
      )}

      <div className="contact-grid">
        
        {/* Left Side: Text & Socials */}
        <div className="contact-info">
          <h2>Get in touch</h2>
          <p>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="contact-links">
            <button onClick={handleEmailClick} className="contact-link-card">
              <Mail size={20} />
              <span>hwa201@sfu.ca</span>
            </button>
            <a href="https://github.com/ash2aung" target="_blank" rel="noreferrer" className="contact-link-card">
              <Github size={20} />
              <span>github.com/ash2aung</span>
            </a>
            <a href="https://linkedin.com/in/ash2aung" target="_blank" rel="noreferrer" className="contact-link-card">
              <Linkedin size={20} />
              <span>linkedin.com/in/ash2aung</span>
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="John Doe"
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="john@example.com"
              />
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message" 
                required 
                rows="4" 
                placeholder="Hello, I'd like to talk about..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="contact-submit-btn"
              disabled={status === 'sending'}
            >
              {status === 'idle' && <>Send Message <Send size={16} /></>}
              {status === 'sending' && 'Sending...'}
              {status === 'success' && <>Sent! <Check size={16} /></>}
              {status === 'error' && 'Error - Try again'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;
