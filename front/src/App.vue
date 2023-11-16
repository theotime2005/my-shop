<template>
  <div id="app">
    <router-view />
  </div>
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
  padding: 15px;
}
</style>
