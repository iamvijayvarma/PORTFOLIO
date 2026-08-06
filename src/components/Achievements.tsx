import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Trophy, Award, Medal, Sparkles } from 'lucide-react';

export const Achievements: React.FC = React.memo(() => {
  const achievements = PORTFOLIO_DATA.achievements;
  const certs = PORTFOLIO_DATA.certifications;

  return (
    <section id="achievements" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-borderCustom">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Achievements Column */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">
                Prizes & Awards
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white leading-none">
              Competitions
            </h2>
          </div>

          <div className="space-y-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="glass-card p-6 rounded-xl border border-borderCustom hover:border-accent/40 flex items-start space-x-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                  {ach.icon === 'Trophy' ? <Trophy size={22} /> : <Medal size={22} />}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-accent uppercase">
                    {ach.prize}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 group-hover:text-accent transition-colors">
                    {ach.competition}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">{ach.venue}</p>
                  <span className="inline-block text-[10px] text-neutral-500 font-semibold mt-3 bg-neutral-900 px-2 py-0.5 rounded">
                    {ach.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Skills spotlight Column */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">
                Credentials
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white leading-none">
              Certifications
            </h2>
          </div>

          <div className="space-y-4">
            {certs.map((cert) => (
              <div
                key={cert.id}
                className="glass-card p-6 rounded-xl border border-borderCustom hover:border-accent/40 flex items-start space-x-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400 shrink-0 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                  <Award size={22} />
                </div>
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">Issuer: {cert.issuer}</p>
                    <span className="inline-block text-[10px] font-mono text-neutral-500 mt-3">
                      ID: {cert.credentialId}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 max-w-max self-start md:self-center">
                    {cert.date}
                  </span>
                </div>
              </div>
            ))}

            {/* Extra Engineering Highlight panel */}
            <div className="glass-panel p-6 rounded-xl border border-borderCustom relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-2xl rounded-full pointer-events-none" />
              <div className="flex items-center space-x-3 text-accent mb-3">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Awwwards-Inspired Polish</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Handcrafted interactions designed using React state-controlled canvas matrices, smooth scrolling, and micro-interactive custom cards. High fidelity assets and animations reflect premium brand aesthetics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
