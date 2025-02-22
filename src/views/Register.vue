<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
      <h3 class="text-center">創建帳號</h3>

      <div class="mb-3">
        <label class="form-label">手機號碼</label>
        <input v-model="phone" type="text" class="form-control" placeholder="輸入手機號碼">
      </div>

      <div class="mb-3">
        <label class="form-label">使用者名稱</label>
        <input v-model="username" type="text" class="form-control" placeholder="輸入使用者名稱">
      </div>

      <div class="mb-3">
        <label class="form-label">密碼</label>
        <input v-model="password" type="password" class="form-control" placeholder="輸入密碼">
      </div>

      <button @click="handleRegister" class="btn btn-success w-100" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm"></span>
        創建帳號
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();

// 綁定表單輸入
const phone = ref("");
const username = ref("");
const password = ref("");
const loading = ref(false);
const apiBaseUrl = import.meta.env.VITE_API_URL;

const handleRegister = async () => {
  if (!phone.value || !username.value || !password.value) {
    Swal.fire("錯誤", "請填寫所有欄位", "error");
    return;
  }

  loading.value = true;
  try {
    const response = await axios.post(`${apiBaseUrl}/user/createUser`, {
      phoneNumber: phone.value,
      userName: username.value,
      password: password.value
    });
    console.log(response.data);
    if(response.data.success){
      Swal.fire("註冊成功", "請使用您的帳號登入", "success").then(() => {
        router.push("/login"); // 
      });
      
    }else{
        Swal.fire("註冊失敗",response.data.mssg , "warning");
    }
  } catch (error) {
    console.log(error);
    Swal.fire("註冊失敗", error.response?.data?.message || "請稍後再試", "error");
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
