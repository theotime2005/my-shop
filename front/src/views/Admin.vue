<template>
  <div class="content">
    <header>
      <div class="site-info">
        <div class="burger" @click="toggleMenu">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <div class="titre">
          <h1>THE POIRE</h1>
        </div>
      </div>
      <div class="add-container">
        <button class="custom-button" @click="add">Add</button>
      </div>
      <div class="login-container">
        <button class="custom-button" @click="logout">Disconnect</button>
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
          <p>{{ product.category }}</p>
          <p>{{ product.price }}</p>
          <div class="product-buttons">
            <button class="edit-button" @click="editProduct(product)">Edit</button>
            <button class="delete-button" @click="deleteProduct(product.id)">Delete</button>
          </div>
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
      isMenuVisible: false,
      searchQuery: '',
      selectedCategory: '',
      selectedPriceRange: '',
      username: '',
      password: '',
      categories: [
        {id: 1, name: 'Category 1'},
        {id: 2, name: 'Category 2'},
        // Ajoute des categories
      ],
      priceRanges: [
        {id: 1, name: '$ 10,000 +'},
        {id: 2, name: '99€'},
        // Ajoute des prix
      ],
      products: [
        {id: 1, name: 'Product 1', category: 'Category 1', price: '$50'},
        {id: 2, name: 'Product 2', category: 'Category 2', price: '$30'},
        // Ajoute des produits
      ],
      filteredProducts: [],
    };
  },
  methods: {

    editProduct(product) {
      // Logique pour modifier le produit
      console.log('Modifier le produit :', product);
    },

    deleteProduct(productId) {
      // Logique pour supprimer le produit
      console.log('Supprimer le produit avec l\'ID :', productId);
    },

    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    searchProducts() {
      this.filteredProducts = this.products.filter(product => {
        const matchesQuery = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory === '' || product.category === this.selectedCategory;
        const matchesPriceRange = this.selectedPriceRange === '' || product.price === this.selectedPriceRange;

        return matchesQuery && matchesCategory && matchesPriceRange;
      });
    },
    logout() {
      const isLoggedIn = true;

      if (isLoggedIn) {
        this.$router.push('/');
      } else {
        console.error("Log out failed.");
      }
    }
  }
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

.products-container {
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

.products-section {
  margin-top: 20px;
  align-items: center;
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