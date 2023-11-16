<template>
  <div class="content">
    <header>
      <div class="titre">
        <h1>THE POIRE</h1>
      </div>
      <div class="leave-container">
        <button class="custom-button" @click="leave">Leave</button>
      </div>
    </header>


    <h2>Ajouter un produit</h2>
    <div class="product-add">
      <form @submit.prevent="addProduct">

        <input class="custom-container-name" v-model="productName" type="text" placeholder="Name..." id="productName" required>

        <input class="custom-container" v-model="productCategory" type="text" placeholder="Category..." id="productCategory" required>

        <input class="custom-container" v-model="productPrice" type="text" placeholder="Price..." id="productPrice" required>

        <button class="custom-button-add" type="submit">Edit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const leave = () => {
      const isLeaveIn = true;

      if (isLeaveIn) {
        router.push('/admin');
      } else {
        console.error("Leave failed.");
      }
    };

    return { leave };
  },
  data() {
    return {
      productName: '',
      productCategory: '',
      productPrice: '',
    };
  },
  methods: {
    async addProduct() {
      try {
        const newProduct = {
          name: this.productName,
          category: this.productCategory,
          price: this.productPrice,
        };

        // remplace l'URL par l'API réelle
        const response = await fetch('https://api.example.com/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          console.log('Produit ajouté avec succès');
        } else {
          console.error('Échec de l\'ajout du produit');
        }
      } catch (error) {
        console.error('Une erreur s\'est produite', error);
      }
    },
  },
};
</script>



<style scoped>

.content {
  width: 95%;
  align-items: center;
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

.custom-button-add {
  background-color: #ff8c00; /* Orange */
  color: white;
  border: 1px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-bottom: 10px;
}

.custom-button-add:hover {
  background-color: #e07b00;
}

.custom-button-add:active {
  background-color: #e07b00;
}

.leave-container {
  display: flex;
  align-items: flex-end;
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

.custom-container {
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
  margin-bottom: 10px;
}

.custom-container:hover {
  background-color: darkslategrey;
}

.custom-container:active {
  background-color: darkslategrey;
}

.custom-container-name {
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
  margin-bottom: 10px;
  margin-top: 20px;
}

.custom-container-name:hover {
  background-color: darkslategrey;
}

.custom-container-name:active {
  background-color: darkslategrey;
}

.product-add {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgrey;
  width: 300px;
  height: 225px;
  margin: auto;
  border-radius: 5px;
}

.product-add form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgrey;
  width: 300px;
  height: 225px;
  margin: auto;
  border-radius: 5px;
}
</style>

