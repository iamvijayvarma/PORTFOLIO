import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon, MailIcon } from './SocialIcons';
import confetti from 'canvas-confetti';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = React.memo(() => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

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

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear inline error on typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_nb720bk';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_t5hokpd';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'cSwCyg9IzK6krCWLy';

    try {
      if (!serviceId || !templateId || !publicKey) {
        // If keys aren't configured yet, attempt simulated delivery + clear log
        console.warn(
          'EmailJS environment variables (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY) are not set. Configure them in .env for real email transmission.'
        );
        // Simulate a brief delay to demonstrate the UI states
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name.trim(),
            from_email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            to_email: 'vvarmavijay18@gmail.com',
          },
          publicKey
        );
      }

      setSubmitStatus('success');
      setStatusMessage('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});

      // Celebration Confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#FF7A00', '#ffffff', '#22c55e'],
        });
      } catch {
        // Ignore confetti error if canvas is not available
      }

      // Reset success status after 6 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 6000);
    } catch (err: unknown) {
      console.error('EmailJS Error:', err);
      setSubmitStatus('error');
      setStatusMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-borderCustom relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        {/* Left Side: Typography & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30, x: -20 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-5 space-y-6 sm:space-y-8 flex flex-col justify-between"
        >
          <div className="space-y-4 sm:space-y-5">
            {/* Small Orange Label */}
            <div className="flex items-center space-x-3">
              <span className="h-[1.5px] w-7 bg-accent" />
              <span className="text-accent text-xs sm:text-sm font-semibold tracking-widest uppercase">
                LET’S CONNECT
              </span>
            </div>

            {/* Large Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Send Me a <br />
              <span className="text-gradient-accent">Message</span>
            </h2>

            {/* Short Description */}
            <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-md">
              Have a project idea, collaboration opportunity, or just want to say hello?
              I’d love to hear from you.
            </p>
          </div>

          {/* Social Media Row */}
          <div className="space-y-3 pt-2">
            <p className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              Connect Across Platforms
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              {socials.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-label={item.ariaLabel}
                    className="w-[44px] h-[44px] md:w-[48px] md:h-[48px] rounded-full flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-neutral-300 hover:text-accent hover:border-[#FF7A00]/50 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,122,0,0.35)] active:scale-95 transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] backdrop-blur-md group"
                  >
                    <Icon
                      size={18}
                      className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Working Form */}
        <motion.div
          initial={{ opacity: 0, y: 30, x: 20 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-7 w-full"
        >
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Subtle card glow edge */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6 relative z-10">
              {/* Full Name & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {/* Full Name */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-neutral-300 tracking-wide">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Vijay Varma"
                    className={`w-full bg-white/[0.04] border ${
                      errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-white/[0.08] focus:border-[#FF7A00]'
                    } rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-4 ${
                      errors.name ? 'focus:ring-red-500/15' : 'focus:ring-[#FF7A00]/15'
                    } transition-all duration-300`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs flex items-center gap-1 pt-0.5">
                      <AlertCircle size={12} className="shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-neutral-300 tracking-wide">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@domain.com"
                    className={`w-full bg-white/[0.04] border ${
                      errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-white/[0.08] focus:border-[#FF7A00]'
                    } rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-4 ${
                      errors.email ? 'focus:ring-red-500/15' : 'focus:ring-[#FF7A00]/15'
                    } transition-all duration-300`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs flex items-center gap-1 pt-0.5">
                      <AlertCircle size={12} className="shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="contact-subject" className="text-xs font-semibold text-neutral-300 tracking-wide">
                  Subject <span className="text-accent">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration / Opportunity"
                  className={`w-full bg-white/[0.04] border ${
                    errors.subject ? 'border-red-500/80 focus:border-red-500' : 'border-white/[0.08] focus:border-[#FF7A00]'
                  } rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-4 ${
                    errors.subject ? 'focus:ring-red-500/15' : 'focus:ring-[#FF7A00]/15'
                  } transition-all duration-300`}
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs flex items-center gap-1 pt-0.5">
                    <AlertCircle size={12} className="shrink-0" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="contact-message" className="text-xs font-semibold text-neutral-300 tracking-wide">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and goals..."
                  className={`w-full min-h-[160px] bg-white/[0.04] border ${
                    errors.message ? 'border-red-500/80 focus:border-red-500' : 'border-white/[0.08] focus:border-[#FF7A00]'
                  } rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-4 ${
                    errors.message ? 'focus:ring-red-500/15' : 'focus:ring-[#FF7A00]/15'
                  } transition-all duration-300 resize-none`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs flex items-center gap-1 pt-0.5">
                    <AlertCircle size={12} className="shrink-0" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Feedback Banners */}
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-2.5 text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 p-4 rounded-xl text-sm animate-fade-in">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span className="font-medium">{statusMessage}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center space-x-2.5 text-rose-400 bg-rose-400/10 border border-rose-400/25 p-4 rounded-xl text-sm animate-fade-in">
                  <AlertCircle size={18} className="shrink-0" />
                  <span className="font-medium">{statusMessage}</span>
                </div>
              )}

              {/* Large Premium Send Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 bg-[#FF7A00] hover:bg-[#ff8c1a] text-black font-bold rounded-xl flex items-center justify-center space-x-2 text-sm sm:text-base tracking-wide uppercase shadow-lg shadow-[#FF7A00]/25 hover:shadow-[0_0_25px_rgba(255,122,0,0.4)] hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} className="ml-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

ContactForm.displayName = 'ContactForm';
