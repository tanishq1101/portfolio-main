import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProjects, createProject, updateProject, deleteProject } from '../../../api/projectApi';
import DataTable from '../Shared/DataTable';
import Modal from '../Shared/Modal';
import { Plus } from 'lucide-react';
import { getApiErrorMessage } from '../../../utils/apiError';
import './Projects.css';

const ProjectsAdmin = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        problemSolved: '',
        githubLink: '',
        liveDemoLink: '',
        category: '',
        featured: false,
        technologies: '', // Will be split by comma
    });

    // Fetch Data
    const { data: projects, isLoading, isError } = useQuery({
        queryKey: ['admin-projects'],
        queryFn: fetchProjects
    });

    // Mutations
    const createMutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
            handleCloseModal();
        },
        onError: (error) => {
            setSubmitError(getApiErrorMessage(error, 'Failed to add project.'));
        }
    });

    const updateMutation = useMutation({
        mutationFn: updateProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
            handleCloseModal();
        },
        onError: (error) => {
            setSubmitError(getApiErrorMessage(error, 'Failed to update project.'));
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
        }
    });

    // Handlers
    const handleOpenModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title || '',
                description: project.description || '',
                problemSolved: project.problemSolved || '',
                githubLink: project.githubLink || '',
                liveDemoLink: project.liveDemoLink || '',
                category: project.category || '',
                featured: Boolean(project.featured),
                technologies: project.technologies ? project.technologies.join(', ') : ''
            });
        } else {
            setEditingProject(null);
            setFormData({
                title: '', description: '', problemSolved: '', githubLink: '',
                liveDemoLink: '', category: '', featured: false, technologies: ''
            });
        }
        setSubmitError('');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
        setSubmitError('');
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
            images: editingProject?.images || []
        };

        if (editingProject) {
            updateMutation.mutate({ id: editingProject._id, projectData: payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.error("Delete failed: No ID provided");
            return;
        }
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await deleteMutation.mutateAsync(id);
            } catch (error) {
                console.error("Delete mutation failed:", error);
            }
        }
    };

    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Category', accessor: 'category' },
        {
            header: 'Featured',
            accessor: 'featured',
            render: (val) => val ? <span className="badge badge-success">Yes</span> : <span className="badge badge-slate">No</span>
        },
        {
            header: 'Technologies',
            accessor: 'technologies',
            render: (val) => val && val.length > 0 ? val.slice(0, 3).join(', ') + (val.length > 3 ? '...' : '') : 'None'
        }
    ];

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>Manage Projects</h2>
                <button className="btn-primary flex-center gap-2" onClick={() => handleOpenModal()}>
                    <Plus size={18} /> Add Project
                </button>
            </div>

            {isLoading ? (
                <p>Loading projects...</p>
            ) : isError ? (
                <p className="error-text">Error loading projects.</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={projects || []}
                    onEdit={handleOpenModal}
                    onDelete={handleDelete}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingProject ? 'Edit Project' : 'Add New Project'}
            >
                <form onSubmit={handleSubmit} className="admin-form">
                    {submitError && <p className="error-text">{submitError}</p>}

                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Problem Solved</label>
                        <textarea name="problemSolved" value={formData.problemSolved} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Technologies (Comma separated)</label>
                        <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="e.g. React, Node.js, MongoDB" />
                    </div>

                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>GitHub Link</label>
                            <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} />
                        </div>
                        <div className="form-group flex-1">
                            <label>Live Demo Link</label>
                            <input type="url" name="liveDemoLink" value={formData.liveDemoLink} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group checkbox-group">
                        <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} />
                        <label htmlFor="featured">Featured Project (Show on Home Page)</label>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={createMutation.isPending || updateMutation.isPending}>
                            {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Project'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ProjectsAdmin;
