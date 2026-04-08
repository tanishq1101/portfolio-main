import api from './axios';

export const sendMessage = async (formData) => {
    const { data } = await api.post('/contact', formData);
    return data;
};

export const getMessages = async () => {
    const { data } = await api.get('/contact');
    return data;
};

export const deleteMessage = async (id) => {
    const { data } = await api.delete(`/contact/${id}`);
    return data;
};

