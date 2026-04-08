import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAchievements, createAchievement, updateAchievement, deleteAchievement } from '../../../api/achievementApi';
import DataTable from '../Shared/DataTable';
import Modal from '../Shared/Modal';
import { Plus } from 'lucide-react';
import { getApiErrorMessage } from '../../../utils/apiError';

const AchievementsAdmin = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        organization: '',
        date: '',
        link: '',
        description: '',
        category: 'Achievement'
    });

    const { data: achievements, isLoading, isError } = useQuery({
        queryKey: ['admin-achievements'],
        queryFn: fetchAchievements
    });

    const createMutation = useMutation({
        mutationFn: createAchievement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-achievements'] });
            handleCloseModal();
        },
        onError: (error) => {
            setSubmitError(getApiErrorMessage(error, 'Failed to add achievement.'));
        }
    });

    const updateMutation = useMutation({
        mutationFn: updateAchievement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-achievements'] });
            handleCloseModal();
        },
        onError: (error) => {
            setSubmitError(getApiErrorMessage(error, 'Failed to update achievement.'));
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteItem => deleteAchievement(deleteItem),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-achievements'] });
        }
    });

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title || '',
                organization: item.organization || '',
                date: item.date || '',
                link: item.link || '',
                description: item.description || '',
                category: item.category || 'Achievement',
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '', organization: '', date: '', link: '', description: '', category: 'Achievement'
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            updateMutation.mutate({ id: editingItem._id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this achievement?")) {
            deleteMutation.mutate(id);
        }
    };

    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Org', accessor: 'organization' },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Category',
            accessor: 'category',
            render: (val) => {
                const value = val || 'Achievement';
                return <span className={`badge badge-type-${value.toLowerCase()}`}>{value}</span>;
            }
        }
    ];

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>Certifications & Achievements</h2>
                <button className="btn-primary flex-center gap-2" onClick={() => handleOpenModal()}>
                    <Plus size={18} /> Add New
                </button>
            </div>

            {isLoading ? (
                <p>Loading achievements...</p>
            ) : isError ? (
                <p className="error-text">Error loading achievements.</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={achievements || []}
                    onEdit={handleOpenModal}
                    onDelete={handleDelete}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingItem ? 'Edit Achievement' : 'Add New Achievement'}
            >
                <form onSubmit={handleSubmit} className="admin-form">
                    {submitError && <p className="error-text">{submitError}</p>}

                    <div className="form-group">
                        <label>Title / Achievement Name</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. AWS Certified Developer" />
                    </div>

                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>Organization / Issuer</label>
                            <input type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="e.g. Amazon Web Services" />
                        </div>
                        <div className="form-group flex-1">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="Certification">Certification</option>
                                <option value="Hackathon">Hackathon</option>
                                <option value="Award">Award</option>
                                <option value="Achievement">Achievement</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>Date</label>
                            <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="e.g. Dec 2023" />
                        </div>
                        <div className="form-group flex-1">
                            <label>Certificate / Proof Link</label>
                            <input type="url" name="link" value={formData.link} onChange={handleChange} placeholder="https://..." />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description (Optional)</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={3} />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={createMutation.isPending || updateMutation.isPending}>
                            {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Achievement'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AchievementsAdmin;
