import axios from "axios";

const api = axios.create({
    baseURL: "https://novi-backend-api-wgsgz.ondigitalocean.app/api",
});

api.interceptors.request.use((config) => {
    if (!config.headers) {
        config.headers = {};
    }

    // NOVI project header
    config.headers["novi-education-project-id"] =
        "d6200c4d-2a0a-435d-aba6-6171c6a7296e";

    // Token uit localStorage -> Authorization header
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        const { token } = JSON.parse(storedUser);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

export default api;
