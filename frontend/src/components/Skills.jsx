import { useState, useEffect } from 'react';
import { fetchSkills } from '../api/skillApi';
import './Skills.css';

const categoryIcons = {
    'Frontend': '🎨',
    'Backend': '⚙️',
    'Database': '🗄️',
    'DevOps': '🚀',
    'Mobile': '📱',
    'Tools': '🛠️',
    'Languages': '💻',
    'Cloud': '☁️',
    'AI/ML': '🤖',
    'Other': '⭐',
};

const groupByCategory = (skills) => {
    const map = {};
    skills.forEach(skill => {
        const cat = skill.category || 'Other';
        if (!map[cat]) map[cat] = [];
        map[cat].push(skill.name);
    });
    return Object.entries(map).map(([category, items]) => ({ category, items }));
};

const Skills = () => {
    const [skillGroups, setSkillGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSkills()
            .then(data => {
                setSkillGroups(groupByCategory(data));
            })
            .catch(err => {
                console.error('Error loading skills:', err);
                setError('Failed to load skills.');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="section-container">
            <h2 className="section-title">
                Technical Skills
            </h2>
            <p className="section-subtitle">
                Technologies and tools I use to bring ideas to life.
            </p>

            {loading ? (
                <div className="skills-grid">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="skeleton" style={{ height: '150px', borderRadius: '1rem' }} />
                    ))}
                </div>
            ) : error ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>{error}</p>
            ) : skillGroups.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No skills added yet.</p>
            ) : (
                <div className="skills-grid">
                    {skillGroups.map((cat, i) => (
                        <div key={i} className="glass-card skill-category">
                            <div className="skill-category-header">
                                <span className="skill-category-icon" aria-hidden="true">
                                    {categoryIcons[cat.category] || '⭐'}
                                </span>
                                <h3 className="skill-category-title">{cat.category}</h3>
                                <span className="skill-count-badge">{cat.items.length}</span>
                            </div>
                            <div className="skill-items">
                                {cat.items.map((skill, j) => (
                                    <span key={j} className="skill-chip">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Skills;
