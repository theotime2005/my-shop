<template>
  <div id="app">
    <router-view />
  </div>
  <hr>
  <footer class="footer">
    <p class="footer">© 2023 Théotime Berthod et Briac Dassier</p>
  </footer>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<style>
#app {
  font-size: 34px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: white;
  width: 100%;
  height: 100%;
  align-items: center;
}
</style>
