import React, { useState, useEffect, useRef } from 'react';
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

  // Typing Effect
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [displayText, isDeleting]);

  const tick = () => {
    let i = titleIdx % titles.length;
    let fullText = titles[i];
    let updatedText = isDeleting
      ? fullText.substring(0, displayText.length - 1)
      : fullText.substring(0, displayText.length + 1);

    setDisplayText(updatedText);

    if (!isDeleting && updatedText === fullText) {
      setTimeout(() => setIsDeleting(true), period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setTitleIdx((prev) => prev + 1);
    }
  };

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
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden px-6 md:px-12 max-w-7xl mx-auto">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-orange-600/5 blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10 py-12">
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
          {/* Welcome Tag */}
          <div className="flex items-center space-x-3">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              Welcome to my space
            </span>
          </div>

          {/* Core Name Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <br />
              <span className="text-gradient">VIJAY VARMA V</span>
            </h1>

            {/* Dynamic Typing Title */}
            <div className="h-14 md:h-20 flex items-center">
              <span className="text-3xl md:text-5xl font-bold font-heading text-gradient-accent">
                {displayText}
                <span className="animate-pulse ml-1 text-accent">|</span>
              </span>
            </div>
          </div>

          {/* Description Tagline */}
          <p className="text-secondary text-base md:text-lg max-w-lg leading-relaxed">
            {PORTFOLIO_DATA.personal.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-7 py-3.5 bg-accent text-black font-semibold rounded-lg hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-accent/20 text-sm tracking-wide"
            >
              Projects
            </a>
            <a
              href={PORTFOLIO_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 glass-card text-white font-semibold rounded-lg hover:border-accent/40 hover:text-accent hover:-translate-y-1 transition-all duration-300 text-sm tracking-wide"
            >
              GitHub
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 glass-card text-white font-semibold rounded-lg hover:border-accent/40 hover:text-accent hover:-translate-y-1 transition-all duration-300 text-sm tracking-wide"
            >
              Contact
            </a>
          </div>

          {/* Technical Scope Badges */}
          <div className="flex items-center space-x-6 pt-8 text-neutral-400 text-sm border-t border-borderCustom max-w-lg">
            <div className="flex items-center space-x-2">
              <Code2 size={16} className="text-accent" />
              <span>Java</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles size={16} className="text-accent" />
              <span>Artificial Intelligence</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cpu size={16} className="text-accent" />
              <span>Embedded Robotics</span>
            </div>
          </div>
        </div>

        {/* Right Side Composition - Portrait */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isLowEnd ? 'none' : `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(0)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="relative w-80 h-96 md:w-[380px] md:h-[450px] rounded-2xl glass-card p-4 flex items-center justify-center cursor-pointer group transform-gpu"
          >
            <div className="absolute inset-2 border border-dashed border-neutral-800 rounded-xl pointer-events-none" />
            {!isLowEnd && (
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-accent/0 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            )}

            {!isLowEnd && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/20 blur-[60px] rounded-full pointer-events-none" />
            )}

            {/* Portrait frame */}
            <div className="w-full h-full rounded-xl overflow-hidden relative bg-neutral-900 border border-borderCustom shadow-2xl flex items-center justify-center">
              <img
                src="/hero-portrait.png"
                alt="Vijay Varma V Portrait"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />

              <div className="absolute bottom-4 left-4 right-4 glass-panel px-4 py-3 rounded-lg border border-borderCustom flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-accent font-semibold tracking-widest uppercase">
                    Major Focus
                  </p>
                  <p className="text-xs font-semibold text-white">AI ENGINEERING</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Cpu size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down arrow link / scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 pointer-events-none">
        <span className="text-[10px] text-secondary tracking-widest uppercase">Scroll Down</span>
        <ArrowDown size={14} className="text-accent animate-bounce" />
      </div>
    </section>
  );
});
