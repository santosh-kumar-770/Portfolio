import React, { useState, useEffect, useMemo } from 'react';
import type { GitHubRepo } from '../types';
import { fetchPublicRepos, GITHUB_USERNAME } from '../services/github';
import { ContributionCalendar } from './ContributionCalendar';
import { ArrowLeft, Search, Star, GitFork, ExternalLink, Sparkles, Filter, Code2, Loader2, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectsLibraryProps {
  onBack: () => void;
}

type FilterCategory = 'ALL' | 'PYTHON' | 'JAVASCRIPT' | 'HTML/CSS' | 'AI/ML' | 'OTHER';

export const ProjectsLibrary: React.FC<ProjectsLibraryProps> = ({ onBack }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('ALL');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let isMounted = true;
    async function loadRepos() {
      try {
        setLoading(true);
        const data = await fetchPublicRepos(GITHUB_USERNAME);
        if (isMounted) {
          setRepos(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('ProjectsLibrary fetch error:', err);
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadRepos();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute available filters based ONLY on categories that exist in the fetched repositories
  const availableFilters = useMemo((): FilterCategory[] => {
    const categoriesSet = new Set<FilterCategory>(['ALL']);
    repos.forEach((repo) => {
      if (repo.category === 'Python') categoriesSet.add('PYTHON');
      else if (repo.category === 'JavaScript') categoriesSet.add('JAVASCRIPT');
      else if (repo.category === 'HTML/CSS') categoriesSet.add('HTML/CSS');
      else if (repo.category === 'AI/ML') categoriesSet.add('AI/ML');
      else categoriesSet.add('OTHER');
    });

    const standardOrder: FilterCategory[] = ['ALL', 'PYTHON', 'JAVASCRIPT', 'HTML/CSS', 'AI/ML', 'OTHER'];
    return standardOrder.filter((cat) => categoriesSet.has(cat));
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'ALL' ||
        (activeCategory === 'PYTHON' && repo.category === 'Python') ||
        (activeCategory === 'JAVASCRIPT' && repo.category === 'JavaScript') ||
        (activeCategory === 'HTML/CSS' && repo.category === 'HTML/CSS') ||
        (activeCategory === 'AI/ML' && repo.category === 'AI/ML') ||
        (activeCategory === 'OTHER' && repo.category === 'Other');

      // Search query filter
      const searchContent = `${repo.name} ${repo.description || ''} ${repo.language || ''} ${repo.topics.join(' ')}`.toLowerCase();
      const matchesSearch = searchQuery.trim() === '' || searchContent.includes(searchQuery.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [repos, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#05070c] bg-radial-atmosphere text-slate-100 px-6 sm:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-white/5">
          <button
            type="button"
            onClick={onBack}
            className="glass-pill self-start px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-mono font-medium text-slate-300 hover:text-brand-accent hover:border-brand-teal/40 transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO PORTFOLIO</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/5 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
              <span>Synced with @{GITHUB_USERNAME}</span>
            </span>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl glass-chip text-slate-300 hover:text-white transition-colors"
              aria-label="GitHub Profile"
              title="Open GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Header Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-brand-teal font-mono text-xs uppercase tracking-wider mb-3">
            <Code2 className="w-4 h-4" />
            <span>Developer Workspace &amp; Activity</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-slate-100 mb-4 uppercase editorial-title">
            Projects Library.
          </h1>
          <p className="text-base sm:text-lg text-slate-300/85 max-w-2xl leading-relaxed font-normal">
            Dynamic catalog of all public codebases, repositories, experiments, and open-source contributions by Santosh Kumar Itte.
          </p>
        </div>

        {/* Contribution Calendar Heatmap Section */}
        <ContributionCalendar />

        {/* Search & Dynamic Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pt-4 border-t border-white/5">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by repo name, tech, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/50 backdrop-blur-xl border border-white/10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/50 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 hover:text-slate-300"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Dynamic Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-500 mr-1 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {availableFilters.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-brand-accent text-slate-950 font-bold shadow-md shadow-brand-teal/20'
                      : 'glass-chip text-slate-300 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-6 pb-2 border-b border-white/5">
          <span>
            SHOWING {filteredRepos.length} OF {repos.length} REPOSITORIES
          </span>
          {searchQuery && <span>QUERY: "{searchQuery}"</span>}
        </div>

        {/* Repositories Grid */}
        {loading ? (
          <div className="py-24 glass-panel rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-brand-teal" />
            <span className="text-xs font-mono">Loading repositories from GitHub...</span>
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="py-20 text-center space-y-3 glass-panel rounded-3xl p-8">
            <p className="text-slate-300 text-sm font-medium">No public repositories matched your search.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('ALL');
              }}
              className="text-xs font-mono text-brand-accent hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="glass-panel rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-2xl group border border-white/5 hover:border-white/15"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[11px] font-mono px-3 py-0.5 rounded-full bg-slate-900/80 border border-white/5 text-brand-teal">
                      {repo.category}
                    </span>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400/40" />
                          {repo.stars}
                        </span>
                      )}
                      {repo.forks > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" />
                          {repo.forks}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-100 font-display mb-2 group-hover:text-brand-accent transition-colors">
                    {repo.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300/80 leading-relaxed mb-4 line-clamp-3">
                    {repo.description || 'Public engineering repository and experimentation codebase on GitHub.'}
                  </p>

                  {/* Topics */}
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {repo.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 rounded bg-slate-950/60 text-slate-400 text-[10px] font-mono border border-white/5"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Info & Links */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    {repo.language && (
                      <span className="flex items-center gap-1 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-brand-teal" />
                        {repo.language}
                      </span>
                    )}
                    <span className="text-slate-500">• {repo.relativeTime}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-brand-accent hover:text-cyan-300 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-300 hover:text-brand-accent transition-colors flex items-center gap-1"
                      title="View on GitHub"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="mt-16 pt-8 border-t border-white/5 flex justify-center">
          <button
            type="button"
            onClick={onBack}
            className="glass-pill px-6 py-3 rounded-2xl flex items-center gap-2 text-xs font-mono font-semibold text-slate-200 hover:text-brand-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO MAIN PORTFOLIO</span>
          </button>
        </div>
      </div>
    </div>
  );
};
