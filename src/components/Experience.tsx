import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, ShieldCheck, MapPin } from 'lucide-react';

export const Experience: React.FC = React.memo(() => {
  const experiences = PORTFOLIO_DATA.experience;

  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-borderCustom">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left column info */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-none">
            Work Experience
          </h2>
          <p className="text-secondary text-sm md:text-base max-w-sm">
            Professional industry internship and hands-on telecommunications learning milestones.
          </p>
        </div>

        {/* Right column timeline */}
        <div className="lg:col-span-8 relative pl-6 border-l border-neutral-800 space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Orb indicator */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-bg group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_#FF7A00]" />

              <div className="glass-panel p-6 md:p-8 rounded-xl border border-borderCustom hover:border-accent/30 transition-all duration-300 space-y-6">
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                      {exp.period}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-accent transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mt-1">
                      <span className="flex items-center space-x-1.5">
                        <Briefcase size={12} className="text-accent" />
                        <span className="font-semibold text-neutral-300">{exp.company}</span>
                      </span>
                      <span className="flex items-center space-x-1.5">
                        <MapPin size={12} />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Certified Seal badge */}
                  <div className="flex items-center space-x-2 glass-panel py-2 px-4 rounded-lg border border-borderCustom max-w-max self-start md:self-center">
                    <ShieldCheck size={16} className="text-accent" />
                    <span className="text-[10px] font-mono font-bold tracking-wider text-white uppercase">
                      {exp.badge}
                    </span>
                  </div>
                </div>

                <div className="h-[1px] bg-borderCustom" />

                <div className="space-y-4">
                  <p className="text-sm text-secondary leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Core Scope & Responsibilities
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start space-x-2 text-xs text-neutral-400">
                          <span className="text-accent shrink-0 mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
