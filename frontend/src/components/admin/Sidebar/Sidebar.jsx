import React from 'react';
import { NavLink } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import {
    Briefcase,
    Code,
    GraduationCap,
    User,
    MessageSquare,
    LogOut,
    Award,
    History,
    Image as ImageIcon,
    Home
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const { signOut } = useClerk();
    const { user } = useUser();

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <h2>Portfolio CMS</h2>
                {user && <p className="sidebar-user">{user.primaryEmailAddress?.emailAddress}</p>}
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/portfolio" className="nav-item">
                    <Home size={20} />
                    <span>Back to Portfolio</span>
                </NavLink>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1rem 0' }}></div>

                <NavLink to="/admin/projects" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <Briefcase size={20} />
                    <span>Projects</span>
                </NavLink>
                <NavLink to="/admin/skills" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <Code size={20} />
                    <span>Skills</span>
                </NavLink>
                <NavLink to="/admin/education" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <GraduationCap size={20} />
                    <span>Education</span>
                </NavLink>
                <NavLink to="/admin/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <User size={20} />
                    <span>Profile / About</span>
                </NavLink>
                <NavLink to="/admin/messages" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <MessageSquare size={20} />
                    <span>Messages</span>
                </NavLink>
                <NavLink to="/admin/achievements" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <Award size={20} />
                    <span>Achievements</span>
                </NavLink>
                <NavLink to="/admin/experience" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <History size={20} />
                    <span>Experience</span>
                </NavLink>
                <NavLink to="/admin/media" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <ImageIcon size={20} />
                    <span>Media Manager</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <button onClick={() => signOut({ redirectUrl: '/sign-in' })} className="logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
