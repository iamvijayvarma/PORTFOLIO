import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Code2 } from 'lucide-react';

interface TechItem {
  id: string;
  index: string;
  category: string;
  name: string;
  subtitle: string;
  desc: string;
  tags: string[];
}

const TECH_CARDS: TechItem[] = [
  {
    id: 'java',
    index: '01',
    category: 'BACKEND',
    name: 'JAVA',
    subtitle: 'Core Architecture & Algorithms',
    desc: 'Robust multi-threaded backend engineering, high-performance data structures, object-oriented system design, and algorithmic problem solving.',
    tags: ['Backend', 'DSA', 'OOP', 'Concurrency'],
  },
  {
    id: 'python',
    index: '02',
    category: 'AI & DATA',
    name: 'PYTHON',
    subtitle: 'Data Science & Automation',
    desc: 'Machine learning workflows, data analysis pipelines, automation scripting, and Foundation Certified software engineering.',
    tags: ['AI', 'Data Science', 'Automation', 'Scripting'],
  },
  {
    id: 'javascript',
    index: '03',
    category: 'FRONTEND',
    name: 'JAVASCRIPT',
    subtitle: 'Interactive Modern Web Systems',
    desc: 'Modern ESNext architectures, TypeScript integration, asynchronous event-driven programming, and performant React applications.',
    tags: ['Frontend', 'TypeScript', 'React', 'ESNext'],
  },
  {
    id: 'c',
    index: '04',
    category: 'SYSTEMS',
    name: 'C LANGUAGE',
    subtitle: 'Low-Level Memory & Hardware',
    desc: 'Direct pointer arithmetic, hardware memory management, structured algorithm design, and micro-controller system implementations.',
    tags: ['Systems', 'Pointers', 'Memory', 'Algorithms'],
  },
  {
    id: 'git',
    index: '05',
    category: 'DEVOPS',
    name: 'GIT',
    subtitle: 'Distributed Source Control',
    desc: 'Atomic commit workflows, interactive rebasing, branch management strategies, and secure distributed source tracking.',
    tags: ['Version Control', 'DevOps', 'CLI', 'Branching'],
  },
  {
    id: 'github',
    index: '06',
    category: 'COLLABORATION',
    name: 'GITHUB',
    subtitle: 'CI/CD & Cloud Repositories',
    desc: 'Cloud repository hosting, automated GitHub Actions workflows, pull request reviews, and open-source project orchestration.',
    tags: ['Repositories', 'CI/CD', 'Open Source', 'Collaboration'],
  },
  {
    id: 'vscode',
    index: '07',
    category: 'TOOLING',
    name: 'VS CODE',
    subtitle: 'Integrated Developer Environment',
    desc: 'Customized editor environments with multi-language LSP, interactive step debugging, terminal integration, and AI paired toolchains.',
    tags: ['IDE', 'Tooling', 'LSP', 'Debugging'],
  },
  {
    id: 'figma',
    index: '08',
    category: 'UI/UX DESIGN',
    name: 'FIGMA',
    subtitle: 'Design Systems & Prototyping',
    desc: 'High-fidelity glassmorphic UI design, design token architectures, interactive component prototyping, and user experience flows.',
    tags: ['UI/UX', 'Design Systems', 'Prototypes', 'Vector'],
  },
  {
    id: 'chatgpt',
    index: '09',
    category: 'AI WORKFLOW',
    name: 'CHATGPT',
    subtitle: 'Generative AI & Rapid Tooling',
    desc: 'Advanced prompt engineering, architecture syntheses, technical documentation generation, and rapid diagnostic workflows.',
    tags: ['GenAI', 'Productivity', 'Prompting', 'LLM'],
  },
  {
    id: 'claude',
    index: '10',
    category: 'AI REASONING',
    name: 'CLAUDE AI',
    subtitle: 'Deep Reasoning & Architecture',
    desc: 'Deep multi-file system analysis, algorithmic logic refinement, complex debugging, and automated code review synthesis.',
    tags: ['AI Pairing', 'Reasoning', 'Architecture', 'Logic'],
  },
  {
    id: 'antigravity',
    index: '11',
    category: 'AGENTIC CODING',
    name: 'ANTIGRAVITY',
    subtitle: 'Autonomous AI Pairing',
    desc: 'Advanced agentic AI pairing workflows, autonomous codebase refactoring, terminal test verification, and automated deployment pipelines.',
    tags: ['Agentic AI', 'Pair Programming', 'Automation', 'DevTools'],
  },
];

