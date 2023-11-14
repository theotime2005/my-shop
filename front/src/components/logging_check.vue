<script>
let token;
function test_logging(data, token) {
  return new Promise(resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Vous pouvez ajuster le type de contenu en fonction de vos besoins
      },
      body: JSON.stringify(donnees)
    }
    fetch(url, options)
        .then(response => {
          if (!response.ok) {
            throw new Error(`La requête a échoué avec le statut ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          token = data;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
  });
}
  }
}
export default {
  name: "logging_check",
}
</script>

<template>
  <p>Loading...</p>
</template>

<style scoped>

</style>