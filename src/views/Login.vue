<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
      <h3 class="text-center">登入</h3>
      
      <div class="mb-3">
        <label class="form-label">手機號碼</label>
        <input v-model="phone" type="text" class="form-control" placeholder="輸入手機號碼">
      </div>

      <div class="mb-3">
        <label class="form-label">密碼</label>
        <input v-model="password" type="password" class="form-control" placeholder="輸入密碼">
      </div>

      <button @click="handleLogin" class="btn btn-primary w-100" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm"></span>
        登入
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

// 綁定表單輸入
const phone = ref("");
const password = ref("");
const loading = ref(false);
const apiBaseUrl = import.meta.env.VITE_API_URL;

const handleLogin = async () => {
  if (!phone.value || !password.value) {
    Swal.fire("錯誤", "請輸入手機號碼和密碼", "error");
    return;
  }

  loading.value = true;
  try {
    const response = await axios.post(`${apiBaseUrl}/user/login`, {
      phoneNumber: phone.value,
      password: password.value
    }, { withCredentials: true });

    const token = response.headers["authorization"];
    
    if (!token) {
      throw new Error("伺服器沒有回傳 Token");
    }
    authStore.setToken(token);
    Swal.fire("登入成功", "歡迎回來！", "success").then(() => {
      router.push("/showAllBook");
    });
  } catch (error) {
    console.log(error)
    Swal.fire("登入失敗", error.response?.data?.message || "請檢查帳號密碼", "error");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.vh-100 {
  height: 100vh;
}
</style>