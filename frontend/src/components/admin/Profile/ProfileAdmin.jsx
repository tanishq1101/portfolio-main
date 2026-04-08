import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, updateProfile } from '../../../api/profileApi';
import { getApiErrorMessage } from '../../../utils/apiError';
import { useProfile } from '../../../context/ProfileContext';
import './ProfileAdmin.css';

const mapProfileToFormData = (profile) => ({
    name: profile?.name || '',
    title: profile?.title || '',
    tagline: profile?.tagline || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    email: profile?.email || '',
    profilePhoto: profile?.profilePhoto || '',
    resumeUrl: profile?.resumeUrl || '',
    socialLinks: {
        linkedin: profile?.socialLinks?.linkedin || '',
        github: profile?.socialLinks?.github || '',
        leetcode: profile?.socialLinks?.leetcode || '',
        codechef: profile?.socialLinks?.codechef || '',
        twitter: profile?.socialLinks?.twitter || '',
        instagram: profile?.socialLinks?.instagram || '',
    },
    interests: profile?.interests ? profile.interests.join(', ') : '',
    strengths: profile?.strengths ? profile.strengths.join(', ') : '',
});

const EMPTY_FORM_DATA = mapProfileToFormData(null);

const ProfileAdmin = () => {
    const queryClient = useQueryClient();
    const { refreshProfile } = useProfile();
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [formData, setFormData] = useState(null);

    const { data: profileData, isLoading, isError } = useQuery({
        queryKey: ['admin-profile'],
        queryFn: getProfile,
    });

    const activeFormData = formData || (profileData ? mapProfileToFormData(profileData) : EMPTY_FORM_DATA);

    const updateMutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['admin-profile'] });
            setSubmitError('');
            try {
                await refreshProfile();
            } catch {
                // Keep success for save action even if public profile refetch fails transiently.
            }
            setSubmitSuccess('Profile updated successfully.');
        },
        onError: (error) => {
            setSubmitSuccess('');
            setSubmitError(getApiErrorMessage(error, 'Failed to update profile.'));
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const draft = formData || activeFormData;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData({
                ...draft,
                [parent]: { ...draft[parent], [child]: value }
            });
        } else {
            setFormData({ ...draft, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitError('');
        setSubmitSuccess('');

        // Prepare data for backend (convert comma strings back to arrays)
        const submitData = {
            ...activeFormData,
            interests: activeFormData.interests.split(',').map(s => s.trim()).filter(s => s !== ''),
            strengths: activeFormData.strengths.split(',').map(s => s.trim()).filter(s => s !== ''),
        };

        updateMutation.mutate(submitData);
    };

    if (isLoading) return <p>Loading profile...</p>;
    if (isError) return <p className="error-text">Failed to load profile data.</p>;

    return (
        <div className="admin-section profile-admin">
            <div className="section-header">
                <h2>Profile & About Settings</h2>
            </div>

            <div className="profile-container">
                <form onSubmit={handleSubmit} className="admin-form profile-form">
                    {submitError && <p className="error-text">{submitError}</p>}
                    {submitSuccess && <p style={{ color: '#10b981', marginBottom: '1rem' }}>{submitSuccess}</p>}

                    <h3>Basic Information</h3>
                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>Full Name</label>
                            <input type="text" name="name" value={activeFormData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group flex-1">
                            <label>Professional Title</label>
                            <input type="text" name="title" value={activeFormData.title} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Hero Tagline</label>
                        <input type="text" name="tagline" value={activeFormData.tagline} onChange={handleChange} />
                    </div>

                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>Public Email</label>
                            <input type="email" name="email" value={activeFormData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group flex-1">
                            <label>Location</label>
                            <input type="text" name="location" value={activeFormData.location} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Bio (About Me)</label>
                        <textarea name="bio" value={activeFormData.bio} onChange={handleChange} rows={5} />
                    </div>

                    <h3>Social & Coding Profiles</h3>
                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>LinkedIn URL</label>
                            <input type="text" name="socialLinks.linkedin" value={activeFormData.socialLinks.linkedin} onChange={handleChange} />
                        </div>
                        <div className="form-group flex-1">
                            <label>GitHub URL</label>
                            <input type="text" name="socialLinks.github" value={activeFormData.socialLinks.github} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>LeetCode URL</label>
                            <input type="text" name="socialLinks.leetcode" value={activeFormData.socialLinks.leetcode} onChange={handleChange} />
                        </div>
                        <div className="form-group flex-1">
                            <label>CodeChef URL</label>
                            <input type="text" name="socialLinks.codechef" value={activeFormData.socialLinks.codechef} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>Twitter URL</label>
                            <input type="text" name="socialLinks.twitter" value={activeFormData.socialLinks.twitter} onChange={handleChange} />
                        </div>
                        <div className="form-group flex-1">
                            <label>Instagram URL</label>
                            <input type="text" name="socialLinks.instagram" value={activeFormData.socialLinks.instagram} onChange={handleChange} />
                        </div>
                    </div>

                    <h3>Interests & Strengths</h3>
                    <div className="form-group">
                        <label>Interests (comma separated)</label>
                        <input type="text" name="interests" value={activeFormData.interests} onChange={handleChange} placeholder="e.g. AI, Open Source, Cooking" />
                    </div>
                    <div className="form-group">
                        <label>Strengths (comma separated)</label>
                        <input type="text" name="strengths" value={activeFormData.strengths} onChange={handleChange} placeholder="e.g. Adaptability, Collaboration" />
                    </div>

                    <h3>Resources</h3>
                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>Profile Photo URL</label>
                            <input type="text" name="profilePhoto" value={activeFormData.profilePhoto} onChange={handleChange} />
                        </div>
                        <div className="form-group flex-1">
                            <label>Resume PDF URL</label>
                            <input type="text" name="resumeUrl" value={activeFormData.resumeUrl} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary" disabled={updateMutation.isPending}>
                            {updateMutation.isPending ? 'Saving...' : 'Save Profile Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileAdmin;
