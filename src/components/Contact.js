import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Send, Check } from 'lucide-react';
import MagneticButton from './MagneticButton';
import '../styles/Contact.css';

function Contact() {
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [toast, setToast] = useState(false);
  
  // Refs for scroll-triggered animations
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

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

  // Animation variants
  const revealVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay: delay * 0.07
      }
    })
  };

  const linkCardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 + i * 0.08
      }
    })
  };

  const toastVariants = {
    hidden: { opacity: 0, y: -10, x: '-50%' },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: '-50%',
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      x: '-50%',
      transition: { duration: 0.2 }
    }
  };

  const contactLinks = [
    { type: 'button', icon: Mail, label: 'hwa201@sfu.ca', onClick: handleEmailClick },
    { type: 'link', icon: Github, label: 'github.com/ash2aung', href: 'https://github.com/ash2aung' },
    { type: 'link', icon: Linkedin, label: 'linkedin.com/in/ash2aung', href: 'https://linkedin.com/in/ash2aung' }
  ];

  return (
    <section className="contact-section" ref={sectionRef}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            className="contact-toast"
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Email copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="contact-inner">
        {/* Section Header */}
        <motion.div 
          className="s-label"
          variants={revealVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
        >
          Get in touch
        </motion.div>
        <motion.h2 
          className="s-title"
          variants={revealVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={1}
        >
          {"Let's connect."}
        </motion.h2>

        <div className="contact-grid">
          {/* Left Side: Text & Socials */}
          <motion.div 
            className="contact-info"
            variants={revealVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
          >
            <p>
              {"I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!"}
            </p>

            <div className="contact-links">
              {contactLinks.map((link, i) => {
                const Icon = link.icon;
                
                if (link.type === 'button') {
                  return (
                    <motion.button 
                      key={link.label}
                      onClick={link.onClick} 
                      className="contact-link-card"
                      variants={linkCardVariants}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                      custom={i}
                      whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={18} />
                      <span>{link.label}</span>
                    </motion.button>
                  );
                }
                
                return (
                  <motion.a 
                    key={link.label}
                    href={link.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="contact-link-card"
                    variants={linkCardVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    custom={i}
                    whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            className="contact-form-card"
            variants={revealVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={3}
          >
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

              <MagneticButton 
                type="submit" 
                className="contact-submit-btn"
                disabled={status === 'sending'}
              >
                {status === 'idle' && <>Send Message <Send size={16} /></>}
                {status === 'sending' && 'Sending...'}
                {status === 'success' && <>Sent! <Check size={16} /></>}
                {status === 'error' && 'Error - Try again'}
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
