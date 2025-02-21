import { createRouter, createWebHistory } from "vue-router";
import AllBook from "@/views/AllBook.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
const routes = [
    { path: "/", component: Home },
    { path: "/showAllBook", component: AllBook },
    { path: "/login", component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;