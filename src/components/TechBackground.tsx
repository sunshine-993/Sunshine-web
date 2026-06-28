import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export const TechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive optimization
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Interactive mouse state
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 180, // Influence distance
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      baseAlpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Super smooth, ultra-slow floating speeds for non-distracting premium feel
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 2 + 1; // Elegant small sizing
        this.baseAlpha = Math.random() * 0.2 + 0.1;
        this.alpha = this.baseAlpha;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries elegantly
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Interactive gravity/repulsion effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            // Push particles away slightly
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 1.5;
            this.y += Math.sin(angle) * force * 1.5;
            this.alpha = Math.min(0.6, this.baseAlpha + force * 0.3);
          } else {
            this.alpha = this.baseAlpha;
          }
        } else {
          this.alpha = this.baseAlpha;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Matching sage color palette: rgba(143, 161, 145, alpha)
        c.fillStyle = `rgba(143, 161, 145, ${this.alpha})`;
        c.fill();
      }
    }

    // Build particle counts dynamically based on screen density
    const particleCount = Math.min(80, Math.floor((width * height) / 22000));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render grid grid-lines (extremely faint background alignment mapping)
      ctx.strokeStyle = 'rgba(143, 161, 145, 0.025)';
      ctx.lineWidth = 0.5;
      const gridSize = 100;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw active connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Only connect nearby nodes (digital ecosystem mesh look)
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(143, 161, 145, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Dynamic Gradient Orbs for Refreshing & Natural Aura */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-40 mix-blend-multiply">
        <motion.div 
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-20%] left-[-15%] w-[65vw] h-[65vw] rounded-full bg-radial from-sage-200/50 via-sage-100/10 to-transparent blur-[130px]"
        />
        <motion.div 
          animate={{
            x: [0, -35, 50, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.85, 1.15, 1]
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-15%] right-[-15%] w-[75vw] h-[75vw] rounded-full bg-radial from-sage-100/45 via-cream-200/20 to-transparent blur-[150px]"
        />
        <motion.div 
          animate={{
            x: [0, 30, -35, 0],
            y: [0, 45, -30, 0],
            scale: [1, 1.08, 0.9, 1]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[25%] right-[5%] w-[55vw] h-[55vw] rounded-full bg-radial from-cream-200/50 via-sage-100/10 to-transparent blur-[110px]"
        />
        <motion.div 
          animate={{
            x: [0, -50, 20, 0],
            y: [0, -30, 60, 0],
            scale: [1, 1.15, 0.95, 1]
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[55%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-radial from-sage-200/35 via-cream-100/15 to-transparent blur-[120px]"
        />
      </div>

      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 w-full h-full mix-blend-multiply opacity-75"
        id="tech-canvas-backdrop"
      />
    </>
  );
};
