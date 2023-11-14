<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>


<template>
    <div>
        <header>
          <div class="site-info">
            <img src="path/to/your/logo.png" alt="Logo" class="logo" />
            <h1>La Poire</h1>
          </div>
          <div class="login-container">
            <button @click="login">Login</button>
          </div>
        </header>


      <div class="product-list">
        <div class="search-container">
          <input type="text" v-model="searchQuery" placeholder="Search Products..." />
          <select v-model="selectedCategory">
            <option value="" disabled>Select Category</option>
            <option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</option>
          </select>
          <select v-model="selectedPriceRange">
            <option value="" disabled>Select Price Range</option>
            <option v-for="priceRange in priceRanges" :key="priceRange.id" :value="priceRange.name">{{ priceRange.name }}</option>
          </select>
          <button @click="searchProducts">Search</button>
        </div>

        <section class="products-section">
          <h2>Our Products</h2>
          <div class="products-container">
            <div class="product" v-for="product in filteredProducts" :key="product.id">
              <h3>{{ product.name }}</h3>
              <p>{{ product.category }}</p>
              <p>{{ product.price }}</p>
            </div>
            <div v-if="filteredProducts.length === 0">No matching products found.</div>
          </div>
        </section>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      selectedPriceRange: '',
      username: '',
      password: '',
      categories: [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        // Ajoute des categories
      ],
      priceRanges: [
        { id: 1, name: '$ 10,000 +' },
        { id: 2, name: '99€' },
        // Ajoute des prix
      ],
      products: [
        { id: 1, name: 'Product 1', category: 'Category 1', price: '$50' },
        { id: 2, name: 'Product 2', category: 'Category 2', price: '$30' },
        // Ajoute des produits
      ],
      filteredProducts: [],
    };
  },
  methods: {
    searchProducts() {
      this.filteredProducts = this.products.filter(product => {
        const matchesQuery = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory === '' || product.category === this.selectedCategory;
        const matchesPriceRange = this.selectedPriceRange === '' || product.price === this.selectedPriceRange;

        return matchesQuery && matchesCategory && matchesPriceRange;
      });
    },
  },
};
</script>

<style scoped>
.search-container,
.login-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 10px;
}

.product {
  border: 1px solid #ccc;
  padding: 10px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #181818;
}

.site-info {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: auto;
  margin-right: 10px;
}

.login-container {
  display: flex;
  align-items: right;
}

.products-section {
  margin-top: 20px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

</style>