import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 sm:px-6 pointer-events-none">
      <div
        className={`pointer-events-auto max-w-5xl w-full flex items-center justify-between transition-all duration-300 rounded-full px-4 sm:px-5 py-2.5 ${
          isScrolled
            ? 'glass-pill shadow-2xl shadow-black/50 border border-white/10'
            : 'bg-slate-900/40 backdrop-blur-xl border border-white/5 shadow-lg'
        }`}
      >
        {/* Brand Monogram */}
        <a
          href="#"
          className="flex items-center gap-2 text-slate-100 font-semibold tracking-tight text-sm focus:outline-none rounded-full"
          aria-label="Santosh Kumar - Home"
        >
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-brand-teal/30 to-brand-cyan/10 border border-brand-teal/40 flex items-center justify-center text-[11px] font-mono font-bold text-brand-accent">
            SK
          </span>
          <span className="font-display font-bold tracking-tight text-slate-200 hover:text-white transition-colors hidden sm:inline">
            Santosh Kumar
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-brand-accent shadow-inner border border-white/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Quick Actions (GitHub & Resume) */}
        <div className="flex items-center gap-2">
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full glass-chip text-slate-300 hover:text-white transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden lg:inline">GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 hidden lg:inline" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full glass-chip text-slate-300 hover:text-white focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 z-50 glass-panel rounded-3xl p-6 shadow-2xl pointer-events-auto border border-white/10 animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-brand-accent hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-slate-600">→</span>
              </a>
            ))}

            <div className="pt-3 mt-2 border-t border-white/10 flex items-center gap-2">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 rounded-xl glass-chip text-xs font-mono font-medium text-slate-200 flex items-center justify-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-brand-accent text-slate-950 text-xs font-bold text-center"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
