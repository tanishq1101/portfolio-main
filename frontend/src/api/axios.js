import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

let authToken = null;

// Function to set the token from outside (e.g., from Clerk AuthTokenSync)
export const setAuthToken = (token) => {
    authToken = token;
};

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // Use the dynamic token if available
        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        } else {
            // Fallback to localStorage if any old code still uses it
            const localToken = localStorage.getItem('token');
            if (localToken) {
                config.headers['Authorization'] = `Bearer ${localToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Helper to clean up URLs from the backend (handling port mismatches if any)
export const getAssetUrl = (url) => {
    if (!url) return '';
    if (typeof url !== 'string') return url;

    try {
        const apiOrigin = new URL(API_BASE_URL).origin;
        const parsed = new URL(url, apiOrigin);

        // Keep external hosted assets untouched (e.g., Cloudinary/CDN)
        if (!['localhost', '127.0.0.1'].includes(parsed.hostname)) {
            return url;
        }

        if (url.startsWith('/')) {
            return `${apiOrigin}${url}`;
        }

        if (['localhost', '127.0.0.1'].includes(parsed.hostname)) {
            return `${apiOrigin}${parsed.pathname}${parsed.search}${parsed.hash}`;
        }

        return url;
    } catch {
        return url;
    }
};

export default api;
