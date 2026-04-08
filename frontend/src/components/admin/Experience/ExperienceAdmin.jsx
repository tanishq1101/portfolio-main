import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchExperiences, createExperience, updateExperience, deleteExperience } from '../../../api/experienceApi';
import DataTable from '../Shared/DataTable';
import Modal from '../Shared/Modal';
import { Plus } from 'lucide-react';
import { getApiErrorMessage } from '../../../utils/apiError';

const ExperienceAdmin = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        type: 'Internship'
    });

    const { data: experiences, isLoading, isError } = useQuery({
        queryKey: ['admin-experience'],
        queryFn: fetchExperiences
    });

    const createMutation = useMutation({
        mutationFn: createExperience,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-experience'] });
            handleCloseModal();
        },
        onError: (error) => {
            setSubmitError(getApiErrorMessage(error, 'Failed to add experience.'));
        }
    });

    const updateMutation = useMutation({
        mutationFn: updateExperience,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-experience'] });
            handleCloseModal();
        },
        onError: (error) => {
            setSubmitError(getApiErrorMessage(error, 'Failed to update experience.'));
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteExperience,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-experience'] });
        }
    });

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title || '',
                company: item.company || '',
                location: item.location || '',
                startDate: item.startDate || '',
                endDate: item.endDate || '',
                current: Boolean(item.current),
                description: item.description || '',
                type: item.type || 'Internship',
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '', type: 'Internship'
            });
        }
        setSubmitError('');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
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
            endDate: formData.current ? '' : formData.endDate,
        };

        if (editingItem) {
            updateMutation.mutate({ id: editingItem._id, data: payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this experience entry?")) {
            deleteMutation.mutate(id);
        }
    };

    const columns = [
        { header: 'Role / Title', accessor: 'title' },
        { header: 'Company / Org', accessor: 'company' },
        {
            header: 'Duration',
            accessor: 'startDate',
            render: (_, row) => `${row.startDate} - ${row.current ? 'Present' : row.endDate}`
        },
        { header: 'Type', accessor: 'type' }
    ];

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>Experience & Internships</h2>
                <button className="btn-primary flex-center gap-2" onClick={() => handleOpenModal()}>
                    <Plus size={18} /> Add New
                </button>
            </div>

            {isLoading ? (
                <p>Loading experience...</p>
            ) : isError ? (
                <p className="error-text">Error loading experience data.</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={experiences || []}
                    onEdit={handleOpenModal}
                    onDelete={handleDelete}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingItem ? 'Edit Experience' : 'Add New Experience'}
            >
                <form onSubmit={handleSubmit} className="admin-form">
                    {submitError && <p className="error-text">{submitError}</p>}

                    <div className="form-group">
                        <label>Role / Position Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Software Engineer Intern" />
                    </div>

                    <div className="form-group">
                        <label>Company / Organization / Project Name</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder="e.g. Google" />
                    </div>

                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>Type</label>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="Internship">Internship</option>
                                <option value="Academic Project">Academic Project</option>
                                <option value="Hackathon">Hackathon</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Leadership">Leadership</option>
                            </select>
                        </div>
                        <div className="form-group flex-1">
                            <label>Location</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Remote / New York" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>Start Date</label>
                            <input type="text" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="e.g. June 2023" required />
                        </div>
                        <div className="form-group flex-1">
                            <label>End Date</label>
                            <input type="text" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="e.g. Aug 2023" disabled={formData.current} />
                        </div>
                    </div>

                    <div className="form-group checkbox-group">
                        <input type="checkbox" id="current" name="current" checked={formData.current} onChange={handleChange} />
                        <label htmlFor="current">Currently working here</label>
                    </div>

                    <div className="form-group">
                        <label>Description / Key Responsibilities</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={5} />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={createMutation.isPending || updateMutation.isPending}>
                            {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Experience'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ExperienceAdmin;
