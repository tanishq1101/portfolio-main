import { useProfile } from '../context/ProfileContext';
import './About.css';

const About = () => {
    const { profile, loading, error } = useProfile();

    if (loading) return (
        <div className="section-container">
            <div className="skeleton skeleton-text" style={{ width: '160px', height: '36px', marginBottom: '16px' }} />
            <div className="skeleton skeleton-text" style={{ width: '300px', height: '20px', marginBottom: '32px' }} />
            <div className="about-grid">
                <div className="skeleton" style={{ height: '160px', borderRadius: '1rem' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="skeleton" style={{ height: '80px', borderRadius: '1rem' }} />
                    <div className="skeleton" style={{ height: '80px', borderRadius: '1rem' }} />
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="section-container">
            <p style={{ color: 'var(--text-muted)' }}>Could not load about data.</p>
        </div>
    );

    const bio = profile?.bio || 'A passionate developer who loves building great products.';
    const interests = profile?.interests || [];
    const strengths = profile?.strengths || [];
    const location = profile?.location || '';
    const email = profile?.email || '';

    return (
        <div className="section-container">
            <h2 className="section-title">
                About Me
            </h2>
            <p className="section-subtitle">
                Get to know me and what drives my passion for technology.
            </p>

            <div className="about-grid">
                {/* Bio card */}
                <div className="glass-card about-bio-card">
                    <div className="about-bio-header">
                        <span className="about-bio-icon" aria-hidden="true">👋</span>
                        <h3 className="about-bio-label">My Story</h3>
                    </div>
                    <p className="about-bio-text">{bio}</p>

                    {/* Quick info pills */}
                    <div className="about-quick-info">
                        {location && (
                            <div className="about-info-pill">
                                <span aria-hidden="true">📍</span>
                                <span>{location}</span>
                            </div>
                        )}
                        {email && (
                            <div className="about-info-pill">
                                <span aria-hidden="true">📧</span>
                                <a href={`mailto:${email}`}>{email}</a>
                            </div>
                        )}
                        <div className="about-info-pill">
                            <span aria-hidden="true">🟢</span>
                            <span>Open to opportunities</span>
                        </div>
                    </div>
                </div>

                <div className="about-details">
                    {/* Interests */}
                    {interests.length > 0 && (
                        <div className="glass-card about-detail-card">
                            <h3 className="about-detail-title">
                                <span aria-hidden="true">💡</span> Interests
                            </h3>
                            <div className="tag-list" role="list">
                                {interests.map((item, i) => (
                                    <span key={i} className="tag" role="listitem">{item}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Strengths */}
                    {strengths.length > 0 && (
                        <div className="glass-card about-detail-card">
                            <h3 className="about-detail-title">
                                <span aria-hidden="true">⚡</span> Strengths
                            </h3>
                            <div className="tag-list" role="list">
                                {strengths.map((item, i) => (
                                    <span key={i} className="tag tag-cyan" role="listitem">{item}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* If no interests/strengths, show CTA */}
                    {interests.length === 0 && strengths.length === 0 && (
                        <div className="glass-card about-detail-card">
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Add interests and strengths from the admin panel.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default About;
