import React, { useEffect, useRef } from 'react';
import { useDevicePerformance } from '../hooks/useDevicePerformance';

export const CustomCursor: React.FC = () => {
  const { isLowEnd, isTouch } = useDevicePerformance();
  
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const hasMoved = useRef(false);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!hasMoved.current) {
        hasMoved.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
        if (glowRef.current) glowRef.current.style.opacity = '1';
      }
    };

    const handleMouseDown = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '24px';
        ringRef.current.style.height = '24px';
        ringRef.current.style.backgroundColor = 'rgba(255, 122, 0, 0.25)';
      }
    };

    const handleMouseUp = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '40px';
        ringRef.current.style.height = '40px';
        ringRef.current.style.backgroundColor = 'transparent';
      }
    };

    const handleHoverStart = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '56px';
        ringRef.current.style.height = '56px';
        ringRef.current.style.backgroundColor = 'rgba(255, 122, 0, 0.1)';
        ringRef.current.style.borderColor = 'rgba(255, 122, 0, 0.8)';
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate3d(-50%, -50%, 0) scale(1.5)`;
        dotRef.current.style.backgroundColor = '#FFFFFF';
      }
    };

    const handleHoverEnd = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '40px';
        ringRef.current.style.height = '40px';
        ringRef.current.style.backgroundColor = 'transparent';
        ringRef.current.style.borderColor = 'rgba(255, 122, 0, 0.4)';
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate3d(-50%, -50%, 0) scale(1)`;
        dotRef.current.style.backgroundColor = '#FF7A00';
      }
    };

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
        el.addEventListener('mouseenter', handleHoverStart, { passive: true });
        el.addEventListener('mouseleave', handleHoverEnd, { passive: true });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    let rafId: number;
    const animate = () => {
      if (!hasMoved.current) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      // 1. Inner dot tracks mouse 1:1 with ZERO visible latency (GPU accelerated transform)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      // 2. Outer ring follows with highly responsive spring physics (80-120ms lag target)
      const dx = mouse.current.x - ringPos.current.x;
      const dy = mouse.current.y - ringPos.current.y;
      
      ringPos.current.x += dx * 0.5;
      ringPos.current.y += dy * 0.5;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    // Initialize off-screen
    ringPos.current.x = window.innerWidth / 2;
    ringPos.current.y = window.innerHeight / 2;

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer Spotlight Follow Glow (Disabled on low-end hardware) */}
      {!isLowEnd && (
        <div
          ref={glowRef}
          className="fixed pointer-events-none -z-50 w-[450px] h-[450px] rounded-full bg-accent/5 blur-[80px] top-0 left-0 opacity-0 transition-opacity duration-300 will-change-transform transform-gpu"
        />
      )}

      {/* Main Cursor Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-50 w-10 h-10 rounded-full border border-accent/40 bg-transparent top-0 left-0 opacity-0 transition-[width,height,background-color,border-color] duration-200 ease-out will-change-transform transform-gpu hidden md:block"
      />

      {/* Cursor Center Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-50 w-1.5 h-1.5 bg-accent rounded-full top-0 left-0 opacity-0 will-change-transform transform-gpu hidden md:block"
      />
    </>
  );
};
