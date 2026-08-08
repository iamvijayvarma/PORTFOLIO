import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon, MailIcon } from './SocialIcons';

export const Contact: React.FC = React.memo(() => {
  const socials = [
    {
      name: 'GitHub',
      href: PORTFOLIO_DATA.socials.github,
      icon: GithubIcon,
      external: true,
      ariaLabel: 'Visit GitHub Profile',
    },
    {
      name: 'LinkedIn',
      href: PORTFOLIO_DATA.socials.linkedin,
      icon: LinkedinIcon,
      external: true,
      ariaLabel: 'Connect on LinkedIn',
    },
    {
      name: 'Instagram',
      href: PORTFOLIO_DATA.socials.instagram,
      icon: InstagramIcon,
      external: true,
      ariaLabel: 'Follow on Instagram',
    },
    {
      name: 'Email',
      href: `mailto:${PORTFOLIO_DATA.socials.email}`,
      icon: MailIcon,
      external: false,
      ariaLabel: 'Send Direct Email',
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 sm:py-[80px] px-4 sm:px-6 md:px-12 max-w-4xl mx-auto border-t border-borderCustom text-center relative overflow-hidden"
    >
      {/* Subtle ambient orange glow behind contact */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        {/* Section Heading Tag */}
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2.5">
            <span className="h-[1px] w-6 bg-accent" />
            <span className="text-accent text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Contact
            </span>
            <span className="h-[1px] w-6 bg-accent" />
          </div>

          {/* Heading / Subtitle */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-snug max-w-2xl px-2">
            Let’s build something <span className="text-gradient-accent">meaningful</span> together.
          </h2>

          <p className="text-secondary text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed px-4">
            Open to software engineering opportunities, AI research collaborations, and innovative embedded projects.
          </p>
        </div>

        {/* Clean Row of Circular Glassmorphism Social Media Icon Buttons */}
        <div className="flex items-center justify-center gap-3.5 sm:gap-5 pt-2">
          {socials.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                aria-label={item.ariaLabel}
                className="w-[44px] h-[44px] md:w-[52px] md:h-[52px] rounded-full flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-neutral-300 hover:text-accent hover:border-[#FF7A00]/50 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,122,0,0.35)] active:scale-95 transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] backdrop-blur-md group"
              >
                <Icon
                  size={18}
                  className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
