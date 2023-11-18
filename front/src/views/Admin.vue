<template>
  <div class="content">
    <nav>
      <router-link to="/admin/products"/>
      <router-link to="/admin/users"/>
    </nav>
    <div class="login-container">
      <button class="custom-button" @click="logout">Disconnect</button>
    </div>
    <h1 class="titre">The Poire</h1>
    <router-view/>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  methods: {
    logout() {
      const isLoggedIn = true;
      sessionStorage.clear();

      if (isLoggedIn) {
        this.$router.push('/');
      } else {
        console.error("Déconnexion échouée.");
      }
    },
  },
}
</script>


<style scoped>

.content {
  width: 95%;
  align-items: center;
}

.search-container{
  display: flex;
  align-items: flex-end;
}

.login-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.add-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

body {
  margin: 0;
  align-items: center;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #181818;
  width: 100%;
  height: 100%;
  align-items: center;
}

.site-info {
  display: flex;
  align-items: center;
}


.login-container {
  display: flex;
  align-items: flex-end;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  align-items: center;
}

.burger {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40px;
  width: 80px;
  padding: 40px;
}

.bar {
  width: 50px;
  height: 8px;
  background-color: white;
  transition: 0.3s;
}

.titre {
  display: flex;
  align-content: center;
}

.custom-button {
  background-color: mediumseagreen;
  color: white;
  border: 1px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.custom-button:hover {
  background-color: darkgreen;
}

.custom-button:active {
  background-color: forestgreen;
}

.edit-button {
  background-color: #ff8c00; /* Orange */
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #e07b00;
}

.delete-button {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #cc0000;
}

.custom-search-button {
  background-color: dimgray;
  color: white;
  border: 1px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.custom-search-button:hover {
  background-color: darkslategrey;
}

.custom-search-button:active {
  background-color: darkslategrey;
}
</style>
