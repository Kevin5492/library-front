<template>
<div class = "container">
  <NavigationBar></NavigationBar>
  <router-view></router-view>
</div>
  




</template>
<script setup>
import { useRoute } from "vue-router";
import NavigationBar from './shared/NavigationBar.vue';

const route = useRoute();
</script>

<style>

</style>
