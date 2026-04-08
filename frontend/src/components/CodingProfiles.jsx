import { useProfile } from '../context/ProfileContext';
import { Github, Code, Award } from 'lucide-react';
import TextEffect from './motion/TextEffect';
import './CodingProfiles.css';

const getGithubUsername = (githubUrl) => {
    if (!githubUrl || typeof githubUrl !== 'string') {
        return 'johndoe';
    }

    try {
        const pathname = new URL(githubUrl).pathname;
        const parts = pathname.split('/').filter(Boolean);
        return parts[0] || 'johndoe';
    } catch {
        const parts = githubUrl.split('/').filter(Boolean);
        return parts[parts.length - 1] || 'johndoe';
    }
};

const CodingProfiles = () => {
    const { profile, loading } = useProfile();

    if (loading) return null; // Or a skeleton

    const githubUser = getGithubUsername(profile?.socialLinks?.github);
    const leetcodeLink = profile?.socialLinks?.leetcode || 'https://leetcode.com';
    const codechefLink = profile?.socialLinks?.codechef || 'https://codechef.com';

    const profiles = [
        {
            name: 'GitHub',
            icon: <Github size={28} />,
            link: profile?.socialLinks?.github || `https://github.com/${githubUser}`,
            description: 'Open source contributions & repositories',
            accent: 'github',
        },
        {
            name: 'LeetCode',
            icon: <Code size={28} />,
            link: leetcodeLink,
            description: 'Competitive programming & problem solving',
            accent: 'leetcode',
        },
        {
            name: 'CodeChef',
            icon: <Award size={28} />,
            link: codechefLink,
            description: 'Algorithmic challenges & contests',
            accent: 'codechef',
        },
    ];

    return (
        <div className="section-container">
            <TextEffect 
                text="Engineered Presence"
                preset="blur-slide"
                as="h2"
                className="section-title"
                delay={0.1}
            />
            <TextEffect 
                text="Global benchmarks and open source contributions."
                preset="fade"
                as="p"
                className="section-subtitle"
                delay={0.4}
                stagger={0.02}
            />

            {/* GitHub Stats Card */}
                <div className="glass-card github-stats-card">
                    <img
                        src={`https://github-readme-stats.vercel.app/api?username=${encodeURIComponent(githubUser)}&show_icons=true&theme=transparent&text_color=ffffff&icon_color=00d9ff&title_color=00d9ff&hide_border=true&bg_color=00000000`}
                        alt="GitHub Stats"
                        className="github-stats-img"
                    />
                </div>

            {/* Profile Links */}
            <div className="profiles-grid">
                {profiles.map((p, i) => (
                    <a
                        key={i}
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className={`glass-card profile-link-card profile-${p.accent}`}
                    >
                        <div className="profile-icon">{p.icon}</div>
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default CodingProfiles;
