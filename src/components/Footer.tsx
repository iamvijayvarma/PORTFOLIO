import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, MailIcon } from './SocialIcons';

export const Footer: React.FC = React.memo(() => {
  const [timeString, setTimeString] = useState('');

  // Live Local Time calculation for India (UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-12 px-6 md:px-12 max-w-7xl mx-auto border-t border-borderCustom bg-[#090909]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand Left */}
        <div className="space-y-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-black text-sm">
              V
            </div>
            <span className="text-lg font-bold tracking-widest text-white">
              {PORTFOLIO_DATA.personal.brandName}
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Vijay Varma V. All rights reserved.
          </p>
        </div>

        {/* Live Clock Center */}
        <div className="flex items-center space-x-3 glass-panel px-4 py-2 rounded-lg border border-borderCustom">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
            Karur, India Time: <span className="text-white font-semibold">{timeString}</span>
          </span>
        </div>

        {/* Right CTA */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <a
              href={PORTFOLIO_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={PORTFOLIO_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.socials.email}`}
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <MailIcon size={18} />
            </a>
          </div>

          <a
            href="#home"
            className="p-3 rounded-lg bg-neutral-900 border border-borderCustom hover:border-accent hover:text-accent transition-all text-secondary inline-flex items-center justify-center"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
});
