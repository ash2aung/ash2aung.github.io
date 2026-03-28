import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import '../styles/AboutOverlay.css';

// Leadership roles data
const leadershipRoles = [
  {
    index: '01',
    title: 'SSSS President',
    org: 'Software Systems Student Society',
    desc: 'Leading initiatives to build community and create opportunities for SFU computing students.',
  },
  {
    index: '02',
    title: 'SystemsFair Coordinator',
    org: 'Annual Tech Networking Event',
    desc: 'Organizing the flagship career fair connecting students with top tech companies.',
  },
  {
    index: '03',
    title: 'XHacks Organizer',
    org: 'Upcoming Hackathon',
    desc: 'Planning an innovative hackathon experience for the next generation of builders.',
  },
];

// Gallery images (placeholder URLs - replace with your actual images)
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop', alt: 'Mountain landscape' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop', alt: 'Forest trail' },
  { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=500&fit=crop', alt: 'Lake reflection' },
  { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=500&fit=crop', alt: 'Misty mountains' },
  { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=500&fit=crop', alt: 'Forest path' },
  { src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=500&fit=crop', alt: 'Waterfall' },
];

// Stagger animation config for text reveals
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const textRevealVariant = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    filter: 'blur(8px)' 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    filter: 'blur(5px)',
    transition: {
      duration: 0.3,
    },
  },
};

function AboutOverlay({ isOpen, onClose }) {
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  
  // Draggable carousel state
  const x = useMotionValue(0);
  
  // Calculate carousel constraints
  useEffect(() => {
    if (carouselRef.current && isOpen) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const clientWidth = carouselRef.current.offsetWidth;
      setCarouselWidth(scrollWidth - clientWidth + 60);
    }
  }, [isOpen]);
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <motion.div
      className="about-overlay"
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{
        type: 'spring',
        stiffness: 70,
        damping: 15,
      }}
    >
      {/* Close Button */}
      <motion.button
        className="about-close-btn cursor-trigger"
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="about-close-bracket">[</span>
        <span className="about-close-x">x</span>
        <span className="about-close-bracket">]</span>
        <span>exit_process</span>
      </motion.button>
      
      <motion.div 
        className="about-overlay-inner"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Bio Section */}
        <section className="about-bio-section">
          <motion.span className="about-section-label" variants={textRevealVariant}>
            {'// about.ash'}
          </motion.span>
          <motion.h1 className="about-bio-title" variants={textRevealVariant}>
            Software Systems.
          </motion.h1>
          <motion.h1 className="about-bio-title about-bio-title-accent" variants={textRevealVariant}>
            Human Systems.
          </motion.h1>
          <motion.p className="about-bio-text" variants={textRevealVariant}>
            I'm a Software Systems student at Simon Fraser University, obsessed with 
            the intersection where <span className="text-accent">low-level architecture</span> meets
            <span className="text-accent"> high-end product design</span>.
          </motion.p>
          <motion.p className="about-bio-text" variants={textRevealVariant}>
            I believe the best software isn't just functional—it's intuitive, 
            delightful, and built with deep understanding of both the machine 
            and the humans using it.
          </motion.p>
          <motion.p className="about-bio-text about-bio-text-muted" variants={textRevealVariant}>
            When I'm not writing code, I'm probably hiking somewhere I shouldn't be, 
            taking photos with vintage cameras, or trying to convince people that 
            R&B from the early 2000s is objectively the best music ever made.
          </motion.p>
        </section>
        
        {/* Leadership Section */}
        <section className="about-leadership-section">
          <motion.span className="about-section-label" variants={textRevealVariant}>
            {'// leadership.roles'}
          </motion.span>
          <motion.h2 className="about-section-title" variants={textRevealVariant}>
            Building Communities
          </motion.h2>
          <div className="about-roles-grid">
            {leadershipRoles.map((role, i) => (
              <motion.div
                key={role.index}
                className="about-role-card"
                variants={textRevealVariant}
                whileHover={{ 
                  y: -4, 
                  borderColor: '#5a7a4a',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="about-role-index">{role.index}</div>
                <h3 className="about-role-title">{role.title}</h3>
                <span className="about-role-org">{role.org}</span>
                <p className="about-role-desc">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Draggable Carousel Section */}
        <section className="about-carousel-section">
          <motion.span className="about-section-label" variants={textRevealVariant}>
            {'// gallery.moments'}
          </motion.span>
          <motion.h2 className="about-section-title" variants={textRevealVariant}>
            Through My Lens
          </motion.h2>
          <motion.div 
            className="about-carousel-container"
            variants={textRevealVariant}
          >
            <motion.div
              ref={carouselRef}
              className="about-carousel-track"
              drag="x"
              dragConstraints={{ left: -carouselWidth, right: 40 }}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 25 }}
              style={{ x }}
            >
              {galleryImages.map((image, i) => (
                <CarouselCard key={i} image={image} index={i} x={x} />
              ))}
            </motion.div>
            <div className="about-carousel-hint">
              <span>drag to explore</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </motion.div>
  );
}

// Carousel card with scale/brightness effect based on position
function CarouselCard({ image, index, x }) {
  const cardRef = useRef(null);
  
  // Transform x position to scale and brightness
  const scale = useTransform(x, (latestX) => {
    if (!cardRef.current) return 1;
    const containerWidth = window.innerWidth;
    const cardWidth = 280;
    const gap = 24;
    const cardCenter = (index * (cardWidth + gap)) + cardWidth / 2 + latestX + 32;
    const containerCenter = containerWidth / 2;
    const distFromCenter = Math.abs(cardCenter - containerCenter);
    const maxDist = containerCenter;
    const normalized = Math.min(distFromCenter / maxDist, 1);
    return 1.05 - normalized * 0.15;
  });
  
  const brightness = useTransform(x, (latestX) => {
    if (!cardRef.current) return 1;
    const containerWidth = window.innerWidth;
    const cardWidth = 280;
    const gap = 24;
    const cardCenter = (index * (cardWidth + gap)) + cardWidth / 2 + latestX + 32;
    const containerCenter = containerWidth / 2;
    const distFromCenter = Math.abs(cardCenter - containerCenter);
    const maxDist = containerCenter;
    const normalized = Math.min(distFromCenter / maxDist, 1);
    return 1 - normalized * 0.35;
  });

  return (
    <motion.div
      ref={cardRef}
      className="about-carousel-card"
      style={{ 
        scale,
        filter: useTransform(brightness, (b) => `brightness(${b})`),
      }}
    >
      <img src={image.src} alt={image.alt} draggable="false" />
      <div className="about-carousel-card-overlay" />
    </motion.div>
  );
}

export default AboutOverlay;
