import React from 'react';
import type { Project } from '../data/portfolioData';
import { X, Cpu, CheckCircle } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#090909]/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Content (Typography-only single elegant container) */}
      <div className="relative w-full max-w-2xl glass-panel rounded-2xl border border-borderCustom z-10 max-h-[85vh] overflow-y-auto shadow-2xl p-8 md:p-10 flex flex-col justify-between transform-gpu">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 rounded-full bg-neutral-900 border border-borderCustom text-white hover:text-accent hover:border-accent transition-colors"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        <div className="space-y-6">
          {/* Header metadata */}
          <div className="flex items-center space-x-2 text-accent">
            <Cpu size={14} />
            <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest">
              {project.id === 'line-follower-robot' ? 'Hardware & Robotics Specs' : 'Software Core Architectures'}
            </span>
          </div>

          <div>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              {project.subtitle}
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white mt-1 uppercase">
              {project.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-mono font-semibold bg-neutral-950/60 text-neutral-400 border border-borderCustom rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="h-[1px] bg-borderCustom" />

          {/* Project Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Implementation Details
            </h4>
            <p className="text-xs md:text-sm text-secondary leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          <div className="h-[1px] bg-borderCustom" />

          {/* Features Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Technical Milestones
            </h4>
            <div className="space-y-2.5">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-neutral-300">
                  <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action button triggers */}
        <div className="mt-8 flex items-center space-x-4 border-t border-borderCustom pt-6">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 py-3.5 px-4 bg-accent text-black font-bold rounded-lg hover:bg-white hover:text-black transition-colors text-xs tracking-wider uppercase"
          >
            <GithubIcon size={16} />
            <span>GitHub Repository</span>
          </a>
          <button
            onClick={onClose}
            className="px-6 py-3.5 border border-borderCustom hover:border-neutral-700 text-white rounded-lg text-xs tracking-wider uppercase transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
