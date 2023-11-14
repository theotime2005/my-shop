<script>
import axios from 'axios';

export default {
  data() {
    return {
      resultatRequete: null,
    };
  },
  methods: {
    async test_logging(email, password) {
      try {
        // Effectuer une requête POST avec axios
        const response = await axios.post('http://localhost', {
          // Données à envoyer avec la requête
          email: email,
          password: password
        });
        // Mettre à jour le résultat dans la variable de données
        this.resultatRequete = response.data;
      } catch (erreur) {
        // Gérer les erreurs ici si nécessaire
        console.log("erreur", erreur);
      }
    }
  }
};

</script>

<template>
  <p>Loading...</p>
</template>

<style scoped>

</style>