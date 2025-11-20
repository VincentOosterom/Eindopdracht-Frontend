import axios from "axios";

const api = axios.create({
    baseURL: "https://novi-backend-api-wgsgz.ondigitalocean.app/api",
});

// Stuurt automatisch token mee
api.interceptors.request.use((config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        const { token } = JSON.parse(storedUser);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;