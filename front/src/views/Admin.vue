<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "admin",
  setup() {
    const router = useRouter();

    function logout() {
      localStorage.clear();
      router.push('/');
    }

    return {
      logout
    };
  }
}
</script>

<template>
  <h2>Vous êtes connecté!</h2>
  <button type="button" @click="logout">Log out</button>
</template>

<style scoped>
/* Vos styles ici */
</style>
