import React, { useState, useEffect } from 'react';
import type { GitHubRepo } from '../types';
import { fetchPublicRepos, GITHUB_USERNAME } from '../services/github';
import { Star, GitFork, ArrowRight, ArrowUpRight, Sparkles, Loader2, Code2 } from 'lucide-react';
import { GithubIcon } from './Icons';

interface GitHubSectionProps {
  onOpenLibrary: () => void;
}

export const GitHubSection: React.FC<GitHubSectionProps> = ({ onOpenLibrary }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
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
        console.error('GitHub fetch error in GitHubSection:', err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    }
    loadRepos();
    return () => {
      isMounted = false;
    };
  }, []);

  // Display top 3-4 most recent public repositories on the main page
  const displayRepos = repos.slice(0, 4);

  return (
    <section id="github-feed" className="py-24 px-6 sm:px-8 relative border-t border-slate-900/80 bg-[#05070c]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-teal font-mono text-xs uppercase tracking-wider mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
              03 // Live Repositories Feed
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-100 tracking-tight uppercase">
              More from GitHub.
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-sm font-mono text-slate-400 max-w-sm md:text-right">
              Live sync with public repositories on GitHub. Updates automatically when new codebases are created.
            </p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-brand-accent hover:underline flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>github.com/{GITHUB_USERNAME}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Dynamic Repos Grid */}
        {loading ? (
          <div className="py-16 glass-panel rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-brand-teal" />
            <span className="text-xs font-mono">Syncing public repositories from @{GITHUB_USERNAME}...</span>
          </div>
        ) : error || displayRepos.length === 0 ? (
          <div className="py-12 glass-panel rounded-3xl text-center space-y-4 p-8">
            <p className="text-slate-300 text-sm font-medium">
              Explore public engineering repositories directly on GitHub.
            </p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold font-mono"
            >
              <GithubIcon className="w-4 h-4" />
              <span>VISIT GITHUB PROFILE ↗</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {displayRepos.map((repo) => (
              <div
                key={repo.id}
                className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-2xl group border border-white/5 hover:border-white/15"
              >
                <div>
                  {/* Top Bar: Language & Category Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-900/90 border border-white/5 text-brand-teal group-hover:text-brand-accent transition-colors">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-100 font-display group-hover:text-brand-accent transition-colors">
                        {repo.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-900/80 border border-white/5 text-slate-300">
                      {repo.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-4 line-clamp-2">
                    {repo.description || 'Public engineering repository and experimentation codebase on GitHub.'}
                  </p>

                  {/* Topics/Tags */}
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-0.5 rounded-md bg-slate-950/60 text-slate-400 text-[10px] font-mono border border-white/5"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer: Language, Stars, Forks, Last Updated & GitHub Link */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3 text-slate-400">
                    {repo.language && (
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-brand-teal" />
                        {repo.language}
                      </span>
                    )}
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400/40" />
                        {repo.stars}
                      </span>
                    )}
                    {repo.forks > 0 && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forks}
                      </span>
                    )}
                    <span className="text-slate-500 hidden sm:inline">• {repo.relativeTime}</span>
                  </div>

                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-brand-accent transition-colors group/link text-xs font-semibold"
                  >
                    <span>View on GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Prominent Glass "SEE ALL PROJECTS →" Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onOpenLibrary}
            className="glass-pill px-8 py-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-bold font-mono text-slate-100 hover:text-brand-accent hover:border-brand-teal/40 transition-all shadow-xl hover:shadow-brand-teal/10 group active:scale-[0.98]"
          >
            <span>SEE ALL PROJECTS {repos.length > 0 ? `(${repos.length})` : ''}</span>
            <ArrowRight className="w-4 h-4 text-brand-teal group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
