import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getProfile } from '../api/profileApi';

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refreshProfile = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getProfile();
            setProfile(data);
            return data;
        } catch (err) {
            console.error('Failed to load profile:', err);
            setError('Failed to load profile data.');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshProfile().catch(() => {
            // Error state is already set in refreshProfile
        });
    }, [refreshProfile]);

    return (
        <ProfileContext.Provider value={{ profile, loading, error, setProfile, refreshProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
