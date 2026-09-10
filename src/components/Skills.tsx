import React from 'react';
import { skillGroups } from '../data/portfolioData';
import { Code2, Wrench, Layers } from 'lucide-react';

export const Skills: React.FC = () => {
  const getGroupIcon = (group: string) => {
    switch (group) {
      case 'LANGUAGES':
        return <Code2 className="w-4 h-4 text-brand-teal" />;
      case 'FRAMEWORKS / TOOLS':
        return <Wrench className="w-4 h-4 text-cyan-400" />;
      case 'AREAS':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      default:
        return <Code2 className="w-4 h-4 text-brand-teal" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-6 sm:px-8 relative border-t border-slate-900/80 bg-[#05070c]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-teal font-mono text-xs uppercase tracking-wider mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              05 // Competencies
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-100 tracking-tight uppercase">
              Tools &amp; Capabilities.
            </h2>
          </div>
          <p className="text-sm font-mono text-slate-400 max-w-sm">
            Categorized across core languages, production frameworks, and engineering domains.
          </p>
        </div>

        {/* Floating Glass Skill Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((groupItem) => (
            <div
              key={groupItem.group}
              className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-2xl group"
            >
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-white/5">
                    {getGroupIcon(groupItem.group)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100 font-display">
                      {groupItem.group}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500">
                      {groupItem.skills.length} competencies
                    </span>
                  </div>
                </div>

                {/* Floating Glass Chips */}
                <div className="flex flex-wrap gap-2">
                  {groupItem.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl glass-chip text-slate-200 text-xs font-mono font-medium hover:text-brand-accent hover:border-brand-teal/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Domain Focus</span>
                <span className="text-slate-400">Practical &amp; Tested</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
