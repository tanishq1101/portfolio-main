import { useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { useProfile } from './context/ProfileContext';
import './App.css';

// Landing Page
import LandingPage from './pages/LandingPage';

// Public component imports
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import CodingProfiles from './components/CodingProfiles';
import Contact from './components/Contact';
import Achievements from './components/Achievements';
import Experience from './components/Experience';

// Auth pages (Clerk)
import SignInPage from './pages/admin/SignInPage';
import SignUpPage from './pages/admin/SignUpPage';

// Admin Imports
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import ProjectsAdmin from './components/admin/Projects/ProjectsAdmin';
import SkillsAdmin from './components/admin/Skills/SkillsAdmin';
import EducationAdmin from './components/admin/Education/EducationAdmin';
import ProfileAdmin from './components/admin/Profile/ProfileAdmin';
import MessagesAdmin from './components/admin/Messages/MessagesAdmin';
import AchievementsAdmin from './components/admin/Achievements/AchievementsAdmin';
import ExperienceAdmin from './components/admin/Experience/ExperienceAdmin';
import MediaAdmin from './components/admin/Media/MediaAdmin';

const queryClient = new QueryClient();

// Error Boundary for catching runtime crashes
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: 'white', background: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: '#00D9FF' }}>Something went wrong.</h2>
          <pre style={{ opacity: 0.6, fontSize: '0.8rem', marginTop: '20px' }}>{this.state.error?.toString()}</pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px', background: '#00D9FF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Enhanced Navbar Component
const Navbar = ({ navName }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">{navName}</div>
        <div className="navbar-right">
          <nav>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
            <a href="/admin" className="nav-admin-btn">Admin</a>
          </nav>
          <button
            className={`hamburger-btn ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </header>
      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>✕</button>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>
        ))}
        <a href="/admin" className="btn-primary" style={{ marginTop: '1rem' }}>Admin Panel</a>
      </nav>
    </>
  );
};

// Site Footer
const Footer = ({ navName, profile }) => (
  <footer className="site-footer">
    <div className="footer-inner">
      <div className="footer-logo">{navName}</div>
      <div className="footer-social">
        {profile?.socialLinks?.github && <a href={profile.socialLinks.github} className="footer-social-link">GH</a>}
        {profile?.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} className="footer-social-link">LI</a>}
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} {navName}. Built with Ether</p>
    </div>
  </footer>
);

// Home Content Component (the actual portfolio)
const HomeContent = ({ navName, profile }) => {
  const sections = [
    { id: 'hero', content: <Hero /> },
    { id: 'about', content: <About /> },
    { id: 'experience', content: <Experience /> },
    { id: 'skills', content: <Skills /> },
    { id: 'projects', content: <Projects /> },
    { id: 'achievements', content: <Achievements /> },
    { id: 'education', content: <Education /> },
    { id: 'coding-profiles', content: <CodingProfiles /> },
    { id: 'contact', content: <Contact /> },
  ];

  return (
    <div className="app-container">
      <Navbar navName={navName} />
      <ErrorBoundary>
        <main>
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              {section.content}
            </section>
          ))}
        </main>
        <div id="footer">
          <Footer navName={navName} profile={profile} />
        </div>
      </ErrorBoundary>
    </div>
  );
};

// Auth-gated portfolio wrapper
const PortfolioRoute = () => {
  const { profile, loading, error } = useProfile();
  const isClerkConfigured = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

  if (loading) return <div className="loading-screen">Initializing Portfolio...</div>;
  if (error) return <div className="loading-error" style={{ color: 'white', textAlign: 'center', padding: '100px' }}>{error}</div>;

  const navName = profile?.name ? profile.name.split(' ')[0] : 'Portfolio';

  // If Clerk is configured, gate behind sign-in
  if (isClerkConfigured) {
    return (
      <>
        <SignedIn>
          <HomeContent navName={navName} profile={profile} />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    );
  }

  // If Clerk is not configured, show portfolio openly
  return <HomeContent navName={navName} profile={profile} />;
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Landing page at root */}
            <Route path="/" element={<LandingPage />} />

            {/* Portfolio (auth-gated) */}
            <Route path="/portfolio" element={<PortfolioRoute />} />

            {/* Auth routes */}
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />

            {/* Admin routes (unchanged) */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/admin/projects" replace />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="skills" element={<SkillsAdmin />} />
              <Route path="education" element={<EducationAdmin />} />
              <Route path="profile" element={<ProfileAdmin />} />
              <Route path="messages" element={<MessagesAdmin />} />
              <Route path="achievements" element={<AchievementsAdmin />} />
              <Route path="experience" element={<ExperienceAdmin />} />
              <Route path="media" element={<MediaAdmin />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
