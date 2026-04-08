import api from './axios';

export const fetchSkills = async () => {
    const { data } = await api.get('/skills');
    return data;
};

export const createSkill = async (skillData) => {
    const { data } = await api.post('/skills', skillData);
    return data;
};

export const updateSkill = async ({ id, skillData }) => {
    const { data } = await api.put(`/skills/${id}`, skillData);
    return data;
};

export const deleteSkill = async (id) => {
    const { data } = await api.delete(`/skills/${id}`);
    return data;
};
