import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { GraduationCap, Award, Calendar, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-6 sm:px-8 relative border-t border-slate-900/80 bg-[#05070c]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-teal font-mono text-xs uppercase tracking-wider mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              06 // Academic Background &amp; Certifications
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-100 tracking-tight uppercase">
              Education &amp; Credentials.
            </h2>
          </div>
          <p className="text-sm font-mono text-slate-400 max-w-sm">
            Formal engineering coursework, academic milestones, and verified certifications.
          </p>
        </div>

        {/* Academic History */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-6">
            <GraduationCap className="w-4 h-4 text-brand-teal" />
            <span>Academic History</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personalInfo.educationList.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 shadow-2xl border border-white/5 hover:border-white/15 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                    <span className="flex items-center gap-1 glass-chip px-3 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.period}
                    </span>
                    {item.score && (
                      <span className="glass-chip px-3 py-1 rounded-full text-slate-300 font-semibold">
                        {item.score}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 font-display">
                    {item.degree}
                  </h3>
                  <p className="text-sm font-medium text-brand-teal font-mono mt-1">
                    {item.institution}
                  </p>
                </div>

                {item.highlights && item.highlights.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-white/5 space-y-1.5 text-xs text-slate-300">
                    {item.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Verified Certifications */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
              <Award className="w-4 h-4 text-brand-teal" />
              <span>Verified Certifications &amp; Credentials ({personalInfo.certifications.length})</span>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
              Direct verification links
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {personalInfo.certifications.map((cert, cIdx) => (
              <div
                key={cIdx}
                className="glass-panel rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-2xl border border-white/5 hover:border-white/15 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
                      {cert.issuer}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                      <span>Verified</span>
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-100 font-display mb-2 group-hover:text-brand-accent transition-colors">
                    {cert.title}
                  </h4>
                </div>

                {cert.url && (
                  <div className="pt-4 mt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Official Record</span>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-accent hover:text-cyan-300 inline-flex items-center gap-1.5 font-semibold transition-colors"
                    >
                      <span>View Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
