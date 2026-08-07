import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useDevicePerformance } from '../hooks/useDevicePerformance';

interface SplashProps {
  onMorphStart: () => void;
  onComplete: () => void;
}

export const Splash: React.FC<SplashProps> = React.memo(({ onMorphStart, onComplete }) => {
  const { isLowEnd } = useDevicePerformance();

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) {
      onMorphStart();
      gsap.to('#splash-overlay', {
        opacity: 0,
        duration: 0.3,
        onComplete: onComplete
      });
      return;
    }

    // Responsive width calculations for GSAP animations
    const width = window.innerWidth;
    const isDesktop = width >= 1024;
    const isTablet = width >= 768 && width < 1024;

    // Calculate dynamic "IJAY" expansion width
    let textWidth = 220; // Desktop default (>=1024px)
    if (isDesktop) {
      textWidth = 220;
    } else if (isTablet) {
      textWidth = 180;
    } else {
      const ijaySpan = document.getElementById('splash-ijay-span');
      if (ijaySpan && ijaySpan.scrollWidth > 0) {
        textWidth = Math.ceil(ijaySpan.scrollWidth) + 4;
      } else {
        textWidth = width < 360 ? 110 : width < 400 ? 125 : 140;
      }
    }

    // Calculate orange divider line width:
    // Desktop: exactly 300px
    // Tablet: proportionally scaled ~240px
    // Mobile: 70-80% (~75%) of title width
    let targetLineWidth = 300;
    if (isDesktop) {
      targetLineWidth = 300;
    } else if (isTablet) {
      targetLineWidth = 240;
    } else {
      const titleEl = document.getElementById('splash-brand-title');
      const titleWidth = titleEl && titleEl.offsetWidth > 0 ? titleEl.offsetWidth : (width < 360 ? 150 : 180);
      targetLineWidth = Math.max(90, Math.round(titleWidth * 0.75));
    }

    const tl = gsap.timeline({
      onComplete: onComplete
    });

    // Set initial values
    tl.set('#splash-v', { opacity: 0 });
    tl.set('#splash-text', { width: 0, opacity: 0 });
    tl.set('#splash-tagline', { opacity: 0, y: 10 });
    tl.set('#splash-line', { opacity: 0, width: 0 });

    // Scene 01: Letter "V" fade in (0.25s)
    tl.to('#splash-v', { opacity: 1, duration: 0.25, ease: 'power2.out' });

    // Scene 02: Letter "V" glow rim
    tl.to('#splash-v', {
      filter: 'drop-shadow(0 0 12px rgba(255, 122, 0, 0.6))',
      duration: 0.2,
      ease: 'power2.inOut'
    }, '-=0.1');

    // Scene 03: "IJAY" unfolds horizontally (0.35s)
    tl.to('#splash-text', {
      width: textWidth,
      opacity: 1,
      duration: 0.35,
      ease: 'power3.inOut'
    });

    // Scene 04: Subtitle reveal
    tl.to('#splash-tagline', { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, '-=0.2');

    // Scene 05: Centered orange accent line
    tl.to('#splash-line', {
      opacity: 1,
      width: targetLineWidth,
      duration: 0.3,
      ease: 'power3.out'
    }, '-=0.15');

    // Short hold (0.15s)
    tl.to({}, { duration: 0.15 });

    // Scene 06: Overlay smooth curtain fade (0.4s)
    tl.to('#splash-overlay', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onStart: onMorphStart
    });

    return () => {
      tl.kill();
    };
  }, [onMorphStart, onComplete]);

  return (
    <div
      id="splash-overlay"
      className="fixed inset-0 z-[999999] min-h-[100dvh] w-full bg-[#090909] select-none overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6"
    >
      {/* Subtle vignette layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      {/* Noise background texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Subtle ambient orange glow behind logo */}
      {!isLowEnd && (
        <div
          id="splash-glow"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-accent/10 blur-[60px] sm:blur-[80px] md:blur-[100px] pointer-events-none transform-gpu"
        />
      )}

      {/* Center Reveal Composition */}
      <div className="relative z-10 flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6 max-w-full transform-gpu">
        {/* Brand Name Composition */}
        <div
          id="splash-brand-title"
          className="flex items-center justify-center h-14 sm:h-16 md:h-24 font-heading text-[clamp(1.75rem,6.5vw,2.5rem)] md:text-5xl font-black tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.25em] pl-[0.18em] sm:pl-[0.22em] md:pl-[0.25em]"
        >
          <span id="splash-v" className="text-[#FF7A00] transform-gpu inline-block">
            V
          </span>
          <div
            id="splash-text"
            className="overflow-hidden flex items-center transform-gpu"
          >
            <span id="splash-ijay-span" className="text-white whitespace-nowrap inline-block">
              IJAY
            </span>
          </div>
        </div>

        {/* Center line under logo */}
        <div
          id="splash-line"
          className="h-[1.5px] bg-[#FF7A00] transform-gpu"
          style={{ willChange: 'width, opacity' }}
        />

        {/* Subtitle taglines - responsive non-clipped wrapping */}
        <div
          id="splash-tagline"
          className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-2.5 gap-y-1 px-3 text-center font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.2em] text-neutral-400 uppercase max-w-[90vw] sm:max-w-md md:max-w-none transform-gpu"
        >
          <span className="whitespace-nowrap">AI Developer</span>
          <span className="text-[#FF7A00]/70 select-none">•</span>
          <span className="whitespace-nowrap">Java Developer</span>
          <span className="text-[#FF7A00]/70 select-none">•</span>
          <span className="whitespace-nowrap">ECE Undergraduate</span>
        </div>
      </div>
    </div>
  );
});

Splash.displayName = 'Splash';