export const Skills: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP & TABLET (>= 768px): Pinned Horizontal Scrolling Showcase
      mm.add('(min-width: 768px)', () => {
        const getScrollDistance = () => {
          const trackWidth = track.scrollWidth;
          const viewportWidth = window.innerWidth;
          return Math.max(0, trackWidth - viewportWidth + 120);
        };

        gsap.set(track, {
          x: 0,
          force3D: true,
        });

        const dist = getScrollDistance();

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top top',
            end: () => `+=${Math.max(2200, dist * 1.08)}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
        });

        return () => {
          tween.kill();
        };
      });

      // MOBILE (< 768px): Clean Vertical Stacked Layout with entrance animation
      mm.add('(max-width: 767px)', () => {
        gsap.set(track, { clearProps: 'all' });
        const cards = gsap.utils.toArray<HTMLElement>('.skill-horizontal-card');

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });
    }, sectionRef);

    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleRefresh);

    return () => {
      window.removeEventListener('load', handleRefresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full min-h-screen md:h-screen bg-[#070707] text-white select-none overflow-hidden border-t border-white/[0.06] flex items-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_25%,rgba(255,122,0,0.05)_0%,transparent_50%)]" />

      <div className="w-full h-full md:h-screen flex items-center">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:items-center w-full md:w-max gap-10 md:gap-14 lg:gap-16 xl:gap-20 pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-20 pr-6 sm:pr-10 md:pr-16 lg:pr-24 py-12 md:py-0 will-change-transform"
          style={{
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          {/* Left Editorial Fixed Showcase Panel */}
          <div className="shrink-0 w-full md:w-[460px] lg:w-[520px] xl:w-[560px] flex flex-col justify-center space-y-6 pr-4 md:pr-8 lg:pr-12 overflow-hidden">
            <div className="flex items-center space-x-3">
              <span className="h-[1.5px] w-8 bg-[#FF7A00]" />
              <span className="text-[#FF7A00] text-xs font-bold uppercase tracking-[0.28em] font-mono">
                TECH SHOWCASE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black uppercase tracking-tight text-white font-heading leading-[1.04] max-w-full">
              TECH STACK <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FF9E40] to-white">
                &amp; TOOLCHAIN
              </span>
            </h2>

            <p className="text-neutral-400 font-body text-sm md:text-base leading-relaxed max-w-sm">
              An editorial showcase of core programming languages, distributed backend systems, AI architectures, and developer pairing toolchains.
            </p>

            <div className="flex items-center space-x-3 text-neutral-400 text-xs font-mono pt-2">
              <div className="flex items-center space-x-2 text-[#FF7A00]">
                <Sparkles size={14} />
              </div>
              <ArrowRight size={14} className="text-[#FF7A00] animate-pulse" />
            </div>
          </div>

          {/* Horizontal Technology Cards Track */}
          {TECH_CARDS.map((card) => (
            <div
              key={card.id}
              className="skill-horizontal-card shrink-0 w-full sm:w-[380px] md:w-[400px] lg:w-[440px] min-h-[460px] md:h-[500px] p-7 md:p-9 rounded-[28px] bg-[#121212] border border-white/[0.08] hover:border-[#FF7A00]/40 transition-all duration-300 group relative flex flex-col justify-between overflow-hidden shadow-2xl bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,0,0.06),transparent_70%)]"
            >
              {/* Top Accent Highlight Line on Hover */}
              <span className="absolute top-0 left-0 w-0 h-[2px] bg-[#FF7A00] group-hover:w-full transition-all duration-500 ease-out" />

              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-extralight text-3xl md:text-4xl text-[#FF7A00] font-heading">
                    {card.index}
                  </span>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 group-hover:border-[#FF7A00]/30 transition-colors">
                    {card.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="flex items-center space-x-3 mb-2">
                  <Code2 size={20} className="text-[#FF7A00] shrink-0" />
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase font-heading group-hover:text-[#FF7A00] transition-colors duration-300">
                    {card.name}
                  </h3>
                </div>

                <p className="text-xs md:text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 font-heading">
                  {card.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm md:text-base text-neutral-300 font-body leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Footer Tags */}
              <div className="pt-6 border-t border-white/[0.08] mt-6">
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] font-mono font-medium uppercase tracking-wider bg-white/[0.04] border border-white/10 text-neutral-400 group-hover:text-white group-hover:border-white/20 transition-colors"
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
