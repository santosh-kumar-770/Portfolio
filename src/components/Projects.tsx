import React from 'react';
import { curatedProjects } from '../data/portfolioData';
import { ExternalLink, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  return (
    <section id="work" className="py-24 px-6 sm:px-8 relative border-t border-slate-900/80 bg-[#05070c]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-teal font-mono text-xs uppercase tracking-wider mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              02 // Selected Work
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-100 tracking-tight uppercase">
              Things I've built.
            </h2>
          </div>
          <p className="text-sm font-mono text-slate-400 max-w-sm">
            Hand-curated flagship projects spanning exam platforms, neural networks, and scalable APIs.
          </p>
        </div>

        {/* Selected Project Cards */}
        <div className="space-y-14">
          {curatedProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 shadow-2xl overflow-hidden group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Visual Preview Column */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl group/img">
                      {/* Top Window Bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-white/5 backdrop-blur-md">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                          <span className="ml-2 font-mono text-[11px] text-slate-400">
                            {project.id === 'stucet'
                              ? 'https://stucet.vercel.app'
                              : project.id === 'mnist-scratch'
                              ? 'mnist_scratch_nn.py'
                              : 'eventloop_service.py'}
                          </span>
                        </div>
                        <span
                          className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full ${
                            project.status === 'Live'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : project.status === 'In Progress'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Project Image */}
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="w-full h-full object-cover group-hover/img:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details Column */}
                  <div className={`lg:col-span-5 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3">
                        <span className="text-brand-teal font-bold uppercase">{project.category}</span>
                        <span>0{index + 1} // CURATED</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 font-display mb-1.5 group-hover:text-brand-accent transition-colors">
                        {project.title}
                      </h3>

                      {project.subtitle && (
                        <p className="text-xs sm:text-sm font-mono text-slate-400 mb-4">
                          {project.subtitle}
                        </p>
                      )}

                      <p className="text-slate-300/90 text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Architecture Highlights */}
                      {project.highlights && (
                        <div className="mb-6 space-y-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                            Architecture Highlights:
                          </span>
                          {project.highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal mt-0.5 shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg glass-chip text-slate-300 text-xs font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-button-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-button-secondary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                          <ArrowUpRight className="w-3 h-3 opacity-60" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
