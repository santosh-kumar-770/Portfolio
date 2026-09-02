import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { FileText, Download, ExternalLink, CheckCircle } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  return (
    <section id="resume" className="py-24 px-6 sm:px-8 relative border-t border-slate-900/80 bg-[#05070c]">
      <div className="max-w-6xl mx-auto">
        {/* Floating Glass CTA Panel */}
        <div className="relative glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Ambient Glow Orbs inside card */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-teal/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="glass-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-brand-accent">
                <FileText className="w-3.5 h-3.5" />
                <span>OFFICIAL CURRICULUM VITAE</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-100 tracking-tight uppercase">
                  Want the full picture?
                </h2>
                <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                  Take a look at my resume for detailed coursework, internship experience, and technical project architectures.
                </p>
              </div>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>B.Tech Computer Science Coursework</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Internship &amp; Campus Ambassador Details</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Python, Django, REST APIs, AI/ML Stacks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Hackathons &amp; Volunteer Involvements</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={personalInfo.resumePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Resume</span>
                </a>

                <a
                  href={personalInfo.resumePdfPath}
                  download="Santosh_Kumar_Resume.pdf"
                  className="glass-button-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold uppercase tracking-wider"
                >
                  <Download className="w-4 h-4 text-brand-teal" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* Right Visual Glass Thumbnail */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs rounded-2xl bg-slate-950/70 border border-white/10 p-6 shadow-2xl relative">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs font-mono text-slate-400">
                  <span>resume_2026.pdf</span>
                  <span className="text-brand-accent">PDF</span>
                </div>
                
                <div className="my-6 space-y-2">
                  <div className="h-3 w-3/4 bg-white/10 rounded" />
                  <div className="h-2 w-full bg-white/5 rounded" />
                  <div className="h-2 w-5/6 bg-white/5 rounded" />
                  <div className="h-2 w-4/6 bg-white/5 rounded" />
                  <div className="pt-2 space-y-1.5">
                    <div className="h-2 w-full bg-white/[0.03] rounded" />
                    <div className="h-2 w-2/3 bg-white/[0.03] rounded" />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="text-emerald-400">● Up to date</span>
                  <a
                    href={personalInfo.resumePdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-accent hover:underline flex items-center gap-1"
                  >
                    Open <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
