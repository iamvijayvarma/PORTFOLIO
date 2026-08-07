import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Send, CheckCircle2, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, MailIcon } from './SocialIcons';
import confetti from 'canvas-confetti';

export const Contact: React.FC = React.memo(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });

      // Trigger premium celebration confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FF7A00', '#ffffff', '#22c55e']
      });

      // Clear success feedback status after 5s
      setTimeout(() => setIsSent(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-borderCustom">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left Side: Large typography and social details */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">
                Connect
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Let's Build <br />
              Something <br />
              <span className="text-gradient-accent">Amazing</span> Together.
            </h2>
            <p className="text-secondary text-sm md:text-base leading-relaxed max-w-sm">
              Seeking innovative software engineering roles, autonomous robotics collaborations, and advanced AI integration opportunities.
            </p>
          </div>

          <div className="space-y-6">
            {/* Action Contact Anchors */}
            <div className="space-y-3.5">
              {/* 1. Email */}
              <a
                href={`mailto:${PORTFOLIO_DATA.socials.email}`}
                aria-label="Direct Email"
                className="flex items-center space-x-3 text-secondary hover:text-white transition-colors group max-w-max focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -ml-1"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-borderCustom flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent/40 group-hover:shadow-[0_0_15px_rgba(255,122,0,0.15)] transition-all">
                  <MailIcon size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                    Direct Email
                  </p>
                  <p className="text-sm font-mono">{PORTFOLIO_DATA.socials.email}</p>
                </div>
              </a>

              {/* 2. GitHub */}
              <a
                href={PORTFOLIO_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex items-center space-x-3 text-secondary hover:text-white transition-colors group max-w-max focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -ml-1"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-borderCustom flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent/40 group-hover:shadow-[0_0_15px_rgba(255,122,0,0.15)] transition-all">
                  <GithubIcon size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                    GitHub Source
                  </p>
                  <p className="text-sm font-mono">iamvijayvarma</p>
                </div>
              </a>

              {/* 3. LinkedIn */}
              <a
                href={PORTFOLIO_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex items-center space-x-3 text-secondary hover:text-white transition-colors group max-w-max focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -ml-1"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-borderCustom flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent/40 group-hover:shadow-[0_0_15px_rgba(255,122,0,0.15)] transition-all">
                  <LinkedinIcon size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                    LinkedIn Profile
                  </p>
                  <p className="text-sm font-mono">Vijay Varma V</p>
                </div>
              </a>

              {/* 4. Instagram */}
              <a
                href={PORTFOLIO_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="flex items-center space-x-3 text-secondary hover:text-white transition-colors group max-w-max focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -ml-1"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-borderCustom flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent/40 group-hover:shadow-[0_0_15px_rgba(255,122,0,0.15)] transition-all">
                  <InstagramIcon size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                    Instagram Profile
                  </p>
                  <p className="text-sm font-mono">{PORTFOLIO_DATA.socials.instagramHandle}</p>
                </div>
              </a>

              {/* 5. Resume */}
              <a
                href={PORTFOLIO_DATA.socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Curriculum Vitae"
                className="flex items-center space-x-3 text-secondary hover:text-white transition-colors group max-w-max focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 -ml-1"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-borderCustom flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent/40 group-hover:shadow-[0_0_15px_rgba(255,122,0,0.15)] transition-all">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                    Curriculum Vitae
                  </p>
                  <p className="text-sm font-mono">View Resume.pdf</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Working Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 rounded-2xl border border-borderCustom relative overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-6">Send an Inquiry</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-neutral-900 border border-borderCustom focus:border-accent rounded-lg p-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full bg-neutral-900 border border-borderCustom focus:border-accent rounded-lg p-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Message Details
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can I assist you?"
                  className="w-full bg-neutral-900 border border-borderCustom focus:border-accent rounded-lg p-3 text-sm text-white focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit / Success States */}
              {isSent ? (
                <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 p-4 rounded-lg">
                  <CheckCircle2 size={18} />
                  <span className="text-xs font-semibold">
                    Message transmitted successfully! Confetti triggered.
                  </span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent text-black font-bold rounded-lg hover:bg-white hover:text-black transition-colors flex items-center justify-center space-x-2 text-sm tracking-wider uppercase disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transmitting inquiry...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});
