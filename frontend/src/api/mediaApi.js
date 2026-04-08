import api from "./axios";

export const fetchMedia = async () => {
    const response = await api.get("/media");
    return response.data;
};

export const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/media/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};

export const deleteMedia = async (id) => {
    const response = await api.delete(`/media/${id}`);
    return response.data;
};

export const setAsProfilePhoto = async (id) => {
    const response = await api.post(`/media/${id}/set-profile`);
    return response.data;
};
