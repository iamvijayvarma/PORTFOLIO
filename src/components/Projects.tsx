import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export const Projects: React.FC = React.memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-borderCustom">
      <div className="flex flex-col space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              Showcase
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-none">
            Featured Projects
          </h2>
          <p className="text-secondary text-sm md:text-base max-w-xl">
            A typographic showcase of autonomous systems, embedded robotics, and AI agentic software architecture.
          </p>
        </div>

        {/* Clean Typographic Project Grid (Image-Free Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.projects.map((project, idx) => {
            const projectNumber = String(idx + 1).padStart(2, '0');
            const projectCategory = project.id === 'line-follower-robot' 
              ? 'Embedded Systems • Robotics' 
              : 'Artificial Intelligence • Core Software';

            return (
              <div
                key={project.id}
                className="glass-card rounded-2xl border border-borderCustom hover:border-accent/40 bg-[#151515]/70 hover:bg-[#151515]/90 p-8 md:p-10 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_10px_30px_rgba(255,122,0,0.06)] relative overflow-hidden"
              >
                {/* Large index background number */}
                <div className="absolute top-6 right-8 text-7xl md:text-8xl font-black text-neutral-800/30 select-none font-mono group-hover:scale-105 group-hover:text-accent/15 transition-all duration-300 transform-gpu origin-top-right">
                  {projectNumber}
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Category & Status Row */}
                  <div className="flex items-center justify-between border-b border-borderCustom pb-4">
                    <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-accent uppercase">
                      {projectCategory}
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider font-bold text-neutral-400 bg-neutral-900/60 rounded border border-borderCustom">
                      Active Specs
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-secondary leading-relaxed max-w-[85%]">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Features Bullet List */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
                      Key Highlights
                    </h4>
                    <div className="space-y-1.5">
                      {project.highlights.slice(0, 3).map((hl, hlIdx) => (
                        <div key={hlIdx} className="flex items-start space-x-2 text-xs text-neutral-400">
                          <span className="text-accent shrink-0 font-bold">•</span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technology tag capsules */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] font-mono font-semibold bg-neutral-950/60 text-neutral-400 border border-borderCustom rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action buttons */}
                <div className="flex items-center space-x-4 border-t border-borderCustom pt-6 mt-8 relative z-10">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-borderCustom hover:border-accent/40 transition-all duration-300 text-xs tracking-wider uppercase"
                  >
                    <span>Analyze Case Study</span>
                    <ArrowUpRight size={14} className="text-accent group-hover:rotate-45 transition-transform duration-300" />
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-950/60 border border-borderCustom hover:border-accent/40 rounded-lg text-secondary hover:text-white transition-colors"
                    title="View GitHub Repository"
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Detailed Typographic Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
});
