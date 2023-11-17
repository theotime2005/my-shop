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

    <h2>Edit a product</h2>
    <div class="product-add">
      <form @submit.prevent="editProduct">

        <label for="productName">Product name</label>
        <input class="custom-container-name" v-model="productName" type="text" id="productName">

        <label for="productDescription">Product description</label>
        <input class="custom-container" v-model="productDescription" type="text" id="productDescription" required>

        <label for="productPrice">Product price</label>
        <input class="custom-container" v-model="productPrice" type="text" id="productPrice" required>

        <button class="custom-button-add" type="submit">Edit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import router from "@/router";

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
      productDescription: '',
      productPrice: '',
    };
  },
  methods: {
    async getProductInformation(id) {
      try {
        const putRequest = await fetch(`http://localhost/api/products/${id}`);
        const data = await putRequest.json();
        this.productName = data.name;
        this.productDescription = data.description;
        this.productPrice = `${data.price}`;
      } catch (error) {
        console.error(error);
        this.leave();
      }
    },

    async editProduct() {
      try {
        const newProduct = {
          name: this.productName,
          category: this.productCategory,
          price: parseInt(this.productPrice),
        };

        // Remplacez l'URL par l'API réelle
        const response = await fetch('http://localhost/api/products', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          console.log('Produit modifié avec succès');
          router.push('/admin');
        } else {
          console.error('Échec de la modification du produit');
        }
      } catch (error) {
        console.error('Une erreur s\'est produite', error);
      }
    },
  },
  mounted() {
    this.getProductInformation(this.$route.params.id);
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

