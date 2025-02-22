import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true // 讓請求可以攜帶 Cookie
});

//自動在每個請求加入 Authorization Token
api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        if (authStore.token) {
            config.headers["Authorization"] = authStore.token; //自動帶上 Token
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;