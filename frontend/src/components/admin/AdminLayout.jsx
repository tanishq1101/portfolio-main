import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import './AdminLayout.css';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="admin-content">
                <div className="admin-header">
                    {/* Header area for the dashboard context */}
                    <h1>Content Management System</h1>
                </div>
                <div className="admin-main">
                    <Outlet /> {/* Renders the specific dashboard page (Projects, Skills, etc) */}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
