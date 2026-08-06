import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TechItem {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  desc: string;
  tags: string[];
}

const TECH_CARDS: TechItem[] = [
  {
    id: 'java',
    index: '01',
    name: 'JAVA',
    subtitle: 'Backend & Object-Oriented Engineering',
    desc: 'Robust multi-threaded backend architecture, data structures, algorithms, and modular object-oriented system design.',
    tags: ['Backend', 'DSA', 'OOP', 'Core Systems']
  },
  {
    id: 'python',
    index: '02',
    name: 'PYTHON',
    subtitle: 'AI & Data Science Toolchains',
    desc: 'Machine learning workflows, data processing pipelines, automation scripting, and Foundation Certification.',
    tags: ['AI', 'Data Processing', 'Automation', 'Scripting']
  },
  {
    id: 'git',
    index: '03',
    name: 'GIT',
    subtitle: 'Distributed Version Control',
    desc: 'Branching strategies, repository management, source history control, and release tagging.',
    tags: ['Version Control', 'DevOps', 'CLI', 'Code Management']
  },
  {
    id: 'github',
    index: '04',
    name: 'GITHUB',
    subtitle: 'Developer Collaboration & CI/CD',
    desc: 'Cloud repository hosting, automated build workflows, pull request reviews, and open-source project management.',
    tags: ['Repositories', 'CI/CD', 'Open Source', 'Collaboration']
  },
  {
    id: 'vscode',
    index: '05',
    name: 'VS CODE',
    subtitle: 'Integrated Development Environment',
    desc: 'Customized editor environment with multi-language debugging, extension toolchains, and AI assistant pairing.',
    tags: ['IDE', 'Tooling', 'Debugging', 'Editor']
  },
  {
    id: 'figma',
    index: '06',
    name: 'FIGMA',
    subtitle: 'UI/UX Design & Prototyping',
    desc: 'Vector interface graphics, layout wireframing, design systems, and interactive UI prototyping.',
    tags: ['UI/UX', 'Design', 'Prototypes', 'Vector']
  },
  {
    id: 'arduino',
    index: '07',
    name: 'ARDUINO',
    subtitle: 'Embedded Microcontrollers & Hardware',
    desc: 'Infrared sensor arrays, PWM motor drivers, closed-loop feedback robotics, and hardware interfacing.',
    tags: ['Robotics', 'PWM', 'Hardware', 'Sensors']
  },
  {
    id: 'matlab',
    index: '08',
    name: 'MATLAB',
    subtitle: 'Signal Processing & Math Modeling',
    desc: 'Matrix computation, telecommunication signal analysis, circuit simulation, and numerical modeling.',
    tags: ['Signal Processing', 'Simulations', 'Math', 'Telecom']
  },
  {
    id: 'chatgpt',
    index: '09',
    name: 'CHATGPT',
    subtitle: 'Generative AI & Rapid Productivity',
    desc: 'Advanced prompt engineering, technical documentation drafting, and diagnostic problem solving.',
    tags: ['GenAI', 'Productivity', 'Prompts', 'LLM']
  },
  {
    id: 'claude',
    index: '10',
    name: 'CLAUDE AI',
    subtitle: 'Reasoning & System Architecture',
    desc: 'Architectural reasoning, complex code synthesis, and deep analytical prompt engineering.',
    tags: ['AI Pairing', 'LLM', 'Reasoning', 'Architecture']
  },
  {
    id: 'antigravity',
    index: '11',
    name: 'ANTIGRAVITY',
    subtitle: 'Autonomous AI Pairing & Toolchains',
    desc: 'Agentic AI coding workflows, automated refactoring, and autonomous developer pairing toolchains.',
    tags: ['Agentic AI', 'Developer Tooling', 'Automation', 'AI Pairing']
  }
];

export const Skills: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP & TABLET: Pinned horizontal scrolling showcase
      mm.add("(min-width: 768px)", () => {
        if (!trackRef.current || !sectionRef.current) return;

        const track = trackRef.current;
        const section = sectionRef.current;

        // Cached distance measurement to avoid forced reflows during scroll
        let scrollDistance = 0;

        const updateDistance = () => {
          scrollDistance = Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
          return scrollDistance;
        };

        // Pre-calculate once before ScrollTrigger builds
        updateDistance();

        // Single ScrollTrigger for pinning and 3D hardware-accelerated horizontal translation
        gsap.to(track, {
          x: () => -scrollDistance,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.5,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: 1,
            onRefreshInit: () => {
              updateDistance();
            }
          }
        });
      });

      // MOBILE: Vertical stacked card animation fallback
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>('.skill-horizontal-card');

        cards.forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      });
    }, sectionRef);

    // ResizeObserver ensures ScrollTrigger refreshes accurately when fonts or layout update
    let resizeObserver: ResizeObserver | null = null;
    if (trackRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(trackRef.current);
    }

    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleRefresh);
    if ('fonts' in document) {
      document.fonts.ready.then(handleRefresh);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('load', handleRefresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full h-auto md:h-screen bg-[#090909] text-white select-none overflow-hidden border-t border-borderCustom"
    >
      <div className="w-full h-full md:h-screen flex items-center">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:items-center w-full md:w-max gap-8 md:gap-12 lg:gap-14 pl-6 sm:pl-10 md:pl-16 lg:pl-[120px] xl:pl-[160px] pr-6 sm:pr-10 md:pr-16 lg:pr-[160px] xl:pr-[220px] py-12 md:py-0 transform-gpu"
          style={{ willChange: 'transform' }}
        >
          {/* Spacious Left Editorial Panel */}
          <div className="shrink-0 w-full md:w-[440px] lg:w-[500px] flex flex-col justify-center space-y-6 pr-0 md:pr-8 lg:pr-12">
            <div className="flex items-center space-x-3">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] font-heading">
                TECH SHOWCASE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-heading leading-[1.08] whitespace-normal break-words">
              TECH STACK &amp; TOOLCHAINS
            </h2>
            <p className="text-neutral-400 font-body text-sm md:text-base leading-relaxed max-w-md">
              An editorial showcase of programming languages, AI models, hardware platforms, and engineering toolchains.
            </p>
            <div className="flex items-center space-x-2 text-accent text-xs font-bold uppercase tracking-wider pt-2 font-mono">
              <span>Scroll horizontally</span>
              <span>&rarr;</span>
            </div>
          </div>

          {/* Technology Cards Track */}
          {TECH_CARDS.map((item) => (
            <div
              key={item.id}
              className="skill-horizontal-card shrink-0 w-full sm:w-[380px] md:w-[420px] min-h-[480px] md:min-h-[520px] p-7 md:p-9 rounded-[24px] bg-[#141414] border border-white/[0.08] hover:border-accent/40 hover:-translate-y-2 transition-transform duration-300 group relative flex flex-col justify-between overflow-hidden transform-gpu bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,0,0.06),transparent_70%)]"
            >
              {/* Top subtle accent sweep on hover */}
              <span className="absolute top-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-500 ease-out" />

              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-extralight text-3xl md:text-4xl text-accent/80 font-heading">
                    {item.index}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-400">
                    {item.tags[0]}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl sm:text-3xl md:text-3xl font-black tracking-tight text-white uppercase font-heading group-hover:text-accent transition-colors duration-300 mb-2 break-words">
                  {item.name}
                </h3>
                <p className="text-xs md:text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 font-heading">
                  {item.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm md:text-base text-neutral-300 font-body leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              {/* Footer Tags */}
              <div className="pt-6 border-t border-white/[0.08]">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/[0.04] border border-white/10 text-neutral-400 group-hover:text-neutral-200 transition-colors font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';
