import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 sm:px-8 border-t border-white/5 bg-[#030508] text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand signature */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span className="font-display font-bold text-slate-100 text-base">
            {personalInfo.shortName}
          </span>
          <p className="text-xs text-slate-500 font-mono">
            CSE '28 Student • Python &amp; Django Developer • Builder
          </p>
        </div>

        {/* Professional Social Icons */}
        <div className="flex items-center gap-2.5">
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl glass-chip text-slate-400 hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4 text-[#0a66c2]" />
          </a>
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl glass-chip text-slate-400 hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4 text-slate-300" />
          </a>
          <a
            href={personalInfo.socials.email}
            className="p-2.5 rounded-xl glass-chip text-slate-400 hover:text-brand-accent transition-colors"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4 text-brand-teal" />
          </a>
        </div>

        {/* Copyright & Scroll To Top */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
          <span>&copy; {currentYear} {personalInfo.name}</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-xl glass-chip text-slate-400 hover:text-brand-accent transition-colors flex items-center gap-1"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[11px]">Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
