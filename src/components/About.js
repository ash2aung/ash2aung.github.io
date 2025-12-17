import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/About.css';
import ashPic from '../assets/ash.jpg';
import profilePic from '../assets/profile.jpg';

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

function About() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0.3);
  const containerRef = useRef(null);
  const dragStartX = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const dragVelocity = useRef(0);
  const hasDragged = useRef(false);
  const draggedCardIndex = useRef(null);

  // Auto orbit animation with momentum
  useEffect(() => {
    if (selectedIndex !== null || isDragging) return;
    
    const interval = setInterval(() => {
      setRotation(prev => prev + velocity);
      setVelocity(prev => {
        const baseSpeed = 0.3;
        if (Math.abs(prev - baseSpeed) < 0.01) return baseSpeed;
        return prev + (baseSpeed - prev) * 0.02;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [selectedIndex, isDragging, velocity]);

  // Smooth rotation to target when card is selected
  useEffect(() => {
    if (targetRotation === null) return;
    
    const interval = setInterval(() => {
      setRotation(prev => {
        const diff = targetRotation - prev;
        const normalizedDiff = ((diff + 180) % 360) - 180;
        
        if (Math.abs(normalizedDiff) < 1) {
          setTargetRotation(null);
          return targetRotation;
        }
        return prev + normalizedDiff * 0.15;
      });
    }, 16);
    
    return () => clearInterval(interval);
  }, [targetRotation]);

  // Drag handlers
  const handleDragStart = useCallback((clientX, cardIndex = null) => {
    if (selectedIndex !== null) return;
    setIsDragging(true);
    dragStartX.current = clientX;
    lastX.current = clientX;
    lastTime.current = Date.now();
    dragVelocity.current = 0;
    hasDragged.current = false;
    draggedCardIndex.current = cardIndex;
  }, [selectedIndex]);

  const handleDragMove = useCallback((clientX) => {
    if (!isDragging) return;
    
    const deltaX = clientX - lastX.current;
    const totalDrag = Math.abs(clientX - dragStartX.current);
    
    // Mark as dragged if moved more than 5px
    if (totalDrag > 5) {
      hasDragged.current = true;
    }
    
    const now = Date.now();
    const deltaTime = now - lastTime.current;
    
    if (deltaTime > 0) {
      dragVelocity.current = deltaX / deltaTime * 15;
    }
    
    setRotation(prev => prev - deltaX * 0.5);
    
    lastX.current = clientX;
    lastTime.current = now;
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const newVelocity = -dragVelocity.current;
    if (Math.abs(newVelocity) > 0.5) {
      setVelocity(Math.max(-3, Math.min(3, newVelocity)));
    }
  }, [isDragging]);

  // Mouse events for container
  const handleMouseDown = (e) => {
    const cardElement = e.target.closest('.orbit-card');
    const cardIndex = cardElement ? parseInt(cardElement.dataset.index) : null;
    handleDragStart(e.clientX, cardIndex);
  };

  // Touch events
  const handleTouchStart = (e) => {
    const cardElement = e.target.closest('.orbit-card');
    const cardIndex = cardElement ? parseInt(cardElement.dataset.index) : null;
    handleDragStart(e.touches[0].clientX, cardIndex);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Global mouse listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => handleDragEnd();
    const handleGlobalMouseMove = (e) => handleDragMove(e.clientX);
    
    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, handleDragEnd, handleDragMove]);

  const handleCardClick = (index, e) => {
    e.stopPropagation();
    
    // Don't select if we dragged
    if (hasDragged.current) {
      hasDragged.current = false;
      return;
    }
    
    if (selectedIndex === index) {
      setIsFlipped(!isFlipped);
    } else {
      const totalCards = cards.length;
      const anglePerCard = 360 / totalCards;
      const currentCardAngle = anglePerCard * index + rotation;
      const targetRot = rotation - (currentCardAngle - 180);
      
      setSelectedIndex(index);
      setIsFlipped(false);
      setTargetRotation(targetRot);
    }
  };

  // Click anywhere outside cards to resume rotation
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (selectedIndex === null) return;
      if (hasDragged.current) return;
      
      const clickedCard = e.target.closest('.orbit-card');
      if (!clickedCard) {
        setSelectedIndex(null);
        setIsFlipped(false);
        setTargetRotation(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [selectedIndex]);

  // Get responsive radius based on screen width
  const getRadius = () => {
    if (typeof window === 'undefined') return 180;
    const width = window.innerWidth;
    if (width < 480) return 120;
    if (width < 640) return 140;
    if (width < 900) return 160;
    if (width < 1024) return 160;
    if (width >= 1280) return 200;
    return 180;
  };

  const getCardPosition = (index) => {
    const totalCards = cards.length;
    const anglePerCard = 360 / totalCards;
    const cardAngle = anglePerCard * index + rotation;
    const radians = (cardAngle * Math.PI) / 180;
    const radius = getRadius();
    
    const x = Math.sin(radians) * radius;
    const z = Math.cos(radians) * radius;
    const scale = (z + radius) / (radius * 2) * 0.35 + 0.65;
    const opacity = (z + radius) / (radius * 2) * 0.5 + 0.5;
    
    return { x, z, scale, opacity, angle: cardAngle };
  };

  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-text">
          <h1>About Me</h1>
          <p>
            I'm <strong>Htet Wai Yan Aung</strong>, a Software Systems student at SFU 
            with a love for <em>technology, music, and adventure</em>.
          </p>
          <p className="about-hint">
            Drag to spin · Click a card to explore
          </p>
        </div>

        <div 
          className={`orbit-container ${isDragging ? 'dragging' : ''}`} 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="orbit-wrapper">
            {cards.map((card, index) => {
              const pos = getCardPosition(index);
              const isSelected = selectedIndex === index;
              
              return (
                <div
                  key={card.id}
                  data-index={index}
                  className={`orbit-card ${isSelected ? 'selected' : ''}`}
                  style={{
                    transform: isSelected 
                      ? 'translate(-50%, -50%) scale(1.1)' 
                      : `translate(calc(-50% + ${pos.x}px), -50%) scale(${pos.scale})`,
                    opacity: isSelected ? 1 : pos.opacity,
                    zIndex: isSelected ? 1000 : Math.round(pos.z + 200),
                  }}
                  onClick={(e) => handleCardClick(index, e)}
                >
                  <div className={`card-flipper ${isFlipped && isSelected ? 'flipped' : ''}`}>
                    {/* Front of card */}
                    <div className="card-front">
                      <div className="card-image">
                        {card.image ? (
                          <img src={card.image} alt={card.title} draggable="false" />
                        ) : (
                          <span className="card-emoji">{card.emoji}</span>
                        )}
                      </div>
                      <div className="card-info">
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                      </div>
                      {isSelected && (
                        <span className="flip-hint">tap to flip</span>
                      )}
                    </div>
                    
                    {/* Back of card */}
                    <div className="card-back">
                      <span className="card-emoji-small">{card.emoji}</span>
                      <p className="fun-fact">{card.funFact}</p>
                      <span className="flip-hint">tap to flip back</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
