import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useVelocity } from 'framer-motion';
import '../styles/AboutOverlay.css';
import ashPic from '../assets/ash.jpg';
import profilePic from '../assets/profile.jpg';

// Cards data - interests with flip-card fun facts
const cards = [
  {
    id: 1,
    emoji: '🎵',
    title: 'Music',
    description: 'R&B enthusiast, currently into BRB.',
    funFact: 'I have a playlist for every mood — even "coding at 2am".',
    image: null,
  },
  {
    id: 2,
    emoji: '✈️',
    title: 'Travel',
    description: 'Bangkok, Singapore, Hong Kong & more.',
    funFact: 'I once got lost in Vietnam for 3 hours. Best pho I ever had.',
    image: null,
  },
  {
    id: 3,
    emoji: '🥾',
    title: 'Hiking',
    description: 'Got lost a few times. Worth it.',
    funFact: 'I forgot to bring food on a 6-hour hike. Survived on vibes.',
    image: ashPic,
  },
  {
    id: 4,
    emoji: '📸',
    title: 'Photography',
    description: 'Beaches, mountains, vintage cameras.',
    funFact: 'Saving up for a vintage digital camera from the 2000s.',
    image: profilePic,
  },
  {
    id: 5,
    emoji: '🏸',
    title: 'Sports',
    description: 'Basketball turned badminton.',
    funFact: 'I switched because I kept getting elbowed in pickup games.',
    image: null,
  }
];

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
  const [flippedCard, setFlippedCard] = useState(null);
  const [centerIndex, setCenterIndex] = useState(2); // Start with middle card centered
  const containerRef = useRef(null);
  
  // Drag motion values with spring physics
  const x = useMotionValue(0);
  const velocity = useVelocity(x);
  
  // Spring config for smooth animations
  const springConfig = { stiffness: 300, damping: 30 };
  const xSpring = useSpring(x, springConfig);
  
  // Calculate card width + gap for snapping
  const cardWidth = 280;
  const cardGap = 24;
  const cardStep = cardWidth + cardGap;
  
  // Transform drag X to rotation for velocity leaning
  const rotateY = useTransform(velocity, [-1000, 0, 1000], [15, 0, -15]);
  
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
  
  // Reset state when overlay opens
  useEffect(() => {
    if (isOpen) {
      setFlippedCard(null);
      setCenterIndex(2);
      x.set(0);
    }
  }, [isOpen, x]);
  
  // Handle card flip
  const handleCardClick = (index) => {
    // Only flip if it's the center card
    if (index === centerIndex) {
      setFlippedCard(flippedCard === index ? null : index);
    } else {
      // Snap to make clicked card the center
      const targetX = (centerIndex - index) * cardStep;
      x.set(targetX);
      setCenterIndex(index);
      setFlippedCard(null);
    }
  };
  
  // Handle drag end - snap to nearest card
  const handleDragEnd = () => {
    const currentX = x.get();
    const offset = Math.round(currentX / cardStep);
    const newCenterIndex = Math.max(0, Math.min(cards.length - 1, centerIndex - offset));
    const snapX = (centerIndex - newCenterIndex) * cardStep;
    
    x.set(snapX);
    setCenterIndex(newCenterIndex);
    setFlippedCard(null);
  };

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
        
        {/* 3D Cover Flow Carousel Section */}
        <section className="about-carousel-section">
          <motion.span className="about-section-label" variants={textRevealVariant}>
            {'// interests.explore'}
          </motion.span>
          <motion.h2 className="about-section-title" variants={textRevealVariant}>
            Beyond the Code
          </motion.h2>
          
          <motion.div 
            className="coverflow-container"
            variants={textRevealVariant}
            ref={containerRef}
          >
            <div className="coverflow-perspective">
              <motion.div
                className="coverflow-track"
                drag="x"
                dragConstraints={{ left: -cardStep * 2, right: cardStep * 2 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                style={{ x: xSpring }}
              >
                {cards.map((card, index) => (
                  <CoverFlowCard
                    key={card.id}
                    card={card}
                    index={index}
                    centerIndex={centerIndex}
                    isFlipped={flippedCard === index}
                    onClick={() => handleCardClick(index)}
                    dragX={x}
                    velocityRotate={rotateY}
                  />
                ))}
              </motion.div>
            </div>
            
            <div className="coverflow-hint">
              <span>drag to explore</span>
              <span className="coverflow-hint-separator">·</span>
              <span>click center card to flip</span>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </motion.div>
  );
}

