import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({ //從localStorage中取得Token
        token: localStorage.getItem("token") || null
    }),
    actions: {
        setToken(token) { //用來把JWT Token存到localStorage中
            this.token = token;
            localStorage.setItem("token", token);
        },
        logout() { //用來登出，清除localStorage中的Token
            this.token = null;
            localStorage.removeItem("token");
        }
    }
});