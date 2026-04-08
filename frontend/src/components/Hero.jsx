import { useProfile } from '../context/ProfileContext';
import DecryptedText from './effects/DecryptedText';
import TextEffect from './motion/TextEffect';
import { getAssetUrl } from '../api/axios';
import './Hero.css';

const Hero = () => {
    const { profile, loading, error } = useProfile();

    if (loading) return (
        <div className="hero-wrapper">
            <div className="hero-content section-container">
                <div className="skeleton" style={{ width: '140px', height: '32px', marginBottom: '16px', borderRadius: '9999px' }} />
                <div className="skeleton skeleton-text" style={{ width: '340px', height: '56px', marginBottom: '12px' }} />
                <div className="skeleton skeleton-text" style={{ width: '260px', height: '32px', marginBottom: '16px' }} />
                <div className="skeleton skeleton-text" style={{ width: '400px', height: '24px', marginBottom: '36px' }} />
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div className="skeleton" style={{ width: '150px', height: '52px', borderRadius: '12px' }} />
                    <div className="skeleton" style={{ width: '130px', height: '52px', borderRadius: '12px' }} />
                </div>
            </div>
            <div className="hero-media-container">
                <div className="skeleton" style={{ width: '340px', height: '340px', borderRadius: '50%' }} />
            </div>
        </div>
    );

    if (error) return (
        <div className="hero-wrapper">
            <div className="hero-content section-container">
                <p style={{ color: 'var(--text-muted)' }}>Could not load profile data.</p>
            </div>
        </div>
    );

    const name = profile?.name || 'Your Name';
    const title = profile?.title || 'Software Developer';
    const tagline = profile?.tagline || 'Building digital experiences that make an impact.';
    const bio = profile?.bio || '';

    return (
        <div className="hero-wrapper">
            {/* Radial glow orbs */}
            <div className="hero-orb hero-orb-1" aria-hidden="true" />
            <div className="hero-orb hero-orb-2" aria-hidden="true" />

            {/* Left column — text */}
            <div className="hero-content section-container">

                {/* Availability badge */}
                <div className="hero-badge">
                    <span className="hero-badge-dot" aria-hidden="true" />
                    Available for Opportunities
                </div>

                {/* Greeting */}
                <TextEffect 
                    text="Hi there, I'm"
                    preset="fade"
                    className="hero-greeting"
                    delay={0.25}
                    duration={0.5}
                />

                {/* Decrypted Name */}
                <h1 className="hero-name">
                    <DecryptedText
                        text={name}
                        speed={40}
                        revealDuration={1400}
                        startDelay={600}
                        encryptedClassName="hero-char-encrypted"
                        revealedClassName="hero-char-revealed"
                    />
                </h1>

                {/* Role title */}
                <TextEffect 
                    text={title}
                    preset="blur-slide"
                    className="hero-title"
                    as="h2"
                    delay={0.65}
                    duration={0.6}
                    stagger={0.03}
                />

                {/* Tagline */}
                <TextEffect 
                    text={tagline || bio || 'Passionate about creating elegant solutions to complex problems.'}
                    preset="fade"
                    className="hero-tagline"
                    as="p"
                    delay={0.8}
                    duration={0.8}
                    stagger={0.02}
                />

                {/* CTA Buttons */}
                <div className="hero-cta">
                    <a href="#projects" className="btn-primary">
                        View Projects
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </a>
                    <a href="#contact" className="btn-outline">Contact Me</a>
                </div>

                {/* Scroll indicator */}
                <div className="hero-scroll-hint" aria-label="Scroll down">
                    <div className="hero-scroll-line" />
                    <span>Scroll</span>
                </div>
            </div>

            {/* Right column — profile photo / avatar */}
            <div className="hero-media-container">
                <div className="hero-photo-ring">
                    {profile?.profilePhoto ? (
                        <img
                            src={getAssetUrl(profile.profilePhoto)}
                            alt={`${name} — profile photo`}
                            className="hero-profile-img"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.classList.add('fallback-mode');
                            }}
                        />
                    ) : (
                        <div className="hero-avatar-fallback" aria-label="Default avatar">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                    )}
                    {/* Decorative ring glow */}
                    <div className="hero-photo-glow" aria-hidden="true" />
                </div>

                {/* Floating stat chips */}
                <div className="hero-stat hero-stat-1">
                    <span className="hero-stat-icon">⚡</span>
                    <div>
                        <div className="hero-stat-value">Full Stack</div>
                        <div className="hero-stat-label">Developer</div>
                    </div>
                </div>

                <div className="hero-stat hero-stat-2">
                    <span className="hero-stat-icon">🚀</span>
                    <div>
                        <div className="hero-stat-value">Open to</div>
                        <div className="hero-stat-label">Collaborations</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
