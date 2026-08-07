import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, MailIcon } from './SocialIcons';
import { useDevicePerformance } from '../hooks/useDevicePerformance';

export const Navbar: React.FC = React.memo(() => {
  const { isLowEnd } = useDevicePerformance();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const navLinks = useMemo(() => [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Achievements', href: '#achievements', id: 'achievements' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ], []);

  // Smooth scroll click handler
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(id);

    const targetEl = document.getElementById(id);
    if (!targetEl) return;

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#home');
      return;
    }

    const navOffset = 80;
    const targetY = targetEl.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
    window.history.pushState(null, '', `#${id}`);
  }, []);

  // Scroll Detection & ScrollTrigger Synchronization Hook
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];

    // High-precision viewport intersection evaluation
    const updateActiveSection = () => {
      // Top of page safeguard
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      // Bottom of page safeguard (near footer/contact)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      const triggerPoint = window.innerHeight * 0.45; // 45% viewport trigger height

      // Check from bottom section upwards to accurately match the active section
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        // Section encompasses or has passed the trigger point while still visible
        if (rect.top <= triggerPoint && rect.bottom > 0) {
          setActiveSection(id);
          return;
        }
      }
    };

    // Dedicated ScrollTrigger instances for each section
    const triggers: ScrollTrigger[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: id === 'home' ? 'top top' : 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(id);
          }
        },
      });

      triggers.push(trigger);
    });

    // Native scroll listener for rapid scroll tracking
    const handleScroll = () => {
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    ScrollTrigger.addEventListener('refresh', updateActiveSection);
    ScrollTrigger.addEventListener('scrollEnd', updateActiveSection);

    // Initial check
    updateActiveSection();

    // Handle initial hash navigation if URL contains #section on page load
    const hash = window.location.hash.replace('#', '');
    if (hash && sectionIds.includes(hash)) {
      const timer = setTimeout(() => {
        const targetEl = document.getElementById(hash);
        if (targetEl) {
          const navOffset = 80;
          const targetY = targetEl.getBoundingClientRect().top + window.scrollY - navOffset;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
          setActiveSection(hash);
        }
      }, 400);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
        ScrollTrigger.removeEventListener('refresh', updateActiveSection);
        ScrollTrigger.removeEventListener('scrollEnd', updateActiveSection);
        triggers.forEach((t) => t.kill());
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.removeEventListener('refresh', updateActiveSection);
      ScrollTrigger.removeEventListener('scrollEnd', updateActiveSection);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto z-50 flex items-center justify-between">
      {/* Floating Center Navbar (Pill Container) */}
      <div className="w-full md:w-auto h-16 px-4 md:px-6 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[24px] rounded-full shadow-2xl flex items-center justify-between md:space-x-12 relative overflow-hidden transition-all duration-300">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center space-x-3 group select-none mr-4"
        >
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-black text-sm transition-transform duration-500 group-hover:rotate-180">
            V
          </div>
          <span className="text-sm font-black tracking-widest text-white uppercase">
            {PORTFOLIO_DATA.personal.brandName}
          </span>
        </a>

        {/* Desktop Links with Morphing Capsule */}
        <div className="hidden lg:flex items-center space-x-1 relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const isHovered = hoveredSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                onMouseEnter={() => setHoveredSection(link.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center select-none ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span className="relative z-10">{link.label}</span>

                {/* Liquid Glass Capsule background */}
                {isActive && (
                  <motion.div
                    layoutId="liquidNavIndicator"
                    className="absolute inset-0 rounded-full border border-white/[0.12] -z-10 shadow-[0_4px_12px_rgba(255,122,0,0.08)] bg-white/[0.06] backdrop-blur-[12px] pointer-events-none transform-gpu"
                    style={{
                      boxShadow: '0 4px 15px -3px rgba(255, 122, 0, 0.12), inset 0 1px 2px rgba(255,255,255,0.18)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: isLowEnd ? 32 : 26,
                    }}
                  />
                )}

                {/* Subtly morphing edge hover highlight */}
                {isHovered && !isActive && !isLowEnd && (
                  <motion.div
                    layoutId="hoverIndicator"
                    className="absolute inset-0 rounded-full bg-white/[0.02] border border-white/[0.04] -z-20 pointer-events-none transform-gpu"
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Action icons shortcut on desktop */}
        <div className="hidden lg:flex items-center space-x-4 pl-4 border-l border-white/10 text-neutral-400">
          <a
            href={PORTFOLIO_DATA.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={PORTFOLIO_DATA.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            <LinkedinIcon size={16} />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-3 lg:hidden">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Pill overlay underneath the navbar) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-20 left-0 right-0 p-6 bg-neutral-950/95 border border-white/[0.08] backdrop-blur-[24px] rounded-3xl shadow-2xl flex flex-col space-y-6 lg:hidden z-40 transform-gpu"
          >
            <div className="flex flex-col space-y-3 relative">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`relative py-3.5 px-6 rounded-xl text-sm font-semibold uppercase tracking-wider flex items-center justify-between select-none ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <ArrowUpRight size={14} className={isActive ? 'text-accent' : 'opacity-30'} />

                    {/* Morphing Indicator working in mobile menu too */}
                    {isActive && (
                      <motion.div
                        layoutId="liquidNavIndicatorMobile"
                        className="absolute inset-0 rounded-xl border border-white/[0.08] bg-white/[0.04] -z-10 pointer-events-none transform-gpu"
                        style={{
                          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 280,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="h-[1px] bg-white/10 w-full" />

            <div className="flex justify-around items-center text-neutral-400">
              <a
                href={PORTFOLIO_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={PORTFOLIO_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.socials.email}`}
                className="hover:text-accent transition-colors"
              >
                <MailIcon size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
