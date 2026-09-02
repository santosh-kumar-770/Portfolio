import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowDown, ArrowUpRight, Terminal, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 px-6 sm:px-8 overflow-hidden bg-radial-atmosphere"
    >
      {/* Ambient glowing orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-brand-teal/15 via-cyan-500/10 to-brand-violet/10 blur-[130px] rounded-full pointer-events-none -z-10 animate-ambient-glow" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Huge Editorial Typography & Supporting Copy */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-7">
          {/* Glass Status Pill */}
          <div className="glass-pill inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs text-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            <span className="font-mono text-[11px] tracking-wide font-medium">
              {personalInfo.badge}
            </span>
          </div>

          {/* Huge Responsive Editorial Headline */}
          <div className="space-y-1 sm:space-y-2">
            {personalInfo.taglineHeadline.map((line, idx) => (
              <h1
                key={idx}
                className={`text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight uppercase editorial-title ${
                  idx === 1
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-cyan-300 to-teal-200'
                    : 'text-slate-100'
                }`}
              >
                {line}
              </h1>
            ))}
          </div>

          {/* Concise Supporting Statement */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-xl">
            {personalInfo.supportingStatement}
          </p>

          {/* Minimal Stack Indicator */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
            <span className="font-mono text-slate-500 flex items-center gap-1.5 mr-1">
              <Terminal className="w-3.5 h-3.5 text-brand-teal" /> stack:
            </span>
            {['Python', 'Django', 'REST APIs', 'PostgreSQL', 'AI/ML'].map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full glass-chip text-slate-300 font-mono text-[11px]"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Floating Glass Controls */}
          <div className="flex flex-wrap items-center gap-4 pt-3 w-full sm:w-auto">
            <a
              href="#work"
              className="w-full sm:w-auto glass-button-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wide uppercase"
            >
              <span>View My Work</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto glass-button-secondary inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold tracking-wide uppercase"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-4 h-4 text-brand-teal" />
            </a>
          </div>

          {/* Social Profiles Glass Strip */}
          <div className="pt-4 border-t border-white/5 w-full flex items-center justify-between sm:justify-start sm:gap-6 text-xs text-slate-400">
            <span className="font-mono text-slate-500 text-[11px] uppercase tracking-wider">Profiles:</span>
            <div className="flex items-center gap-4">
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0a66c2]" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 text-slate-200" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href={personalInfo.socials.email}
                className="flex items-center gap-1.5 text-slate-400 hover:text-brand-accent transition-colors"
                aria-label="Direct Email"
              >
                <Mail className="w-4 h-4 text-brand-teal" />
                <span className="hidden sm:inline">Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Apple Liquid Glass Profile Container with User's Uploaded Image */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm sm:max-w-md">
            {/* Ambient Back Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-teal/20 via-white/5 to-cyan-500/20 blur-xl opacity-60" />

            {/* Glass Container */}
            <div className="relative glass-panel rounded-3xl p-5 sm:p-6 shadow-2xl">
              {/* Header pill inside card */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 font-mono text-[11px] text-slate-400">santosh_profile.jpg</span>
                </div>
                <span className="font-mono text-[10px] text-brand-accent px-2.5 py-0.5 rounded-full bg-brand-teal/10 border border-brand-teal/20">
                  DEVELOPER
                </span>
              </div>

              {/* Integrated Image Frame featuring User's Main Image */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[4/3] flex items-center justify-center group border border-white/10 shadow-inner">
                <img
                  src={personalInfo.profileImagePath}
                  alt="Itte Santosh Kumar - Python & Django Developer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="font-display font-semibold text-slate-200">Itte Santosh Kumar</span>
                  <span className="font-mono text-[10px] text-brand-teal">CSE '28</span>
                </div>
              </div>

              {/* Glass Info Matrix */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="text-[10px] text-slate-500 block uppercase">Primary Focus</span>
                  <span className="font-semibold text-slate-200 text-[12px]">Python &amp; Django</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="text-[10px] text-slate-500 block uppercase">Specialization</span>
                  <span className="font-semibold text-slate-200 text-[12px]">REST APIs &amp; ML</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
