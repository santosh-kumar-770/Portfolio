import React, { useState, useEffect, useMemo } from 'react';
import type { ContributionData, ContributionDay } from '../types';
import { fetchContributions, GITHUB_USERNAME } from '../services/github';
import { GitCommit, Sparkles, Loader2, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export const ContributionCalendar: React.FC = () => {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        const result = await fetchContributions(GITHUB_USERNAME);
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load contributions:', err);
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Format date nicely (e.g. "Aug 30, 2026")
  const formatDate = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Group contributions into 52-53 columns of 7 days (Sun=0 to Sat=6)
  const { weeks, monthLabels } = useMemo(() => {
    if (!data || !data.contributions || data.contributions.length === 0) {
      return { weeks: [], monthLabels: [] };
    }

    const contribs = data.contributions;
    const computedWeeks: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    // Determine the day of week of the first entry (0=Sun, 6=Sat)
    const firstDateStr = contribs[0].date;
    const [fy, fm, fd] = firstDateStr.split('-').map(Number);
    const firstDayOfWeek = new Date(fy, fm - 1, fd).getDay();

    // Fill initial padding for the first week
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    contribs.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        computedWeeks.push(currentWeek);
        currentWeek = [];
      }
    });

    // Push trailing week if exists
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      computedWeeks.push(currentWeek);
    }

    // Calculate month label positions
    const labels: { month: string; colIndex: number }[] = [];
    let lastMonth = -1;

    computedWeeks.forEach((wk, colIdx) => {
      const validDay = wk.find((d) => d !== null);
      if (validDay) {
        const [, m] = validDay.date.split('-').map(Number);
        if (m !== lastMonth) {
          const monthName = new Date(2026, m - 1, 1).toLocaleDateString('en-US', { month: 'short' });
          labels.push({ month: monthName, colIndex: colIdx });
          lastMonth = m;
        }
      }
    });

    return { weeks: computedWeeks, monthLabels: labels };
  }, [data]);

  const getLevelClasses = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-950/90 border-emerald-500/40 hover:border-emerald-400';
      case 2:
        return 'bg-emerald-700/90 border-emerald-400/50 hover:border-emerald-300';
      case 3:
        return 'bg-emerald-500 border-emerald-300/60 shadow-sm shadow-emerald-500/20 hover:scale-110';
      case 4:
        return 'bg-emerald-400 border-emerald-200 shadow-md shadow-emerald-400/40 hover:scale-110';
      case 0:
      default:
        return 'bg-slate-900/60 border-white/[0.04] hover:border-white/20';
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl mb-12 border border-white/10 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute -right-20 -top-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 text-brand-teal font-mono text-xs uppercase tracking-wider mb-1.5">
            <GitCommit className="w-3.5 h-3.5" />
            <span>GitHub Contribution Calendar</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
            Activity &amp; Commit History
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="glass-pill px-4 py-1.5 rounded-full text-xs font-mono text-emerald-400 flex items-center gap-1.5 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-bold text-slate-100">{data?.total ?? 0}</span>
            <span>contributions in last year</span>
          </div>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-chip px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>@{GITHUB_USERNAME}</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>

      {/* Interactive Tooltip Status Display */}
      <div className="h-6 mb-3 flex items-center text-xs font-mono">
        {hoveredDay ? (
          <span className="text-slate-200 animate-fadeIn">
            <span className="text-brand-accent font-bold">
              {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
            </span>{' '}
            on <span className="text-slate-300">{formatDate(hoveredDay.date)}</span>
          </span>
        ) : (
          <span className="text-slate-500">
            Hover or tap any square to inspect daily contributions
          </span>
        )}
      </div>

      {/* Heatmap Grid in Scrollable Container */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin text-brand-teal" />
          <span className="text-xs font-mono">Loading GitHub contribution matrix...</span>
        </div>
      ) : weeks.length === 0 ? (
        <div className="py-10 text-center text-xs font-mono text-slate-500">
          Contribution calendar currently unavailable. View directly on GitHub.
        </div>
      ) : (
        <div className="overflow-x-auto pb-4 scrollbar-thin">
          <div className="min-w-[720px] max-w-full">
            {/* Month Labels */}
            <div className="flex text-[10px] font-mono text-slate-500 mb-2 pl-7 relative h-4">
              {monthLabels.map((lbl, idx) => (
                <span
                  key={idx}
                  className="absolute"
                  style={{ left: `${lbl.colIndex * 14 + 28}px` }}
                >
                  {lbl.month}
                </span>
              ))}
            </div>

            {/* Matrix (Day of week on left + 52-53 week columns) */}
            <div className="flex gap-1.5 items-start">
              {/* Day of Week Labels (Mon, Wed, Fri) */}
              <div className="flex flex-col gap-1 text-[9px] font-mono text-slate-500 pr-1 select-none pt-0.5">
                <span className="h-3 leading-3 opacity-0">Sun</span>
                <span className="h-3 leading-3">Mon</span>
                <span className="h-3 leading-3 opacity-0">Tue</span>
                <span className="h-3 leading-3">Wed</span>
                <span className="h-3 leading-3 opacity-0">Thu</span>
                <span className="h-3 leading-3">Fri</span>
                <span className="h-3 leading-3 opacity-0">Sat</span>
              </div>

              {/* 52-53 Columns */}
              <div className="flex gap-1">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {week.map((day, dIdx) => {
                      if (!day) {
                        return (
                          <div
                            key={dIdx}
                            className="w-3 h-3 rounded-[3px] opacity-0"
                          />
                        );
                      }

                      return (
                        <button
                          key={dIdx}
                          type="button"
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          onClick={() => setHoveredDay(day)}
                          className={`w-3 h-3 rounded-[3px] border transition-all duration-150 cursor-pointer ${getLevelClasses(
                            day.level
                          )}`}
                          aria-label={`${day.count} contributions on ${day.date}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend & Meta Footer */}
      <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-500">
        <span className="text-[11px]">
          Real-time calendar synced with GitHub public profile
        </span>

        {/* Legend */}
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-900/60 border border-white/[0.04]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-950/90 border border-emerald-500/40" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-700/90 border border-emerald-400/50" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 border border-emerald-300/60" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 border border-emerald-200" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
