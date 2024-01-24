<template>
  <div class="content">
    <header>
      <div class="site-info">
        <div class="burger">
          <button type="button" @click="toggleMenu">{{ burgerButtonText }}</button>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
      <div class="add-container">
        <button class="custom-button" @click="add">Add</button>
      </div>
    </header>

    <div class="product-list" v-show="isMenuVisible">
      <div class="search-container">
        <input class="custom-search-button" type="text" v-model="searchQuery" placeholder="Search Products..." />
        <select class="custom-button" v-model="selectedCategory">
          <option value="" disabled>Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</option>
        </select>
        <select class="custom-button" v-model="selectedPriceRange">
          <option value="" disabled>Price Range</option>
          <option v-for="priceRange in priceRanges" :key="priceRange.id" :value="priceRange.name">{{ priceRange.name }}</option>
        </select>
        <button class="custom-button" @click="searchProducts">Search</button>
      </div>
    </div>

    <section class="products-section">
      <h2>Our Products</h2>
      <div class="products-container">
        <div class="product" v-for="product in filteredProducts" :key="product.id">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p>{{ product.price }}€</p>
          <div class="product-buttons">
            <button class="edit-button" @click="edit(product.id)">Edit</button>
            <button class="delete-button" @click="deleteProduct(product.id)">Delete</button>
          </div>
          <p>Identifier: {{ product.id }}</p>
        </div>
        <div v-if="filteredProducts.length === 0">No matching products found.</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      burgerButtonText: "Open menu",
      isMenuVisible: false,
      searchQuery: '',
      selectedCategory: '',
      selectedPriceRange: '',
      username: '',
      password: '',
      categories: [
        {id: 1, name: 'Catégorie 1'},
        {id: 2, name: 'Catégorie 2'},
        // Ajoute des catégories
      ],
      priceRanges: [
        {id: 1, name: '10 000 $ et plus'},
        {id: 2, name: '99€'},
        // Ajoute des prix
      ],
      products: [],
      filteredProducts: [],
    };
  },
  methods: {
    async deleteProduct(productId) {
      // Logique pour supprimer le produit
      console.log('Supprimer le produit avec l\'ID :', productId);
      try {
        const deleter = await fetch(`http://localhost/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          }
        });
        console.log("Produit supprimé");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },

    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
      this.burgerButtonText = this.isMenuVisible ? "Close menu" : "Open menu";
    },
    searchProducts() {
      this.filteredProducts = this.products.filter(product => {
        const matchesQuery = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory === '' || product.category === this.selectedCategory;
        const matchesPriceRange = this.selectedPriceRange === '' || product.price === this.selectedPriceRange;

        return matchesQuery && matchesCategory && matchesPriceRange;
      });
    },
    add() {
      const isAddIn = true;

      if (isAddIn) {
        this.$router.push('/admin/products/add');
      } else {
        console.error("Ajout échoué.");
      }
    },
    edit(id) {
      const isEditIn = true;

      if (isEditIn) {
        this.$router.push(`/admin/products/edit/${id}`);
      } else {
        console.error("Édition échouée.");
      }
    },

    async get_product_list() {
      try {
        const response = await fetch("http://localhost/api/products");
        const products = await response.json();
        this.products = products['hydra:member']; // Ligne corrigée
        // Affiche la liste complète dès le chargement
        this.filteredProducts = this.products;
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.get_product_list();  // Appelle la méthode au montage du composant
  },
}
</script>


<style scoped>

.content {
  width: 95%;
  align-items: center;
}
.users-container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.product {
  border: 1px solid #ccc;
  padding: 10px;
}

.products-section {
  margin-top: 20px;
  align-items: center;
}
</style>
