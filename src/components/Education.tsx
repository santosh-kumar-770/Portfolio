import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { GraduationCap, Award, Calendar, ExternalLink, CheckCircle2 } from 'lucide-react';

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Academic Education Timeline */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              <GraduationCap className="w-4 h-4 text-brand-teal" />
              <span>Academic History</span>
            </div>

            {personalInfo.educationList.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 shadow-2xl border border-white/5 hover:border-white/15"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 font-display">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-medium text-brand-teal font-mono mt-0.5">
                      {item.institution}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
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
                </div>

                {item.highlights && item.highlights.length > 0 && (
                  <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs text-slate-300">
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

          {/* Right Column: Verified Certifications */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              <Award className="w-4 h-4 text-brand-teal" />
              <span>Verified Certifications</span>
            </div>

            <div className="space-y-4">
              {personalInfo.certifications.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  className="glass-panel rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-2xl border border-white/5 hover:border-white/15 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-mono text-brand-teal block mb-1">
                      {cert.issuer}
                    </span>
                    <h4 className="text-base font-bold text-slate-100 font-display mb-2">
                      {cert.title}
                    </h4>
                  </div>

                  {cert.url && (
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">Verified</span>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-accent hover:text-cyan-300 inline-flex items-center gap-1 font-semibold"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
