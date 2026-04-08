import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { setAuthToken } from '../api/axios';

const AuthTokenSync = () => {
    const { getToken, isSignedIn } = useAuth();
    const tokenTemplate = import.meta.env.VITE_CLERK_JWT_TEMPLATE;

    useEffect(() => {
        const syncToken = async () => {
            if (isSignedIn) {
                try {
                    let token = null;

                    if (tokenTemplate) {
                        token = await getToken({ template: tokenTemplate });
                    }

                    if (!token) {
                        token = await getToken();
                    }

                    setAuthToken(token);
                } catch (error) {
                    console.error('Error syncing auth token:', error);
                }
            } else {
                setAuthToken(null);
            }
        };

        syncToken();

        // Refresh token periodically or on focus if needed
        const interval = setInterval(syncToken, 1000 * 60 * 10); // Refresh every 10 mins
        return () => clearInterval(interval);
    }, [getToken, isSignedIn, tokenTemplate]);

    return null;
};

export default AuthTokenSync;
