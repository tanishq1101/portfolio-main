import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEducation, createEducation, updateEducation, deleteEducation } from '../../../api/educationApi';
import DataTable from '../Shared/DataTable';
import Modal from '../Shared/Modal';
import { Plus } from 'lucide-react';
import { getApiErrorMessage } from '../../../utils/apiError';

const EducationAdmin = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEducation, setEditingEducation] = useState(null);
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState({
        college: '',
        degree: '',
        specialization: '',
        year: '',
        coursework: '',
    });

    // Fetch Data
    const { data: education, isLoading, isError } = useQuery({
        queryKey: ['admin-education'],
        queryFn: fetchEducation
    });

    // Mutations
    const createMutation = useMutation({
        mutationFn: createEducation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-education'] });
            handleCloseModal();
        },
        onError: (error) => {
            setSubmitError(getApiErrorMessage(error, 'Failed to add education entry.'));
        }
    });

    const updateMutation = useMutation({
        mutationFn: updateEducation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-education'] });
            handleCloseModal();
        },
        onError: (error) => {
            setSubmitError(getApiErrorMessage(error, 'Failed to update education entry.'));
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteEducation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-education'] });
        }
    });

    // Handlers
    const handleOpenModal = (edu = null) => {
        if (edu) {
            setEditingEducation(edu);
            setFormData({
                college: edu.college || '',
                degree: edu.degree || '',
                specialization: edu.specialization || '',
                year: edu.year || '',
                coursework: Array.isArray(edu.coursework) ? edu.coursework.join(', ') : (edu.coursework || ''),
            });
        } else {
            setEditingEducation(null);
            setFormData({ college: '', degree: '', specialization: '', year: '', coursework: '' });
        }
        setSubmitError('');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingEducation(null);
        setSubmitError('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            coursework: formData.coursework
                .split(',')
                .map(item => item.trim())
                .filter(Boolean),
        };

        if (editingEducation) {
            updateMutation.mutate({ id: editingEducation._id, educationData: payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this education entry?")) {
            deleteMutation.mutate(id);
        }
    };

    const columns = [
        { header: 'Institution', accessor: 'college' },
        { header: 'Degree', accessor: 'degree' },
        { header: 'Specialization', accessor: 'specialization' },
        { header: 'Year', accessor: 'year' }
    ];

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>Manage Education</h2>
                <button className="btn-primary flex-center gap-2" onClick={() => handleOpenModal()}>
                    <Plus size={18} /> Add Education
                </button>
            </div>

            {isLoading ? (
                <p>Loading education data...</p>
            ) : isError ? (
                <p className="error-text">Error loading education.</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={education || []}
                    onEdit={handleOpenModal}
                    onDelete={handleDelete}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingEducation ? 'Edit Education' : 'Add New Education'}
            >
                <form onSubmit={handleSubmit} className="admin-form">
                    {submitError && <p className="error-text">{submitError}</p>}

                    <div className="form-group">
                        <label>Institution / School Name</label>
                        <input type="text" name="college" value={formData.college} onChange={handleChange} required />
                    </div>

                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>Degree</label>
                            <input type="text" name="degree" value={formData.degree} onChange={handleChange} required placeholder="e.g. B.S., M.S., Bootcamp" />
                        </div>
                        <div className="form-group flex-1">
                            <label>Field of Study</label>
                            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Year / Duration</label>
                        <input type="text" name="year" value={formData.year} onChange={handleChange} required placeholder="e.g. 2020 - 2024" />
                    </div>

                    <div className="form-group">
                        <label>Coursework (comma separated)</label>
                        <textarea name="coursework" value={formData.coursework} onChange={handleChange} placeholder="e.g. Data Structures, DBMS, Operating Systems" />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={createMutation.isPending || updateMutation.isPending}>
                            {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Education'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EducationAdmin;
