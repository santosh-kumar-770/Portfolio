export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  tagline: string;
  description: string;
  technologies: string[];
  highlights?: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  featured: boolean;
  status?: 'Live' | 'In Progress' | 'Open Source';
  category: 'Full Stack' | 'AI / Machine Learning' | 'Systems & APIs' | 'Web Platform';
}

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  relativeTime: string;
  topics: string[];
  isFork: boolean;
  isArchived: boolean;
  category: 'Python' | 'JavaScript' | 'HTML/CSS' | 'AI/ML' | 'Other';
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  total: number;
  contributions: ContributionDay[];
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: 'Internship' | 'Leadership' | 'Volunteering' | 'Education & Learning';
  description: string;
  location?: string;
  skills: string[];
}

export interface SkillGroup {
  group: 'LANGUAGES' | 'FRAMEWORKS / TOOLS' | 'AREAS';
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  score?: string;
  highlights?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  url?: string;
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  badge: string;
  taglineHeadline: string[];
  intro: string;
  supportingStatement: string;
  detailedBio: string[];
  currentlyExploring: string[];
  statusText: string;
  availableForOpportunities: boolean;
  email: string;
  githubUsername: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  resumePdfPath: string;
  profileImagePath: string;
  educationList: EducationItem[];
  certifications: CertificationItem[];
}
