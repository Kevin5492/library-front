<template >
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <RouterLink  class="nav-link" 
            aria-current="page"  to = "/showAllBook">查看所有書</RouterLink>
        </li>
        <template v-if="authStore.token">
        <li  class="nav-item">
           <button @click="handleLogout" class="nav-link">登出
           </button>
        </li>
    </template>
        <template v-else>
        <li class="nav-item">
            <RouterLink  class="nav-link" 
            aria-current="page"  to = "/login">登入</RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink  class="nav-link" 
            aria-current="page"to = "/register">註冊</RouterLink>
        </li>
    </template>
    </ul>
</template>
<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout(); 
  router.push("/login"); 
};
</script> 

