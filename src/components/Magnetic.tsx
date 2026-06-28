import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticProps {
  children: React.ReactElement;
  range?: number; // Distance threshold to trigger attraction
  strength?: number; // Attraction strength multiplier
}

export const Magnetic: React.FC<MagneticProps> = ({ 
  children, 
  range = 35, 
  strength = 0.35 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Springs for smooth physics movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 15, mass: 0.6 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    // Disable magnetic effect on touch screens for seamless usability
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const childX = rect.left + rect.width / 2;
      const childY = rect.top + rect.height / 2;

      const dx = e.clientX - childX;
      const dy = e.clientY - childY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < range) {
        setIsHovered(true);
        // Attract toward the cursor
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    ref.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ref.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [range, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      style={{
        x: xSpring,
        y: ySpring,
      }}
      className="inline-block"
    >
      {React.cloneElement(children, {
        className: `${children.props.className || ''} ${isHovered ? 'shadow-md scale-[1.02]' : ''} transition-shadow duration-300`
      })}
    </motion.div>
  );
};
