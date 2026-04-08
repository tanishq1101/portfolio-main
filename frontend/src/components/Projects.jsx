import { useState, useEffect } from 'react';
import { fetchProjects } from '../api/projectApi';
import { getAssetUrl } from '../api/axios';
import { ExternalLink, Github, Star } from 'lucide-react';
import TextEffect from './motion/TextEffect';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects()
      .then(data => setProjects(data))
      .catch(err => {
        console.error('Error loading projects:', err);
        setError('Failed to load projects.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section-container">
      <TextEffect 
        text="Selection of Work"
        preset="blur-slide"
        as="h2"
        className="section-title"
        delay={0.1}
        stagger={0.03}
      />

      <TextEffect 
        text="Refining complexity into intuitive digital instruments."
        preset="fade"
        as="p"
        className="section-subtitle"
        delay={0.4}
        stagger={0.02}
      />

      {loading ? (
        <div className="projects-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton" style={{ height: '380px', borderRadius: '1rem' }} />
          ))}
        </div>
      ) : error ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>{error}</p>
      ) : projects.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No projects added yet.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <article
              key={project._id}
              className="project-card glass-card"
            >
              {/* Project image */}
              <div className="project-image-wrapper">
                {project.images?.[0] ? (
                  <img
                    src={getAssetUrl(project.images[0])}
                    alt={`${project.title} screenshot`}
                    className="project-img"
                    loading="lazy"
                  />
                ) : (
                  <div className="project-img-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  </div>
                )}
                {/* Overlay with actions */}
                <div className="project-overlay" aria-hidden="true">
                  <div className="project-overlay-actions">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-action-btn" aria-label="View source code">
                        <Github size={16} /> Code
                      </a>
                    )}
                    {project.liveDemoLink && (
                      <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="project-action-btn project-action-primary" aria-label="View live demo">
                        <ExternalLink size={16} /> Live
                      </a>
                    )}
                  </div>
                </div>
                {project.featured && (
                  <div className="project-featured-badge">
                    <Star size={10} fill="currentColor" /> Featured
                  </div>
                )}
              </div>

              {/* Project info */}
              <div className="project-info">
                {project.category && (
                  <span className="project-category">{project.category}</span>
                )}
                <h3 className="project-title">{project.title}</h3>
                {project.description && (
                  <p className="project-desc">{project.description}</p>
                )}
                {project.technologies?.length > 0 && (
                  <div className="project-tags" aria-label="Technologies used">
                    {project.technologies.slice(0, 5).map((tech, i) => (
                      <span key={i} className="tag">{tech}</span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="tag tag-more">+{project.technologies.length - 5}</span>
                    )}
                  </div>
                )}
                <div className="project-footer-links">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-text-link">
                      <Github size={14} /> GitHub
                    </a>
                  )}
                  {project.liveDemoLink && (
                    <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="project-text-link project-text-link-primary">
                      <ExternalLink size={14} /> Live Demo →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
