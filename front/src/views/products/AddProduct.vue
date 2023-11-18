<script>
import { useRouter } from 'vue-router';
import FlashMessage from "@/components/FlashMessage.vue";

export default {
  components: {
    FlashMessage,
  },
  setup() {
    const router = useRouter();

    const leave = () => {
      const isLeaveIn = true;

      if (isLeaveIn) {
        router.push('/admin/products');
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
    showFlashMessage(message, reload) {
      this.$refs.flashMessage.displayFlash(message, reload);
    },
    async addProduct() {
      try {
        const newProduct = {
          name: this.productName,
          description: this.productDescription,
          price: parseInt(this.productPrice),
          categories: []
        };

        // remplace l'URL par l'API réelle
        const response = await fetch('http://localhost/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          console.log('Produit ajouté avec succès');
          this.showFlashMessage("Product added", '/admin/products');
        } else {
          console.error('Échec de l\'ajout du produit');
          this.showFlashMessage("Failed to add!");
        }
      } catch (error) {
        console.error('Une erreur s\'est produite', error);
        this.showFlashMessage("Failed to add!");
      }
    },
  },
};
</script>

<template>
  <div class="content">
    <header>
      <div class="leave-container">
        <button class="custom-button" @click="leave">Leave</button>
      </div>
    </header>
      <h2>Add a product</h2>
    <div class="product-add">
      <form @submit.prevent="addProduct">

        <input class="custom-container-name" v-model="productName" type="text" placeholder="Name..." id="productName" required>

        <input class="custom-container" v-model="productDescription" type="text" placeholder="Description..." id="productDescription" required>

        <input class="custom-container" v-model="productPrice" type="text" placeholder="Price..." id="productPrice" required>

        <flash-message ref="flashMessage"></flash-message>
        <button class="custom-button-add" type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

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
  margin-bottom: 10px;
}

.custom-button-add:hover {
  background-color: darkgreen;
}

.custom-button-add:active {
  background-color: forestgreen;
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

