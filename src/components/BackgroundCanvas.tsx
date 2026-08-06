import React, { useEffect, useRef } from 'react';
import { useDevicePerformance } from '../hooks/useDevicePerformance';

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isLowEnd } = useDevicePerformance();

  useEffect(() => {
    // Disable heavy canvas calculations completely on low-end or touch devices
    if (isLowEnd) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const particleCount = 18; // Strict performance cap < 20
    let mouse = { x: -1000, y: -1000, radius: 140 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 1;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.8 ? '#FF7A00' : '#FFFFFF';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Optimized mouse collision distance check
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distanceSq = dx * dx + dy * dy;
        const radiusSq = mouse.radius * mouse.radius;

        if (distanceSq < radiusSq) {
          const distance = Math.sqrt(distanceSq);
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / (distance || 1)) * force * 1.2;
          this.y -= (dy / (distance || 1)) * force * 1.2;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        // Disabled expensive canvas shadows for maximum rendering efficiency
        c.fill();
        c.restore();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 10000) { // 100^2
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 100) * 0.06;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      // Draw background color directly for alpha: false optimization
      ctx.fillStyle = '#090909';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle ambient glow near mouse (optimized gradient radius)
      if (mouse.x > -1000) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.2
        );
        gradient.addColorStop(0, 'rgba(255, 122, 0, 0.03)');
        gradient.addColorStop(1, 'rgba(9, 9, 9, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLowEnd]);

  if (isLowEnd) {
    return <div className="fixed inset-0 -z-10 bg-[#090909]" />;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none bg-[#090909] transform-gpu"
    />
  );
};
