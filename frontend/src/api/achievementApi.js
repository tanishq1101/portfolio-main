import api from "./axios";

export const fetchAchievements = async () => {
    const response = await api.get("/achievements");
    return response.data;
};

export const createAchievement = async (data) => {
    const response = await api.post("/achievements", data);
    return response.data;
};

export const updateAchievement = async ({ id, data }) => {
    const response = await api.put(`/achievements/${id}`, data);
    return response.data;
};

export const deleteAchievement = async (id) => {
    const response = await api.delete(`/achievements/${id}`);
    return response.data;
};
