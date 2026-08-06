import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, ArrowDown } from 'lucide-react';

export const About: React.FC = React.memo(() => {
  const personal = PORTFOLIO_DATA.personal;
  const journey = PORTFOLIO_DATA.journeyTimeline;

  const sectionRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scrubbed vertical line progress fill
      if (lineProgressRef.current && sectionRef.current) {
        gsap.to(lineProgressRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.journey-timeline-container',
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          }
        });
      }

      // Staggered node reveals
      const nodes = gsap.utils.toArray<HTMLElement>('.timeline-node-item');
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-borderCustom bg-[#090909] text-white select-none relative">
      {/* Top Header & Intro Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
        {/* Left Side: Story & Narrative */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center space-x-3">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase font-heading">
              ABOUT &amp; PHILOSOPHY
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight font-heading uppercase">
            Engineering software <br />
            with <span className="text-gradient-accent">intelligence</span> &amp; purpose.
          </h2>

          <div className="text-neutral-300 text-base md:text-lg space-y-6 leading-relaxed font-body">
            {personal.aboutStory.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>

          {/* Education Spotlight Card */}
          <div className="glass-card p-6 rounded-2xl border border-borderCustom flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-1">
              <GraduationCap size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-heading">{personal.degree}</h4>
              <p className="text-sm text-neutral-400 mt-1 font-body">{personal.college}, Karur</p>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 border border-accent/20 text-accent font-mono">
                Academic Score: CGPA {personal.cgpa}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Stats & Core Focus */}
        <div className="lg:col-span-5 space-y-8">
          {/* Numbers Grid */}
          <div className="grid grid-cols-2 gap-4">
            {personal.stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-borderCustom flex flex-col justify-between h-40 hover:border-accent/40 transition-all duration-300 group"
              >
                <span className="text-3xl md:text-4xl font-black text-white tracking-tight font-heading group-hover:text-accent transition-colors">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-heading">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Core Focus Areas */}
          <div className="glass-panel p-8 rounded-2xl space-y-6 border border-borderCustom">
            <h3 className="text-lg font-bold text-white tracking-wide font-heading uppercase">Engineering Focus</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-borderCustom pb-3">
                <span className="text-sm text-neutral-300 font-body">Artificial Intelligence</span>
                <span className="text-xs text-accent font-mono">Agentic Architecture</span>
              </div>
              <div className="flex items-center justify-between border-b border-borderCustom pb-3">
                <span className="text-sm text-neutral-300 font-body">Java Systems Development</span>
                <span className="text-xs text-accent font-mono">Core OOP &amp; APIs</span>
              </div>
              <div className="flex items-center justify-between border-b border-borderCustom pb-3">
                <span className="text-sm text-neutral-300 font-body">Embedded Robotics</span>
                <span className="text-xs text-accent font-mono">Arduino &amp; Sensors</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300 font-body">Telecommunications</span>
                <span className="text-xs text-accent font-mono">Signal &amp; Switching</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Vertical Storytelling Timeline */}
      <div className="pt-16 border-t border-white/[0.08]">
        <div className="mb-20 flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center space-x-3">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase font-heading">
              EVOLUTION &amp; MILESTONES
            </span>
            <span className="h-[1px] w-8 bg-accent" />
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight font-heading">
            MY JOURNEY
          </h3>
          <p className="text-neutral-400 text-base font-body leading-relaxed">
            An interactive timeline tracing academic foundations, national sports achievement, robotics competitions, and AI development milestones.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="journey-timeline-container relative max-w-5xl mx-auto">
          {/* Vertical Connecting Line Track */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-white/10 pointer-events-none">
            {/* Foreground Progress Line (Scrubbed by GSAP) */}
            <div
              ref={lineProgressRef}
              className="w-full h-full bg-accent origin-top scale-y-0 shadow-[0_0_12px_rgba(255,122,0,0.8)]"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-16 md:space-y-24 relative">
            {journey.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className="timeline-node-item relative flex flex-col md:flex-row items-start md:items-center w-full group"
                >
                  {/* Circular Node Indicator */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 w-5 h-5 rounded-full bg-black border-2 border-accent shadow-[0_0_15px_rgba(255,122,0,0.6)] group-hover:scale-125 transition-transform duration-300" />

                  {/* Left Side: Desktop Large Year (Even items on Desktop left) */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:order-2 md:pl-16 md:text-left'}`}>
                    <span className="text-4xl md:text-6xl font-extralight text-accent font-heading tracking-tight block">
                      {item.year}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 font-heading block mt-1">
                      {item.institution || item.badge}
                    </span>
                  </div>

                  {/* Right Side: Content Box (Odd items on Desktop right) */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 mt-4 md:mt-0 ${isEven ? 'md:order-2 md:pl-16' : 'md:pr-16'}`}>
                    <div className="glass-card p-6 md:p-8 rounded-2xl border border-borderCustom hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 relative group-hover:shadow-[0_10px_30px_-10px_rgba(255,122,0,0.15)]">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <h4 className="text-xl md:text-2xl font-bold text-white font-heading group-hover:text-accent transition-colors">
                          {item.title}
                        </h4>
                        {item.badge && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-accent/10 border border-accent/20 text-accent font-mono">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-sm md:text-base text-neutral-300 font-body leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ending Section Transition */}
        <div className="mt-24 pt-12 flex flex-col items-center text-center space-y-4 max-w-xl mx-auto">
          <p className="text-neutral-400 text-sm md:text-base font-body leading-relaxed">
            The journey continues. Explore the engineered software systems, autonomous robotics, and AI architectures I've built.
          </p>
          <a
            href="#projects"
            className="inline-flex items-center space-x-2 text-accent text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors pt-2 font-heading"
          >
            <span>Explore Projects</span>
            <ArrowDown size={14} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
