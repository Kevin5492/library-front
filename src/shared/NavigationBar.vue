<template >
    <div class = "container">
      <h1>圖書借閱系統</h1>
     
        <ul class="nav nav-tabs">

        <li class="nav-item">
            <RouterLink  class="nav-link" 
            aria-current="page"  to = "/showAllBook">查看所有書</RouterLink>
        </li>
        <template v-if="authStore.token">
            <li  class="nav-item">
                <RouterLink  class="nav-link" 
                aria-current="page"  to = "/borrowedBooks">已借閱書籍</RouterLink>
        </li>
        <li  class="nav-item">
                <RouterLink  class="nav-link" 
                aria-current="page"  to = "/returnRecord">還書紀錄</RouterLink>
        </li>
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
    </div>
    
</template>
<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import api from "@/api/axios";
import Swal from 'sweetalert2';
const authStore = useAuthStore();
const router = useRouter();

async function handleLogout () {//登出帳號
   
  try{
    const response=  await api.post(
        `/user/logout`
      );
      if(response.data.success){
        authStore.logout();
        Swal.fire({
      title: "登出成功",
      icon: "success",
      confirmButtonText: "確定"
    });
      router.push("/login"); //跳轉回登入頁面
      }else{
        Swal.fire("登出失敗",response.data.mssg , "warning");
      }
      
  }catch(error){
    console.log(error);
  }  
};
</script> 

