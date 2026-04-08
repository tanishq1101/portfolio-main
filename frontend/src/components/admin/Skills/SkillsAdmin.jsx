import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSkills, createSkill, updateSkill, deleteSkill } from '../../../api/skillApi';
import DataTable from '../Shared/DataTable';
import Modal from '../Shared/Modal';
import { Plus } from 'lucide-react';
import { getApiErrorMessage } from '../../../utils/apiError';

const SkillsAdmin = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        proficiency: 50,
    });

    // Fetch Data
    const { data: skills, isLoading, isError } = useQuery({
        queryKey: ['admin-skills'],
        queryFn: fetchSkills
    });

    // Mutations
    const createMutation = useMutation({
        mutationFn: createSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
            handleCloseModal();
        },
        onError: (error) => {
            setSubmitError(getApiErrorMessage(error, 'Failed to add skill.'));
        }
    });

    const updateMutation = useMutation({
        mutationFn: updateSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
            handleCloseModal();
        },
        onError: (error) => {
            setSubmitError(getApiErrorMessage(error, 'Failed to update skill.'));
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
        }
    });

    // Handlers
    const handleOpenModal = (skill = null) => {
        if (skill) {
            setEditingSkill(skill);
            setFormData({
                name: skill.name || '',
                category: skill.category || '',
                proficiency: Number(skill.proficiency) || 0,
            });
        } else {
            setEditingSkill(null);
            setFormData({ name: '', category: '', proficiency: 50 });
        }
        setSubmitError('');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSkill(null);
        setSubmitError('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            proficiency: Number(formData.proficiency),
        };

        if (editingSkill) {
            updateMutation.mutate({ id: editingSkill._id, skillData: payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    const handleDelete = async (id) => {
        if (!id) return;
        if (window.confirm("Are you sure you want to delete this skill?")) {
            try {
                await deleteMutation.mutateAsync(id);
            } catch (error) {
                console.error("Delete skill mutation failed:", error);
            }
        }
    };

    const columns = [
        { header: 'Skill Name', accessor: 'name' },
        { header: 'Category', accessor: 'category' },
        {
            header: 'Proficiency',
            accessor: 'proficiency',
            render: (val) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '140px' }}>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${val}%`, height: '100%', background: 'var(--primary-accent)', boxShadow: '0 0 10px var(--primary-accent)' }} />
                    </div>
                    <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-accent)', minWidth: '32px' }}>{val}%</span>
                </div>
            )
        }
    ];

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>Manage Skills</h2>
                <button className="btn-primary flex-center gap-2" onClick={() => handleOpenModal()}>
                    <Plus size={18} /> Add Skill
                </button>
            </div>

            {isLoading ? (
                <p>Loading skills...</p>
            ) : isError ? (
                <p className="error-text">Error loading skills.</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={skills || []}
                    onEdit={handleOpenModal}
                    onDelete={handleDelete}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingSkill ? 'Edit Skill' : 'Add New Skill'}
            >
                <form onSubmit={handleSubmit} className="admin-form">
                    {submitError && <p className="error-text">{submitError}</p>}

                    <div className="form-group">
                        <label>Skill Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. React.js, Python" />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="">Select Category...</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Database">Database</option>
                            <option value="Tools">Tools</option>
                            <option value="Languages">Languages</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Proficiency ({formData.proficiency}%)</label>
                        <input
                            type="range"
                            name="proficiency"
                            min="0" max="100"
                            value={formData.proficiency}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={createMutation.isPending || updateMutation.isPending}>
                            {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Skill'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default SkillsAdmin;
