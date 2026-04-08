import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  const features = [
    {
      icon: '🎨',
      title: 'Stunning Design',
      description: 'A modern, dark-themed portfolio built with attention to every pixel. Smooth animations and premium aesthetics throughout.',
    },
    {
      icon: '⚡',
      title: 'High Performance',
      description: 'Blazing-fast load times powered by Vite and React. Optimized rendering ensures a seamless browsing experience.',
    },
    {
      icon: '🛡️',
      title: 'Secure Admin Panel',
      description: 'Full-featured CMS with Clerk authentication. Manage projects, skills, experience and more from one dashboard.',
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Pixel-perfect layouts across every device. From ultra-wide monitors to mobile screens — it all just works.',
    },
    {
      icon: '🗄️',
      title: 'PostgreSQL Powered',
      description: 'Enterprise-grade Neon PostgreSQL database ensures reliable data persistence with serverless scalability.',
    },
    {
      icon: '🚀',
      title: 'Easy Deployment',
      description: 'Production-ready architecture with separate frontend and backend. Deploy anywhere with zero configuration headaches.',
    },
  ];

  const testimonials = [
    {
      name: 'Arjun Mehta',
      role: 'Senior Engineer at Microsoft',
      text: '"The attention to detail is remarkable. This portfolio showcases not just projects, but a genuine passion for clean code and modern design principles."',
      initials: 'AM',
    },
    {
      name: 'Sarah Chen',
      role: 'Tech Lead at Google',
      text: '"I\'ve reviewed hundreds of developer portfolios and this one stands out. The architecture is clean, the UI is polished, and the admin panel is genuinely impressive."',
      initials: 'SC',
    },
    {
      name: 'Ravi Patel',
      role: 'CTO at Stealth Startup',
      text: '"More than just a portfolio — it\'s a complete full-stack demonstration. The PostgreSQL integration and Clerk auth show real production-level thinking."',
      initials: 'RP',
    },
  ];

  return (
    <div className="landing-page">
      {/* ===== NAVBAR ===== */}
      <header className={`landing-navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="landing-nav-logo">Portfolio</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <nav className="landing-nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
            <Link to="/sign-in" className="landing-nav-signin">Admin Sign In</Link>
          </nav>
          <button className="landing-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ===== MOBILE NAV ===== */}
      <nav className={`landing-mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="landing-mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>
        ))}
        <Link to="/portfolio" className="landing-btn-primary" style={{ marginTop: '1rem' }} onClick={() => setMobileOpen(false)}>
          View Portfolio →
        </Link>
        <Link to="/sign-in" className="landing-btn-outline" onClick={() => setMobileOpen(false)}>
          Admin Sign In
        </Link>
      </nav>

      {/* ===== HERO ===== */}
      <section className="landing-hero">
        <div className="landing-hero-bg" aria-hidden="true">
          <div className="landing-hero-orb landing-hero-orb-1" />
          <div className="landing-hero-orb landing-hero-orb-2" />
          <div className="landing-hero-orb landing-hero-orb-3" />
        </div>
        <div className="landing-hero-content">
          <div className="landing-hero-badge">
            <span className="landing-hero-badge-dot" />
            Full-Stack Developer Portfolio
          </div>
          <h1>
            Crafting Digital <span>Experiences</span> That Matter
          </h1>
          <p className="landing-hero-subtitle">
            Welcome to my professional portfolio — a showcase of projects, skills, and experiences
            built with modern technologies and a passion for clean, impactful code.
          </p>
          <div className="landing-hero-actions">
            <Link to="/portfolio" className="landing-btn-primary">
              View Portfolio →
            </Link>
            <a href="#about" className="landing-btn-outline">
              Learn More
            </a>
          </div>
          <div className="landing-stats">
            <div className="landing-stat">
              <div className="landing-stat-number">15+</div>
              <div className="landing-stat-label">Projects Built</div>
            </div>
            <div className="landing-stat">
              <div className="landing-stat-number">10+</div>
              <div className="landing-stat-label">Technologies</div>
            </div>
            <div className="landing-stat">
              <div className="landing-stat-number">5+</div>
              <div className="landing-stat-label">Certifications</div>
            </div>
            <div className="landing-stat">
              <div className="landing-stat-number">3+</div>
              <div className="landing-stat-label">Years Coding</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT / FEATURES ===== */}
      <section className="landing-section" id="about">
        <div className="landing-container">
          <div className="landing-section-header">
            <div className="landing-section-tag">About This Portfolio</div>
            <h2 className="landing-section-title">
              Built With <span>Modern Tech</span>
            </h2>
            <p className="landing-section-desc">
              This portfolio is more than a static page — it's a full-stack application with a powerful
              admin panel, real-time content management, and enterprise-grade authentication.
            </p>
          </div>
          <div className="landing-features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="landing-feature-card">
                <div className="landing-feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="landing-section" id="testimonials" style={{ background: 'rgba(0, 217, 255, 0.01)' }}>
        <div className="landing-container">
          <div className="landing-section-header">
            <div className="landing-section-tag">Testimonials</div>
            <h2 className="landing-section-title">
              What People <span>Say</span>
            </h2>
            <p className="landing-section-desc">
              Feedback from colleagues, mentors, and industry professionals who have reviewed my work.
            </p>
          </div>
          <div className="landing-testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="landing-testimonial-card">
                <div className="landing-testimonial-stars">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <p className="landing-testimonial-text">{t.text}</p>
                <div className="landing-testimonial-author">
                  <div className="landing-testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="landing-testimonial-name">{t.name}</div>
                    <div className="landing-testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="landing-cta" id="contact">
        <div className="landing-container">
          <div className="landing-cta-card">
            <h2>Ready to <span>Explore</span>?</h2>
            <p>
              Sign in to access the full portfolio — view detailed projects, skills breakdown,
              coding profiles, and get in touch directly.
            </p>
            <Link to="/portfolio" className="landing-btn-primary">
              Get Started →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-top">
            <div className="landing-footer-brand">
              <h3>PORTFOLIO</h3>
              <p>
                A full-stack developer portfolio showcasing projects, skills, and professional experience.
                Built with React, Express, and PostgreSQL.
              </p>
              <div className="landing-footer-social">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GH</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LI</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">TW</a>
              </div>
            </div>
            <div className="landing-footer-col">
              <h4>Portfolio</h4>
              <Link to="/portfolio#projects">Projects</Link>
              <Link to="/portfolio#skills">Skills</Link>
              <Link to="/portfolio#experience">Experience</Link>
            </div>
            <div className="landing-footer-col">
              <h4>Navigation</h4>
              <a href="#about">About</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="landing-footer-col">
              <h4>Admin</h4>
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </div>
          </div>
          <div className="landing-footer-bottom">
            <div className="landing-footer-copy">
              © {new Date().getFullYear()} Portfolio. All rights reserved.
            </div>
            <div className="landing-footer-bottom-links">
              <a href="#about">Privacy Policy</a>
              <a href="#about">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
