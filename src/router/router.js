import { createRouter, createWebHistory } from "vue-router";
import AllBook from "@/views/AllBook.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import BorrowedBook from "@/views/BorrowedBook.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/showAllBook", component: AllBook },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/borrowedBooks", component: BorrowedBook },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;