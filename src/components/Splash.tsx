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
      width: window.innerWidth < 768 ? 160 : 220,
      opacity: 1,
      duration: 0.35,
      ease: 'power3.inOut'
    });

    // Scene 04: Subtitle reveal
    tl.to('#splash-tagline', { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, '-=0.2');

    // Scene 05: Centered orange accent line
    tl.to('#splash-line', {
      opacity: 1,
      width: window.innerWidth < 768 ? 220 : 300,
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

  }, [onMorphStart, onComplete]);

  return (
    <div
      id="splash-overlay"
      className="fixed inset-0 z-[999999] bg-[#090909] select-none overflow-hidden"
    >
      {/* Subtle vignette layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      {/* Noise background texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Subtle ambient orange glow behind logo */}
      {!isLowEnd && (
        <div
          id="splash-glow"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-accent/10 blur-[100px] pointer-events-none transform-gpu"
        />
      )}

      {/* Center Reveal Composition */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-6 transform-gpu">
        {/* Brand Name Composition */}
        <div className="flex items-center justify-center h-24 font-heading text-4xl md:text-5xl font-black tracking-[0.25em] pl-[0.25em]">
          <span id="splash-v" className="text-[#FF7A00] transform-gpu">
            V
          </span>
          <div
            id="splash-text"
            className="overflow-hidden flex items-center transform-gpu"
          >
            <span className="text-white">
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

        {/* Subtitle taglines */}
        <div className="overflow-hidden h-8 flex items-center justify-center">
          <p
            id="splash-tagline"
            className="text-xs md:text-sm font-mono tracking-[0.2em] text-neutral-400 uppercase transform-gpu"
          >
            AI Developer &nbsp;•&nbsp; Java Developer &nbsp;•&nbsp; ECE Undergraduate
          </p>
        </div>
      </div>
    </div>
  );
});

Splash.displayName = 'Splash';
