import type { GitHubRepo, ContributionData, ContributionDay } from '../types';

export const GITHUB_USERNAME = 'santosh-kumar-770';
const REPOS_CACHE_KEY = `github_repos_${GITHUB_USERNAME}`;
const CONTRIBUTIONS_CACHE_KEY = `github_contribs_${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Updated today';
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 7) return `Updated ${diffDays}d ago`;
    if (diffDays < 30) return `Updated ${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)}mo ago`;
    return `Updated ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
  } catch {
    return 'Recently active';
  }
}

function categorizeRepo(
  language: string | null,
  topics: string[] = [],
  name: string = '',
  desc: string = ''
): 'Python' | 'JavaScript' | 'HTML/CSS' | 'AI/ML' | 'Other' {
  const content = `${name} ${desc} ${topics.join(' ')} ${language || ''}`.toLowerCase();

  if (
    content.includes('mnist') ||
    content.includes('neural') ||
    content.includes('machine-learning') ||
    content.includes('ai') ||
    content.includes('deep-learning') ||
    content.includes('numpy') ||
    content.includes('model')
  ) {
    return 'AI/ML';
  }
  if (
    language === 'Python' ||
    content.includes('django') ||
    content.includes('flask') ||
    content.includes('fastapi') ||
    content.includes('python')
  ) {
    return 'Python';
  }
  if (
    language === 'JavaScript' ||
    language === 'TypeScript' ||
    content.includes('react') ||
    content.includes('node') ||
    content.includes('vite') ||
    content.includes('js')
  ) {
    return 'JavaScript';
  }
  if (
    language === 'HTML' ||
    language === 'CSS' ||
    content.includes('html') ||
    content.includes('css') ||
    content.includes('tailwind')
  ) {
    return 'HTML/CSS';
  }
  return 'Other';
}

export async function fetchPublicRepos(username: string = GITHUB_USERNAME): Promise<GitHubRepo[]> {
  try {
    const cached = sessionStorage.getItem(REPOS_CACHE_KEY);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL_MS && Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch {
    // Ignore cache error
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      console.warn(`GitHub API returned status ${response.status} for ${username}.`);
      return getCachedReposOrEmpty();
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      return getCachedReposOrEmpty();
    }

    const eligible: GitHubRepo[] = data
      .filter((repo: any) => !repo.fork && !repo.archived && !repo.private)
      .map((repo: any): GitHubRepo => {
        const topics = Array.isArray(repo.topics) ? repo.topics : [];
        const description = repo.description || null;
        return {
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: description,
          htmlUrl: repo.html_url,
          homepage: repo.homepage || null,
          language: repo.language || null,
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          updatedAt: repo.updated_at,
          relativeTime: formatRelativeTime(repo.updated_at),
          topics: topics,
          isFork: repo.fork,
          isArchived: repo.archived,
          category: categorizeRepo(repo.language, topics, repo.name, description || '')
        };
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    try {
      sessionStorage.setItem(REPOS_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: eligible }));
    } catch {
      // Ignore
    }

    return eligible;
  } catch (error) {
    console.error('Failed to fetch dynamic GitHub repositories:', error);
    return getCachedReposOrEmpty();
  }
}

function getCachedReposOrEmpty(): GitHubRepo[] {
  try {
    const cached = sessionStorage.getItem(REPOS_CACHE_KEY);
    if (cached) {
      const { data } = JSON.parse(cached);
      if (Array.isArray(data)) return data;
    }
  } catch {
    // Ignore
  }
  return [];
}

export async function fetchContributions(username: string = GITHUB_USERNAME): Promise<ContributionData> {
  // Check sessionStorage cache
  try {
    const cached = sessionStorage.getItem(CONTRIBUTIONS_CACHE_KEY);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL_MS && data && Array.isArray(data.contributions)) {
        return data;
      }
    }
  } catch {
    // Ignore
  }

  try {
    // Query public GitHub contributions API
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
    if (response.ok) {
      const json = await response.json();
      if (json && Array.isArray(json.contributions)) {
        const total = json.total?.lastYear ?? json.contributions.reduce((acc: number, cur: any) => acc + (cur.count || 0), 0);
        const data: ContributionData = {
          total,
          contributions: json.contributions.map((c: any): ContributionDay => ({
            date: c.date,
            count: Number(c.count || 0),
            level: Math.min(Math.max(Number(c.level || 0), 0), 4) as 0 | 1 | 2 | 3 | 4
          }))
        };

        try {
          sessionStorage.setItem(CONTRIBUTIONS_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
        } catch {
          // Ignore
        }

        return data;
      }
    }
  } catch (err) {
    console.warn('Could not fetch from primary contributions endpoint:', err);
  }

  // Fallback / cached if available
  try {
    const cached = sessionStorage.getItem(CONTRIBUTIONS_CACHE_KEY);
    if (cached) {
      const { data } = JSON.parse(cached);
      if (data && Array.isArray(data.contributions)) return data;
    }
  } catch {
    // Ignore
  }

  // Return empty structure gracefully if network is unavailable
  return { total: 0, contributions: [] };
}
