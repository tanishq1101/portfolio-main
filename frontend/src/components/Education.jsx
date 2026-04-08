import { useState, useEffect } from 'react';
import { fetchEducation } from '../api/educationApi';
import { GraduationCap, BookOpen } from 'lucide-react';
import './Education.css';

const Education = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEducation()
            .then(data => setEducation(data))
            .catch(err => {
                console.error('Error loading education:', err);
                setError('Failed to load education data.');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="section-container">
            <h2 className="section-title">
                Education
            </h2>
            <p className="section-subtitle">
                My academic journey and relevant coursework.
            </p>

            {loading ? (
                <div className="edu-grid">
                    {[1, 2].map(i => (
                        <div key={i} className="skeleton" style={{ height: '160px', borderRadius: '1rem' }} />
                    ))}
                </div>
            ) : error ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>{error}</p>
            ) : education.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No education entries yet.</p>
            ) : (
                <div className="edu-grid" role="list">
                    {education.map((edu, i) => (
                        <div
                            key={edu._id || i}
                            className="glass-card edu-card"
                            role="listitem"
                        >
                            {/* Left icon column */}
                            <div className="edu-icon-col">
                                <div className="edu-icon">
                                    <GraduationCap size={22} />
                                </div>
                                {i < education.length - 1 && <div className="edu-connector" aria-hidden="true" />}
                            </div>

                            {/* Content */}
                            <div className="edu-content">
                                <div className="edu-header">
                                    <span className="edu-year-badge">{edu.year}</span>
                                </div>
                                <h3 className="edu-degree">{edu.degree}</h3>
                                {edu.specialization && (
                                    <p className="edu-specialization">{edu.specialization}</p>
                                )}
                                <p className="edu-college">
                                    <span aria-hidden="true">🏛️</span> {edu.college}
                                </p>
                                {edu.coursework?.length > 0 && (
                                    <div className="edu-coursework">
                                        <div className="edu-coursework-label">
                                            <BookOpen size={12} aria-hidden="true" />
                                            <span>Coursework</span>
                                        </div>
                                        <div className="tag-list">
                                            {edu.coursework.map((course, j) => (
                                                <span key={j} className="tag">{course}</span>
                                            ))}
                                        </div>
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

export default Education;
