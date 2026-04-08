import { useState, useEffect } from 'react';
import { fetchAchievements } from '../api/achievementApi';
import { Award, ExternalLink, Trophy, FileBadge, Zap } from 'lucide-react';
import './Achievements.css';

const getIcon = (category) => {
    switch (category) {
        case 'Certification': return <FileBadge size={22} />;
        case 'Hackathon': return <Zap size={22} />;
        case 'Award': return <Trophy size={22} />;
        default: return <Award size={22} />;
    }
};

const categoryColors = {
    'Certification': 'ach-blue',
    'Hackathon': 'ach-yellow',
    'Award': 'ach-gold',
    'default': 'ach-purple',
};

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAchievements()
            .then(data => setAchievements(data))
            .catch(err => {
                console.error('Error loading achievements:', err);
                setError('Failed to load achievements.');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="section-container">
            <h2 className="section-title">
                Achievements & Certifications
            </h2>
            <p className="section-subtitle">
                Milestones, certifications, and recognition from my journey.
            </p>

            {loading ? (
                <div className="achievements-grid" role="list">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="glass-card achievement-card" role="listitem">
                            <div className="skeleton" style={{ height: '2rem', width: '2rem', borderRadius: '0.5rem', marginBottom: '1rem' }} />
                            <div className="skeleton" style={{ height: '0.85rem', width: '40%', marginBottom: '0.75rem', borderRadius: '0.5rem' }} />
                            <div className="skeleton" style={{ height: '1rem', width: '80%', marginBottom: '0.75rem', borderRadius: '0.5rem' }} />
                            <div className="skeleton" style={{ height: '0.9rem', width: '60%', borderRadius: '0.5rem' }} />
                        </div>
                    ))}
                </div>
            ) : error ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>{error}</p>
            ) : achievements.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No achievements added yet.</p>
            ) : (
                <div className="achievements-grid" role="list">
                    {achievements.map((item) => (
                        <div
                            key={item._id}
                            className={`glass-card achievement-card ${categoryColors[item.category] || 'ach-purple'}`}
                            role="listitem"
                        >
                            <div className="achievement-icon">
                                {getIcon(item.category)}
                            </div>

                            <div className="achievement-content">
                                <span className="achievement-cat">{item.category}</span>
                                <h3 className="achievement-title">{item.title}</h3>
                                {item.organization && (
                                    <p className="achievement-org">🏢 {item.organization}</p>
                                )}
                                {item.date && (
                                    <p className="achievement-date">📅 {item.date}</p>
                                )}
                                {item.description && (
                                    <p className="achievement-desc">{item.description}</p>
                                )}
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="achievement-link">
                                        View Certificate <ExternalLink size={12} aria-hidden="true" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Achievements;
