import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, MailIcon } from './SocialIcons';
import { useDevicePerformance } from '../hooks/useDevicePerformance';

export const Navbar: React.FC = React.memo(() => {
  const { isLowEnd } = useDevicePerformance();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const isNavigatingRef = useRef(false);

  const navLinks = useMemo(() => [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Achievements', href: '#achievements', id: 'achievements' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ], []);

  const sectionIds = useMemo(() => ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'], []);

  // Pin-aware direct DOM geometry scroll target retriever
  const getSectionScrollTarget = useCallback((id: string): number => {
    if (id === 'home') return 0;

    const el = document.getElementById(id);
    if (!el) return 0;

    // If target has a pin-spacer (like #skills when pinned), measure the pin spacer in document flow
    const pinSpacer = el.closest('.pin-spacer') as HTMLElement | null;
    const targetEl = pinSpacer || el;

    const rect = targetEl.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const navOffset = id === 'skills' ? 0 : 80;

    return Math.max(0, Math.round(rect.top + scrollTop - navOffset));
  }, []);

  // Programmatic smooth scroll engine using GSAP ScrollToPlugin
  const scrollToSection = useCallback((id: string, updateHash = true) => {
    const targetY = getSectionScrollTarget(id);

    // Mark navigating state to prevent scroll spy jitter during programmatic scroll
    isNavigatingRef.current = true;
    setActiveSection(id);

    // Kill any existing window tweens to prevent conflict
    gsap.killTweensOf(window);

    const currentY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const distance = Math.abs(targetY - currentY);
    // Smooth dynamic duration between 0.5s and 1.0s based on distance
    const duration = Math.min(1.0, Math.max(0.5, distance / 4000));

    gsap.to(window, {
      scrollTo: {
        y: targetY,
        autoKill: false,
      },
      duration,
      ease: 'power3.inOut',
      onComplete: () => {
        isNavigatingRef.current = false;
        setActiveSection(id);
      },
      onInterrupt: () => {
        isNavigatingRef.current = false;
      }
    });

    if (updateHash) {
      window.history.pushState(null, '', `#${id}`);
    }
  }, [getSectionScrollTarget]);

  // Smooth scroll click handler for navbar items
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(id);
  }, [scrollToSection]);

  // Scroll Detection & Event Listeners
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);

    let rafId: number | null = null;

    // Viewport intersection evaluation for manual scrolling
    const updateActiveSection = () => {
      if (isNavigatingRef.current) return;

      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

      // 1. Top of page safeguard
      if (scrollY < 100) {
        setActiveSection('home');
        return;
      }

      // 2. Bottom of page safeguard (near footer/contact)
      const isAtBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      const triggerPoint = window.innerHeight * 0.4; // 40% viewport trigger height

      // 3. Check from bottom section upwards to accurately match the active section
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (!el) continue;

        const pinSpacer = el.closest('.pin-spacer') as HTMLElement | null;
        const measureEl = pinSpacer || el;
        const rect = measureEl.getBoundingClientRect();

        // Section encompasses or has passed the trigger point while still visible
        if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
          setActiveSection(id);
          return;
        }
      }
    };

    // Native scroll listener throttled with requestAnimationFrame
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveSection);
    };

    // Global delegated click listener for any internal anchor links (Hero CTA buttons, About links, etc.)
    const handleGlobalAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#' || !href.startsWith('#')) return;

      const targetId = href.slice(1);
      if (!sectionIds.includes(targetId)) return;

      e.preventDefault();
      setIsOpen(false);
      scrollToSection(targetId);
    };

    // Browser back/forward button support
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && sectionIds.includes(hash)) {
        scrollToSection(hash, false);
      } else if (!hash) {
        scrollToSection('home', false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    document.addEventListener('click', handleGlobalAnchorClick);

    // Initial check
    updateActiveSection();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
      document.removeEventListener('click', handleGlobalAnchorClick);
      gsap.killTweensOf(window);
    };
  }, [sectionIds, scrollToSection]);

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
            aria-label="GitHub"
            className="hover:text-accent hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={PORTFOLIO_DATA.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-accent hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={PORTFOLIO_DATA.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-accent hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <InstagramIcon size={16} />
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

            <div className="flex justify-around items-center text-neutral-400 px-2">
              <a
                href={PORTFOLIO_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-accent hover:scale-105 transition-all p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={PORTFOLIO_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-accent hover:scale-105 transition-all p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={PORTFOLIO_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-accent hover:scale-105 transition-all p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.socials.email}`}
                aria-label="Email"
                className="hover:text-accent hover:scale-105 transition-all p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
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
