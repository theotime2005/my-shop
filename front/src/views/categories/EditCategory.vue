<template>
  <div class="content">
    <header>
      <div class="leave-container">
        <button class="custom-button" @click="leave">Leave</button>
      </div>
    </header>

    <h2>Edit a category « {{ this.categoryName }} »</h2>
    <div class="category-edit">
      <form @submit.prevent="editCategory">

        <label for="categoryName">Category name</label>
        <input class="custom-container-name" v-model="categoryName" type="text" id="categoryName" required>
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
        router.push('/admin/categories');
      } else {
        console.error("Leave failed.");
      }
    };

    return { leave };
  },
  data() {
    return {
      categoryName: ''
    };
  },
  methods: {
    async getCategoryInformation(id) {
      try {
        const putRequest = await fetch(`http://localhost/api/categories/${id}`, {
          method: 'GET',
          headers: {
            'authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          },
        });
        const data = await putRequest.json();
        this.categoryName = data.name;
      } catch (error) {
        console.error(error);
        this.leave();
      }
    },

    async editCategory() {
      try {
        const newCategory = {
          name: this.categoryName,
        };

        // Remplacez l'URL par l'API réelle
        const requestUrl = `http://localhost/api/categories/${this.$route.params.id}`;
        const response = await fetch(requestUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          },
          body: JSON.stringify(newCategory),
        });

        if (response.ok) {
          console.log('Catégorie modifiée avec succès');
          router.push('/admin/categories');
        } else {
          console.error('Échec de la modification de la catégorie');
        }
      } catch (error) {
        console.error('Une erreur s\'est produite', error);
      }
    },
  },
  mounted() {
    this.getCategoryInformation(this.$route.params.id);
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

.category-edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgrey;
  width: 300px;
  height: 225px;
  margin: auto;
  border-radius: 5px;
}

.category-edit form {
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