// Individual Cover Flow Card with 3D transforms
function CoverFlowCard({ card, index, centerIndex, isFlipped, onClick, dragX, velocityRotate }) {
  const offset = index - centerIndex;
  
  // Calculate 3D transforms based on position from center
  const rotateY = useTransform(dragX, (latestX) => {
    const dragOffset = latestX / (280 + 24); // cardStep
    const effectiveOffset = offset - dragOffset;
    
    // Cards rotate away from center
    if (Math.abs(effectiveOffset) < 0.1) return 0;
    return effectiveOffset * -45; // 45 degree rotation per card position
  });
  
  const translateX = useTransform(dragX, (latestX) => {
    const dragOffset = latestX / (280 + 24);
    const effectiveOffset = offset - dragOffset;
    
    // Tighter spacing in center, spread out on sides
    const baseTranslate = effectiveOffset * 220;
    return baseTranslate;
  });
  
  const translateZ = useTransform(dragX, (latestX) => {
    const dragOffset = latestX / (280 + 24);
    const effectiveOffset = Math.abs(offset - dragOffset);
    
    // Center card comes forward, others recede
    return -effectiveOffset * 100;
  });
  
  const scale = useTransform(dragX, (latestX) => {
    const dragOffset = latestX / (280 + 24);
    const effectiveOffset = Math.abs(offset - dragOffset);
    
    // Center card is full size, others shrink
    return Math.max(0.7, 1 - effectiveOffset * 0.15);
  });
  
  const opacity = useTransform(dragX, (latestX) => {
    const dragOffset = latestX / (280 + 24);
    const effectiveOffset = Math.abs(offset - dragOffset);
    
    // Fade out cards far from center
    return Math.max(0.4, 1 - effectiveOffset * 0.25);
  });
  
  const brightness = useTransform(dragX, (latestX) => {
    const dragOffset = latestX / (280 + 24);
    const effectiveOffset = Math.abs(offset - dragOffset);
    
    return Math.max(0.6, 1 - effectiveOffset * 0.2);
  });
  
  // Z-index based on distance from center (center has highest)
  const zIndex = useTransform(dragX, (latestX) => {
    const dragOffset = latestX / (280 + 24);
    const effectiveOffset = Math.abs(offset - dragOffset);
    return Math.round(10 - effectiveOffset * 2);
  });
  
  // Add velocity-based lean
  const velocityLean = useTransform(velocityRotate, (v) => v * 0.3);
  
  // Combine rotations
  const combinedRotateY = useTransform(
    [rotateY, velocityLean],
    ([cardRotate, lean]) => isFlipped ? 180 : (cardRotate + lean)
  );

  return (
    <motion.div
      className={`coverflow-card ${isFlipped ? 'flipped' : ''}`}
      onClick={onClick}
      style={{
        x: translateX,
        z: translateZ,
        scale,
        opacity,
        zIndex,
        filter: useTransform(brightness, (b) => `brightness(${b})`),
      }}
    >
      <motion.div 
        className="coverflow-card-inner"
        style={{ 
          rotateY: combinedRotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Front Face */}
        <div className="coverflow-card-face coverflow-card-front">
          <div className="coverflow-card-image">
            {card.image ? (
              <img src={card.image} alt={card.title} draggable="false" />
            ) : (
              <span className="coverflow-card-emoji">{card.emoji}</span>
            )}
          </div>
          <div className="coverflow-card-content">
            <h3 className="coverflow-card-title">{card.title}</h3>
            <p className="coverflow-card-desc">{card.description}</p>
          </div>
          <div className="coverflow-card-glow" />
        </div>
        
        {/* Back Face */}
        <div className="coverflow-card-face coverflow-card-back">
          <span className="coverflow-card-emoji-small">{card.emoji}</span>
          <p className="coverflow-card-funfact">{card.funFact}</p>
          <span className="coverflow-card-flip-hint">tap to flip back</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AboutOverlay;
