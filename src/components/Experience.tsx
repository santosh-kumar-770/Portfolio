import React from 'react';
import { experiences } from '../data/portfolioData';
import { Calendar } from 'lucide-react';

export const Experience: React.FC = () => {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Internship':
        return 'bg-brand-teal/10 text-brand-accent border-brand-teal/30';
      case 'Leadership':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
      case 'Volunteering':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Education & Learning':
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
      default:
        return 'bg-slate-800/80 text-slate-300 border-white/5';
    }
  };

  return (
    <section id="experience" className="py-24 px-6 sm:px-8 relative border-t border-slate-900/80 bg-[#05070c]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-teal font-mono text-xs uppercase tracking-wider mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              04 // Timeline &amp; Experience
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-100 tracking-tight uppercase">
              Where I've been building.
            </h2>
          </div>
          <p className="text-sm font-mono text-slate-400 max-w-sm">
            Internships, technical campus outreach, community volunteering, and developer summits.
          </p>
        </div>

        {/* Timeline / Layered Glass Cards */}
        <div className="relative border-l border-white/10 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-2 h-3.5 w-3.5 rounded-full bg-slate-950 border-2 border-brand-teal/70 group-hover:border-brand-accent group-hover:scale-125 transition-all shadow-md shadow-brand-teal/30" />

              <div className="glass-panel rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1">
                {/* Header info */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono border mb-2 ${getBadgeColor(
                        exp.type
                      )}`}
                    >
                      {exp.type}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
                      {exp.role}
                    </h3>
                    <p className="text-base font-medium text-brand-teal">
                      {exp.organization}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 glass-chip px-3 py-1.5 rounded-full">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300/85 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md bg-slate-950/60 text-slate-400 text-[11px] font-mono border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
