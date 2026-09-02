import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Code2, Cpu, Users, Compass, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  const coreThemes = [
    {
      icon: Code2,
      number: '01',
      title: 'Backend Systems & REST APIs',
      description:
        'Engineering scalable backend services, structured RESTful API schemas, and relational database architectures with Python, Django, and PostgreSQL.'
    },
    {
      icon: Cpu,
      number: '02',
      title: 'AI/ML & Mathematical Models',
      description:
        'Building machine learning models from mathematical first principles with NumPy (matrix calculus, backprop) and exploring applied AI/ML pipelines.'
    },
    {
      icon: Users,
      number: '03',
      title: 'Hackathons & Communities',
      description:
        'Actively competing in engineering hackathons, campus initiatives as a NIMBLUX Ambassador, and collaborating with developer circles.'
    }
  ];

  return (
    <section id="about" className="py-24 px-6 sm:px-8 relative border-t border-slate-900/80 bg-[#05070c]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-teal font-mono text-xs uppercase tracking-wider mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              01 // Story &amp; Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-100 tracking-tight">
              More than just code.
            </h2>
          </div>
          <p className="text-sm font-mono text-slate-400 max-w-sm">
            Bridging software engineering, systems design, and problem solving.
          </p>
        </div>

        {/* Editorial Narrative & Focus Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Main Editorial Text */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-lg sm:text-xl leading-relaxed font-normal">
            <p className="text-slate-100 font-medium">
              I believe the most effective way to understand software and machine learning is by building end-to-end applications from scratch.
            </p>
            {personalInfo.detailedBio.map((paragraph, index) => (
              <p key={index} className="text-slate-300/85 text-base sm:text-lg">
                {paragraph}
              </p>
            ))}

            <div className="pt-2">
              <a
                href="#work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-cyan-300 transition-colors group font-mono"
              >
                <span>View curated engineering projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Currently Exploring Glass Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-5 pb-3 border-b border-white/5">
                <Compass className="w-4 h-4 text-brand-teal" />
                <span>Currently Deep-Diving</span>
              </div>

              <div className="space-y-3">
                {personalInfo.currentlyExploring.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-brand-teal/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-brand-teal font-bold">0{idx + 1}</span>
                      <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                        {item}
                      </span>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-brand-teal/40 group-hover:bg-brand-accent transition-colors" />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="text-slate-500">Execution Mode</span>
                <span className="text-slate-200 font-medium">Build • Test • Ship</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreThemes.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="glass-panel rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-slate-500 font-bold">{pillar.number}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 font-display mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
