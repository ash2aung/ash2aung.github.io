import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import '../styles/Cursor.css';

function Cursor() {
  const cursorRef = useRef(null);
  
  // Raw mouse position (instant)
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  
  // Spring-animated position for the trailing circle
  const springConfig = { stiffness: 150, damping: 15, mass: 0.2 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Cursor size state for hover effects
  const cursorSize = useMotionValue(40);
  const springSize = useSpring(cursorSize, { stiffness: 300, damping: 20 });

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnterInteractive = () => {
      cursorSize.set(64);
    };

    const handleMouseLeaveInteractive = () => {
      cursorSize.set(40);
    };

    const handleMouseEnterButton = () => {
      cursorSize.set(52);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Find all interactive elements
    const triggers = document.querySelectorAll('.cursor-trigger');
    const buttons = document.querySelectorAll('.btn, button, a, .mag-btn');

    triggers.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    buttons.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterButton);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      triggers.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      buttons.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterButton);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, [mouseX, mouseY, cursorSize]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Small dot - follows instantly */}
      <motion.div
        className="cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
      
      {/* Larger trailing circle - spring physics */}
      <motion.div
        ref={cursorRef}
        className="cursor-circle"
        style={{
          x: springX,
          y: springY,
          width: springSize,
          height: springSize,
        }}
      />
    </>
  );
}

export default Cursor;
