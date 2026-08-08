import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle2, AlertCircle, Loader2, Zap } from 'lucide-react';
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
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [rawErrorText, setRawErrorText] = useState<string | null>(null);

  // Startup verification log
  useEffect(() => {
    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_nb720bk';
    const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_t5hokpd';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'cSwCyg9IzK6krCWLy';

    console.log('--- EmailJS Environment Variables Verification ---', {
      service,
      template,
      publicKey: publicKey ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` : undefined,
    });
  }, []);

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

    if (!form.name.trim()) {
      newErrors.name = 'Full Name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setRawErrorText(null);
    setStatusMessage('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_nb720bk';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_t5hokpd';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'cSwCyg9IzK6krCWLy';

    try {
      // Send parameters matching exact EmailJS template variable names {{name}}, {{email}}, {{subject}}, {{message}}
      const templateParams = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        // Also provide standard aliases in case template uses from_name/from_email
        from_name: form.name.trim(),
        from_email: form.email.trim(),
        reply_to: form.email.trim(),
        to_email: 'vvarmavijay18@gmail.com',
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('EMAILJS SUCCESS', response);
      setSubmitStatus('success');
      setStatusMessage('Message sent successfully!');
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});

      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#FF7A00', '#ffffff', '#22c55e'],
        });
      } catch {
        // Confetti fallback
      }

      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 6000);
    } catch (error: unknown) {
      console.error('EMAILJS ERROR', error);
      console.error(JSON.stringify(error, null, 2));

      setSubmitStatus('error');
      const errObj = error as { text?: string; message?: string; status?: number };
      const detailedError =
        errObj?.text || errObj?.message || (typeof error === 'string' ? error : JSON.stringify(error));
      
      setRawErrorText(detailedError);
      setStatusMessage('Email failed to send. Check the error details below or open the browser console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Direct Connection Test Button logic
  const testEmail = async () => {
    setTestRunning(true);
    setRawErrorText(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_nb720bk';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_t5hokpd';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'cSwCyg9IzK6krCWLy';

    try {
      const res = await emailjs.send(
        serviceId,
        templateId,
        {
          name: 'Vijay',
          email: 'test@gmail.com',
          subject: 'Portfolio Test',
          message: 'This is a direct EmailJS test from your portfolio.',
          from_name: 'Vijay',
          from_email: 'test@gmail.com',
          to_email: 'vvarmavijay18@gmail.com',
        },
        publicKey
      );

      console.log('DIRECT TEST SUCCESS', res);
      alert('Direct EmailJS test worked! An email has been delivered to vvarmavijay18@gmail.com');
      setSubmitStatus('success');
      setStatusMessage('Direct EmailJS test succeeded! Connection is 100% verified.');
    } catch (err: unknown) {
      console.error('DIRECT TEST FAILED', err);
      console.error(JSON.stringify(err, null, 2));

      const errObj = err as { text?: string; message?: string; status?: number };
      const detailedError =
        errObj?.text || errObj?.message || (typeof err === 'string' ? err : JSON.stringify(err));

      setRawErrorText(detailedError);
      setSubmitStatus('error');
      setStatusMessage(`Direct EmailJS test failed: ${detailedError}`);
      alert(`Direct EmailJS test failed: ${detailedError}`);
    } finally {
      setTestRunning(false);
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

            <form onSubmit={sendEmail} noValidate className="space-y-5 sm:space-y-6 relative z-10">
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
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Vijay"
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
                    value={form.email}
                    onChange={handleChange}
                    placeholder="test@gmail.com"
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
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Portfolio Test"
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
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Hello from my portfolio"
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

              {/* Success Banner */}
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-2.5 text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 p-4 rounded-xl text-sm">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span className="font-medium">{statusMessage}</span>
                </div>
              )}

              {/* Error Banner with raw EmailJS details */}
              {submitStatus === 'error' && (
                <div className="space-y-2 text-rose-400 bg-rose-400/10 border border-rose-400/25 p-4 rounded-xl text-sm">
                  <div className="flex items-center space-x-2.5">
                    <AlertCircle size={18} className="shrink-0" />
                    <span className="font-medium">{statusMessage}</span>
                  </div>
                  {rawErrorText && (
                    <div className="p-3 bg-black/60 rounded-lg border border-rose-500/20 font-mono text-xs text-rose-300 break-all select-all">
                      <span className="text-neutral-400 font-bold block mb-1">EmailJS Error Details:</span>
                      {rawErrorText}
                    </div>
                  )}
                </div>
              )}

              {/* Send Button */}
              <button
                type="submit"
                disabled={isSubmitting || testRunning}
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

              {/* Direct EmailJS Diagnostic Test Button */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] text-neutral-500 font-mono">
                  Diagnostics:
                </span>
                <button
                  type="button"
                  onClick={testEmail}
                  disabled={testRunning || isSubmitting}
                  className="text-xs px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-accent border border-white/[0.1] hover:border-accent/40 flex items-center gap-1.5 transition-all font-mono active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {testRunning ? (
                    <>
                      <Loader2 size={12} className="animate-spin text-accent" />
                      <span>Sending Test Payload...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={12} className="text-accent" />
                      <span>⚡ Test EmailJS Connection</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

ContactForm.displayName = 'ContactForm';
