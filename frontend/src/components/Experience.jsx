import { useState, useEffect } from 'react';
import { fetchExperiences } from '../api/experienceApi';
import { Briefcase, Calendar, MapPin, Zap, Code, Terminal, Users } from 'lucide-react';
import TextEffect from './motion/TextEffect';
import './Experience.css';

const getIcon = (type) => {
    switch (type) {
        case 'Internship': return <Briefcase size={18} />;
        case 'Academic Project': return <Code size={18} />;
        case 'Hackathon': return <Zap size={18} />;
        case 'Freelance': return <Terminal size={18} />;
        case 'Leadership': return <Users size={18} />;
        default: return <Briefcase size={18} />;
    }
};

const typeColors = {
    'Internship': 'exp-blue',
    'Academic Project': 'exp-purple',
    'Hackathon': 'exp-yellow',
    'Freelance': 'exp-cyan',
    'Leadership': 'exp-green',
};

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExperiences()
            .then(data => setExperiences(data))
            .catch(err => {
                console.error('Error loading experiences:', err);
                setError('Failed to load experience.');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="section-container">
            <TextEffect 
                text="Experience & Journey"
                preset="blur-slide"
                as="h2"
                className="section-title"
                delay={0.1}
            />
            <TextEffect 
                text="Professional internships, projects, and community contributions."
                preset="fade"
                as="p"
                className="section-subtitle"
                delay={0.4}
                stagger={0.02}
            />

            {loading ? (
                <div className="timeline" role="list">
                    {[1, 2].map((item) => (
                        <div key={item} className="timeline-item" role="listitem">
                            <div className="timeline-dot" aria-hidden="true">
                                <div className="dot-inner">
                                    <Briefcase size={18} />
                                </div>
                                <div className="dot-ring" />
                            </div>
                            <div className="timeline-card glass-card">
                                <div className="skeleton" style={{ height: '1.25rem', width: '45%', marginBottom: '0.75rem', borderRadius: '0.5rem' }} />
                                <div className="skeleton" style={{ height: '0.9rem', width: '65%', marginBottom: '0.5rem', borderRadius: '0.5rem' }} />
                                <div className="skeleton" style={{ height: '0.9rem', width: '80%', borderRadius: '0.5rem' }} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>{error}</p>
            ) : experiences.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No experience entries yet.</p>
            ) : (
                <div className="timeline" role="list">
                    {experiences.map((exp) => (
                        <div
                            key={exp._id}
                            className="timeline-item"
                            role="listitem"
                        >
                            {/* Timeline dot */}
                            <div className={`timeline-dot ${typeColors[exp.type] || ''}`} aria-hidden="true">
                                <div className="dot-inner">
                                    {getIcon(exp.type)}
                                </div>
                                <div className="dot-ring" />
                            </div>

                            {/* Card */}
                            <div className="timeline-card glass-card">
                                <div className="exp-header">
                                    <div className="exp-meta">
                                        <span className={`exp-type-badge ${typeColors[exp.type] || ''}`}>
                                            {exp.type}
                                        </span>
                                        <h3 className="exp-title">{exp.title}</h3>
                                        <div className="exp-company-row">
                                            <span className="exp-company">{exp.company}</span>
                                            {exp.location && (
                                                <span className="exp-location">
                                                    <MapPin size={12} aria-hidden="true" />
                                                    {exp.location}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="exp-duration">
                                        <Calendar size={13} aria-hidden="true" />
                                        <time>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</time>
                                    </div>
                                </div>

                                {exp.description && (
                                    <div className="exp-description">
                                        {exp.description.split('\n').filter(Boolean).map((line, j) => (
                                            <p key={j}>{line}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Experience;
