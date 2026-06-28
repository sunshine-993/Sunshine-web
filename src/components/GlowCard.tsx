import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(143, 161, 145, 0.15)"
  enableTilt?: boolean; // 3D Tilt effect
  id?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(143, 161, 145, 0.12)',
  enableTilt = true,
  id
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coords relative to card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tilt spring animations
  const rotateXSpring = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateYSpring = useSpring(0, { stiffness: 150, damping: 20 });

  // Map mouse positions to rotational degree bounds (-6deg to 6deg for premium low amplitude)
  const tiltX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  // Spotlight radial gradient follow positions
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalised position: -0.5 to 0.5
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);

    if (enableTilt) {
      rotateXSpring.set(tiltX.get());
      rotateYSpring.set(tiltY.get());
    }

    // Set absolute mouse coordinates for the background glow
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;
    spotlightX.set(posX);
    spotlightY.set(posY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateXSpring.set(0);
    rotateYSpring.set(0);
  };

  return (
    <motion.div
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden rounded-xl border border-cream-300 bg-white transition-all duration-500 ease-out ${
        isHovered ? 'border-sage-400 shadow-[0_15px_30px_rgba(143,161,145,0.06)]' : 'shadow-xs'
      } ${className}`}
    >
      {/* Dynamic Cursor Spotlight Gradient Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 220px at ${spotlightX}px ${spotlightY}px, ${glowColor}, transparent 80%)`,
        }}
      />

      {/* Internal Content (positioned relative above background overlay) */}
      <div className="relative z-10 w-full h-full" style={{ transform: 'translateZ(10px)' }}>
        {children}
      </div>
    </motion.div>
  );
};
