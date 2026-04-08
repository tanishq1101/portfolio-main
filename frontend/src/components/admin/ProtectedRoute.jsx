import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import { setAuthToken } from '../../api/axios';

const buildSignInRedirect = (pathname, search, hash) => {
    const targetPath = `${pathname || '/admin'}${search || ''}${hash || ''}`;
    return `/sign-in?redirect_url=${encodeURIComponent(targetPath)}`;
};

const ClerkProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { isSignedIn, isLoaded } = useUser();
    const { getToken } = useAuth();
    const [isTokenReady, setIsTokenReady] = useState(false);
    const tokenTemplate = import.meta.env.VITE_CLERK_JWT_TEMPLATE;

    useEffect(() => {
        let isActive = true;

        const syncToken = async () => {
            if (!isLoaded) return;

            if (!isSignedIn) {
                setAuthToken(null);
                if (isActive) {
                    setIsTokenReady(true);
                }
                return;
            }

            try {
                let token = null;

                if (tokenTemplate) {
                    token = await getToken({ template: tokenTemplate });
                }

                if (!token) {
                    token = await getToken();
                }

                setAuthToken(token || null);
            } catch (error) {
                console.error('Failed to sync Clerk token in protected route:', error);
                setAuthToken(null);
            } finally {
                if (isActive) {
                    setIsTokenReady(true);
                }
            }
        };

        setIsTokenReady(false);
        syncToken();

        return () => {
            isActive = false;
        };
    }, [getToken, isLoaded, isSignedIn, tokenTemplate]);

    if (!isLoaded || !isTokenReady) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                fontSize: '1.1rem',
                color: '#64748b'
            }}>
                Loading...
            </div>
        );
    }

    if (!isSignedIn) {
        return <Navigate to={buildSignInRedirect(location.pathname, location.search, location.hash)} replace />;
    }

    return children;
};

const ProtectedRoute = ({ children }) => {
    const isClerkConfigured = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

    if (!isClerkConfigured) {
        return <Navigate to="/" replace />;
    }

    return <ClerkProtectedRoute>{children}</ClerkProtectedRoute>;
};

export default ProtectedRoute;
