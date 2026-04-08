import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchMedia, uploadMedia, deleteMedia, setAsProfilePhoto } from '../../../api/mediaApi';
import { Upload, Trash2, Image as ImageIcon, Copy, Check, User } from 'lucide-react';
import { useProfile } from '../../../context/ProfileContext';
import './MediaAdmin.css';

const MediaAdmin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { refreshProfile } = useProfile();
    const [uploading, setUploading] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    const { data: media, isLoading, isError } = useQuery({
        queryKey: ['admin-media'],
        queryFn: fetchMedia
    });

    const uploadMutation = useMutation({
        mutationFn: uploadMedia,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-media'] });
            setUploading(false);
        },
        onError: (error) => {
            setUploading(false);
            const msg = error.response?.data?.message || error.message || "Upload failed.";
            const detail = error.response?.data?.error || "";
            alert(`${msg}${detail ? ` (${detail})` : ""}`);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteMedia,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-media'] });
        }
    });

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        uploadMutation.mutate(file);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this image?")) {
            deleteMutation.mutate(id);
        }
    };

    const handleSetProfile = async (id) => {
        try {
            await setAsProfilePhoto(id);
            queryClient.invalidateQueries({ queryKey: ['admin-profile'] });
            try {
                await refreshProfile();
            } catch {
                // Ignore transient refresh failures; profile photo is already updated on backend.
            }
            alert("Profile photo updated successfully.");
            navigate('/portfolio');
        } catch (error) {
            alert("Failed to set profile photo: " + (error.response?.data?.message || error.message));
        }
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="admin-section media-admin">
            <div className="section-header">
                <h2>Media Manager</h2>
                <div className="upload-btn-wrapper">
                    <button className="btn-primary flex-center gap-2" disabled={uploading}>
                        <Upload size={18} /> {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                    <input type="file" name="file" onChange={handleFileChange} accept="image/*" disabled={uploading} />
                </div>
            </div>

            <p className="section-help text-muted">
                Upload images to use them anywhere in your portfolio. Copy the URL to paste into Profile or Projects.
            </p>

            {isLoading ? (
                <p>Loading media...</p>
            ) : isError ? (
                <p className="error-text">Error loading media gallery.</p>
            ) : media && media.length > 0 ? (
                <div className="media-grid">
                    {media.map((item) => (
                        <div key={item._id} className="media-card glass-card">
                            <div className="media-preview">
                                <img src={item.url} alt={item.originalName} />
                            </div>
                            <div className="media-info">
                                <span className="media-name" title={item.originalName}>
                                    {item.originalName.length > 20 ? item.originalName.substring(0, 17) + '...' : item.originalName}
                                </span>
                                <div className="media-actions">
                                    <button
                                        className="btn-icon"
                                        onClick={() => copyToClipboard(item.url, item._id)}
                                        title="Copy URL"
                                    >
                                        {copiedId === item._id ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                                    </button>
                                    <button
                                        className="btn-icon"
                                        onClick={() => handleSetProfile(item._id)}
                                        title="Set as Profile Photo"
                                    >
                                        <User size={16} />
                                    </button>
                                    <button
                                        className="btn-icon delete"
                                        onClick={() => handleDelete(item._id)}
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <ImageIcon size={48} className="text-muted" />
                    <p>No images uploaded yet.</p>
                </div>
            )}
        </div>
    );
};

export default MediaAdmin;
