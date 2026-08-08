import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowDown, Cpu, Code2, Sparkles } from 'lucide-react';
import { useDevicePerformance } from '../hooks/useDevicePerformance';

export const Hero: React.FC = React.memo(() => {
  const { isLowEnd } = useDevicePerformance();
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const titles = PORTFOLIO_DATA.personal.titles;
  const period = 1500;
  const delta = 100;

  const tick = useCallback(() => {
    const i = titleIdx % titles.length;
    const fullText = titles[i];
    const updatedText = isDeleting
      ? fullText.substring(0, displayText.length - 1)
      : fullText.substring(0, displayText.length + 1);

    setDisplayText(updatedText);

    if (!isDeleting && updatedText === fullText) {
      setTimeout(() => setIsDeleting(true), period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setTitleIdx((prev) => prev + 1);
    }
  }, [titleIdx, titles, isDeleting, displayText, period]);

  // Typing Effect
  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [tick, delta]);

  // Parallax Tilt Effect
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLowEnd || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      style={{
        paddingTop: 'max(5.5rem, calc(4.5rem + env(safe-area-inset-top, 0px)))',
        paddingBottom: 'max(2rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)))',
      }}
      className="relative min-h-[100svh] lg:min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 right-1/4 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full bg-accent/5 blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[240px] sm:w-[350px] h-[240px] sm:h-[350px] rounded-full bg-orange-600/5 blur-[80px] sm:blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center w-full relative z-10 py-4 sm:py-8 lg:py-12">
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col space-y-5 sm:space-y-6 md:space-y-8 text-left">
          {/* Welcome Tag */}
          <div className="flex items-center space-x-3">
            <span className="h-[1px] w-6 sm:w-8 bg-accent" />
            <span className="text-accent text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Welcome to my space
            </span>
          </div>

          {/* Core Name Title */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h1 className="font-extrabold tracking-tight text-white leading-[1.1] sm:leading-tight">
              <span className="block text-[clamp(1.125rem,3.2vw,1.75rem)] font-medium text-neutral-300 mb-1 sm:mb-1.5">
                Hi, I'm
              </span>
              <span className="block text-[clamp(2.1rem,6.8vw,4.5rem)] text-gradient font-heading tracking-tight">
                <span className="inline-block mr-2 sm:mr-3">VIJAY</span>
                <span className="inline-block whitespace-nowrap">VARMA V</span>
              </span>
            </h1>

            {/* Dynamic Typing Title */}
            <div className="h-10 sm:h-12 md:h-16 lg:h-20 flex items-center">
              <span className="text-[clamp(1.25rem,4.2vw,2.5rem)] md:text-4xl lg:text-5xl font-bold font-heading text-gradient-accent">
                {displayText}
                <span className="animate-pulse ml-1 text-accent">|</span>
              </span>
            </div>
          </div>

          {/* Description Tagline */}
          <p className="text-secondary text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
            {PORTFOLIO_DATA.personal.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 bg-accent text-black font-semibold rounded-lg hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-accent/20 text-sm tracking-wide text-center flex items-center justify-center"
            >
              Projects
            </a>
            <a
              href={PORTFOLIO_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 glass-card text-white font-semibold rounded-lg hover:border-accent/40 hover:text-accent hover:-translate-y-1 transition-all duration-300 text-sm tracking-wide text-center flex items-center justify-center"
            >
              GitHub
            </a>
            <a
              href="#contact"
              className="w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 glass-card text-white font-semibold rounded-lg hover:border-accent/40 hover:text-accent hover:-translate-y-1 transition-all duration-300 text-sm tracking-wide text-center flex items-center justify-center"
            >
              Contact
            </a>
          </div>

          {/* Technical Scope Badges */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 sm:pt-8 text-neutral-400 text-xs sm:text-sm border-t border-borderCustom max-w-lg">
            <div className="flex items-center space-x-2">
              <Code2 size={16} className="text-accent shrink-0" />
              <span>Java</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles size={16} className="text-accent shrink-0" />
              <span>Artificial Intelligence</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cpu size={16} className="text-accent shrink-0" />
              <span>Embedded Robotics</span>
            </div>
          </div>
        </div>

        {/* Right Side Composition - Portrait */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isLowEnd ? 'none' : `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(0)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="relative w-full max-w-[280px] h-[340px] sm:max-w-[340px] sm:h-[410px] md:max-w-[360px] md:h-[430px] lg:w-[380px] lg:h-[450px] rounded-2xl glass-card p-3 sm:p-4 flex items-center justify-center cursor-pointer group transform-gpu mx-auto lg:mx-0"
          >
            <div className="absolute inset-2 border border-dashed border-neutral-800 rounded-xl pointer-events-none" />
            {!isLowEnd && (
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-accent/0 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            )}

            {!isLowEnd && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 bg-accent/20 blur-[50px] sm:blur-[60px] rounded-full pointer-events-none" />
            )}

            {/* Portrait frame */}
            <div className="w-full h-full rounded-xl overflow-hidden relative bg-neutral-900 border border-borderCustom shadow-2xl flex items-center justify-center">
              <img
                src="/hero-portrait.png"
                alt="Vijay Varma V Portrait"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 glass-panel px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-borderCustom flex items-center justify-between">
                <div>
                  <p className="text-[9px] sm:text-[10px] text-accent font-semibold tracking-widest uppercase">
                    Major Focus
                  </p>
                  <p className="text-[11px] sm:text-xs font-semibold text-white">AI ENGINEERING</p>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Cpu size={14} className="sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down arrow link / scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 pointer-events-none">
        <span className="text-[10px] text-secondary tracking-widest uppercase">Scroll Down</span>
        <ArrowDown size={14} className="text-accent animate-bounce" />
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
