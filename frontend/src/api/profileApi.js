import api from './axios';

export const getProfile = async () => {
    const { data } = await api.get('/profile');
    return data;
};

export const updateProfile = async (profileData) => {
    const { data } = await api.put('/profile', profileData);
    return data;
};
