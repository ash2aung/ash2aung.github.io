import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton - A button that subtly follows the cursor when hovered
 * Converts the vanilla JS .mag-btn mousemove logic into a Framer Motion component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onClick - Click handler
 * @param {string} props.as - Element type ('button', 'a', 'div')
 * @param {Object} props.rest - Any other props to pass through
 */
function MagneticButton({ 
  children, 
  className = '', 
  onClick, 
  as = 'button',
  href,
  target,
  rel,
  type,
  disabled,
  download,
  ...rest 
}) {
  const ref = useRef(null);
  
  // Motion values for position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics for smooth return
  const springConfig = { stiffness: 300, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  // Scale for press effect
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 400, damping: 25 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate offset from center (0.25 factor for subtle movement)
    const offsetX = (e.clientX - centerX) * 0.25;
    const offsetY = (e.clientY - centerY) * 0.25;
    
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    // Snap back to center
    x.set(0);
    y.set(0);
  };

  const handleMouseDown = () => {
    scale.set(0.96);
  };

  const handleMouseUp = () => {
    scale.set(1);
  };

  // Determine the component type
  const Component = motion[as] || motion.button;

  // Build props based on element type
  const elementProps = {
    ref,
    className: `mag-btn ${className}`.trim(),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onClick,
    style: {
      x: springX,
      y: springY,
      scale: springScale,
    },
    ...rest,
  };

  // Add type-specific props
  if (as === 'a') {
    elementProps.href = href;
    elementProps.target = target;
    elementProps.rel = rel;
    elementProps.download = download;
  } else if (as === 'button') {
    elementProps.type = type || 'button';
    elementProps.disabled = disabled;
  }

  return (
    <Component {...elementProps}>
      {children}
    </Component>
  );
}

export default MagneticButton;
