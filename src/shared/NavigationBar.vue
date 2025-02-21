<template>
    <ul class="nav nav-tabs">
  <li class="nav-item">
    <RouterLink  class="nav-link" 
    aria-current="page"  to = "/showAllBook">查看所有書</RouterLink>
    <RouterLink  class="nav-link" 
    aria-current="page"  to = "/login">登入</RouterLink>
  </li>
</ul>
</template>
<script>
import router from '../router/router.js';
</script>