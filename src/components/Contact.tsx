import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { submitContactMessage } from '../services/api';
import { Copy, Check, Send, ArrowUpRight, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorMessage('');

    setIsSubmitting(true);
    try {
      const result = await submitContactMessage(
        formState.name,
        formState.email,
        formState.message,
        formState.honeypot
      );

      if (result.success) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '', honeypot: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 relative border-t border-slate-900/80 bg-[#05070c]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Header */}
          <div className="lg:col-span-6 space-y-7">
            <div className="inline-flex items-center gap-2 text-brand-teal font-mono text-xs uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              07 // Connect &amp; Collaborate
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-slate-100 tracking-tight uppercase editorial-title">
                Have an idea?<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-cyan-300 to-teal-200">
                  Let's talk.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                Open to backend engineering internships, technical collaborations, hackathons, or discussions around Python, Django, and Machine Learning.
              </p>
            </div>

            {/* Direct Email Glass Box */}
            <div className="glass-panel rounded-3xl p-5 sm:p-6 space-y-3 shadow-2xl">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Direct Email:
              </span>
              <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-white/5">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="font-mono text-sm text-brand-accent hover:underline truncate"
                >
                  {personalInfo.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl glass-chip text-slate-300 hover:text-white transition-colors shrink-0 flex items-center gap-1.5 text-xs font-mono"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Channels Strip */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                Professional Channels:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel rounded-2xl p-4 flex items-center justify-between hover:border-white/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-4 h-4 text-[#0a66c2]" />
                    <span className="text-sm font-medium text-slate-200">LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel rounded-2xl p-4 flex items-center justify-between hover:border-white/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-4 h-4 text-slate-300" />
                    <span className="text-sm font-medium text-slate-200">GitHub Profile</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Liquid Glass Real Contact Form */}
          <div className="lg:col-span-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-6 pb-3 border-b border-white/5">
                <MessageSquare className="w-4 h-4 text-brand-teal" />
                <span>Transmit Message</span>
              </div>

              {submitStatus === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <Check className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-xl font-bold text-slate-100 font-display">Message Sent Successfully</h4>
                    <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                      Thank you for reaching out. Your message has been securely delivered to my inbox and I'll get back to you soon.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-4 px-6 py-2.5 rounded-xl glass-chip text-xs font-mono text-slate-200 hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Anti-spam honeypot (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formState.honeypot}
                      onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 animate-fadeIn">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Name / Organization <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      maxLength={150}
                      placeholder="Jane Doe"
                      disabled={isSubmitting}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-white/10 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/50 transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Email Address <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={255}
                      placeholder="jane@example.com"
                      disabled={isSubmitting}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-white/10 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/50 transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Message <span className="text-brand-accent">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      maxLength={5000}
                      placeholder="Tell me about your idea, project, or opportunity..."
                      disabled={isSubmitting}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-white/10 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/50 resize-none transition-colors disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full glass-button-primary flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message ↗</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
