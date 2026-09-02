import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { GitHubSection } from './components/GitHubSection';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { ResumeSection } from './components/ResumeSection';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectsLibrary } from './components/ProjectsLibrary';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { getAdminSession } from './services/api';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [currentView, setCurrentView] = useState<'portfolio' | 'projects' | 'admin'>('portfolio');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  // Check admin session with backend
  useEffect(() => {
    async function checkAuth() {
      const isAuth = await getAdminSession();
      setIsAdminAuthenticated(isAuth);
      setAuthChecking(false);
    }
    checkAuth();
  }, []);

  // Sync route / hash
  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path === '/admin' || hash === '#admin') {
        setCurrentView('admin');
      } else if (hash === '#all-projects' || hash === '#projects-library') {
        setCurrentView('projects');
      } else {
        setCurrentView('portfolio');
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  // Scroll spy on main portfolio
  useEffect(() => {
    if (currentView !== 'portfolio') return;

    const sections = ['hero', 'about', 'work', 'github-feed', 'experience', 'skills', 'resume', 'education', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleOpenLibrary = () => {
    setCurrentView('projects');
    window.location.hash = '#all-projects';
  };

  const handleBackToPortfolio = () => {
    setCurrentView('portfolio');
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname.replace('/admin', '/'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Projects Library View
  if (currentView === 'projects') {
    return <ProjectsLibrary onBack={handleBackToPortfolio} />;
  }

  // Render Admin View
  if (currentView === 'admin') {
    if (authChecking) {
      return (
        <div className="min-h-screen bg-[#05070c] flex items-center justify-center text-slate-400 font-mono text-xs">
          Verifying backend security session...
        </div>
      );
    }

    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onSuccess={() => setIsAdminAuthenticated(true)}
          onBack={handleBackToPortfolio}
        />
      );
    }

    return (
      <AdminDashboard
        onLogout={() => setIsAdminAuthenticated(false)}
        onBackToPortfolio={handleBackToPortfolio}
      />
    );
  }

  // Main Public Portfolio View
  return (
    <div className="min-h-screen bg-[#05070c] bg-radial-atmosphere text-slate-100 flex flex-col selection:bg-brand-teal/20 selection:text-brand-accent">
      <Navbar activeSection={activeSection} />
      
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <GitHubSection onOpenLibrary={handleOpenLibrary} />
        <Experience />
        <Skills />
        <ResumeSection />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
