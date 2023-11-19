<template>
  <div class="content">
    <header>
      <div class="add-container">
        <button class="custom-button" @click="add">Add</button>
      </div>
    </header>

    <section class="categories-section">
      <h2>Categories list</h2>
      <div class="categories-container">
        <div class="category" v-for="category in categoryList" :key="category.id">
          <h3>{{ category.name }}</h3>
          <div class="category-buttons">
            <button class="edit-button" @click="edit(category.id)">Edit</button>
            <button class="delete-button" @click="deleteCategory(category.id)">Delete</button>
          </div>
          <p>Identifier: {{ category.id }}</p>
        </div>
        <div v-if="categoryList.length === 0">There are not categories.</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryList: [],
    };
  },
  methods: {
    async deleteCategory(categoryId) {
      try {
        const deleter = await fetch(`http://localhost/api/categories/${categoryId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          }
        });
        console.log("Catégorie supprimé");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    add() {
      const isAddIn = true;

      if (isAddIn) {
        this.$router.push('/admin/categories/add');
      } else {
        console.error("Ajout échoué.");
      }
    },
    edit(id) {
      const isEditIn = true;

      if (isEditIn) {
        this.$router.push(`/admin/categories/edit/${id}`);
      } else {
        console.error("Édition échouée.");
      }
    },

    async get_category_list() {
      try {
        const response = await fetch("http://localhost/api/categories", {
          method: 'GET',
          headers: {
            'authorization': `bearer ${sessionStorage.getItem("user_token")}`
          }
        });
        const categories = await response.json();
        console.log(categories);
        this.categoryList = categories['hydra:member'];
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.get_category_list();
  },
}
</script>

<style scoped>

.content {
  width: 95%;
  align-items: center;
}
.categories-container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.category {
  border: 1px solid #ccc;
  padding: 10px;
}

.categories-section {
  margin-top: 20px;
  align-items: center;
}
</style>
