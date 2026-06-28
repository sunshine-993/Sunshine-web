import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
}

export const SakuraTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const petals: Petal[] = [];
    const maxPetals = 45; // Avoid screen clutter and optimize memory

    // Soft, organic sakura pastel pink palette
    const colors = [
      'rgba(255, 183, 197, ', // Light Sakura
      'rgba(255, 192, 203, ', // Soft Pink
      'rgba(255, 166, 201, ', // Rose Pink
      'rgba(244, 194, 194, ', // Soft Blush
    ];

    // Handle window resizing
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse coordinates and spawn petals on move
    let lastMouseX = null as number | null;
    let lastMouseY = null as number | null;
    const minDistanceToSpawn = 12; // Distance mouse must move to spawn a new petal

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (lastMouseX === null || lastMouseY === null) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        return;
      }

      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > minDistanceToSpawn) {
        // Spawn 1-2 small petals
        const count = Math.min(2, Math.floor(distance / 15) + 1);
        for (let i = 0; i < count; i++) {
          if (petals.length >= maxPetals) {
            petals.shift(); // Evict oldest petal to conserve memory
          }

          const size = Math.random() * 6 + 4; // Delicate small sizing (4px to 10px)
          const colorBase = colors[Math.floor(Math.random() * colors.length)];

          petals.push({
            x: mouseX + (Math.random() - 0.5) * 6,
            y: mouseY + (Math.random() - 0.5) * 6,
            size,
            color: colorBase,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.05,
            // Drifts naturally downwards & outwards based on cursor direction
            vx: dx * 0.15 + (Math.random() - 0.5) * 0.8,
            vy: dy * 0.15 + Math.random() * 0.8 + 0.4, // Slight gravity push downwards
            alpha: 1.0,
            decay: Math.random() * 0.012 + 0.012, // Graceful fade-out over ~1.5 seconds
          });
        }

        lastMouseX = mouseX;
        lastMouseY = mouseY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation frame handle
    let animId: number;

    const drawPetal = (c: CanvasRenderingContext2D, p: Petal) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rotation);

      // Draw standard stylized sakura petal shape (teardrop curved notch)
      c.beginPath();
      c.moveTo(0, 0);
      
      // Left side curve
      c.bezierCurveTo(-p.size * 0.5, -p.size * 0.2, -p.size * 0.6, -p.size * 1.0, 0, -p.size * 1.1);
      
      // Right side curve
      c.bezierCurveTo(p.size * 0.6, -p.size * 1.0, p.size * 0.5, -p.size * 0.2, 0, 0);

      c.fillStyle = `${p.color}${p.alpha})`;
      c.fill();
      
      // Tiny subtle outline for crisp premium definition
      c.strokeStyle = `rgba(255, 255, 255, ${p.alpha * 0.35})`;
      c.lineWidth = 0.5;
      c.stroke();

      c.restore();
    };

    const updateAndRender = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];

        // Apply physics (slight gravity and horizontal air drag)
        p.vy += 0.015; 
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          petals.splice(i, 1);
        } else {
          drawPetal(ctx, p);
        }
      }

      animId = requestAnimationFrame(updateAndRender);
    };

    updateAndRender();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998] w-full h-full"
      id="sakura-trail-overlay"
    />
  );
};
