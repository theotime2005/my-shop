<template>
  <div class="content">
    <header>
      <div class="site-info">
        <!-- Utilisation d'une propriété distincte 'burgerButtonText' -->
        <div class="burger">
          <button type="button" @click="toggleMenu">{{ burgerButtonText }}</button>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <div class="titre">
          <h1>THE POIRE</h1>
        </div>
      </div>
      <div class="login-container">
        <button class="custom-button" @click="login">Login</button>
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
        </div>
        <div v-if="filteredProducts.length === 0">No matching products found.</div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      burgerButtonText: "Open menu",
      newProduct: {
        name: "",
        category: "",
        price: "",
      },
      isMenuVisible: false,
      searchQuery: "",
      selectedCategory: "",
      selectedPriceRange: "",
      username: "",
      password: "",
      categories: [
        { id: 1, name: "Category 1" },
        { id: 2, name: "Category 2" },
        // Ajoute des categories
      ],
      priceRanges: [
        { id: 1, name: "$ 10,000 +" },
        { id: 2, name: "99€" },
        // Ajoute des prix
      ],
      products: [],
      filteredProducts: [],
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
      // Mettre à jour le texte du bouton burger manuellement
      this.burgerButtonText = this.isMenuVisible ? "Close menu" : "Open menu";
    },
    searchProducts() {
      this.filteredProducts = this.products.filter((product) => {
        const matchesQuery = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory === "" || product.category === this.selectedCategory;
        const matchesPriceRange = this.selectedPriceRange === "" || product.price === this.selectedPriceRange;

        return matchesQuery && matchesCategory && matchesPriceRange;
      });
    },
    login() {
      // logique d'authentification ici
      const isLoggedIn = true;

      if (isLoggedIn) {
        this.$router.push("/log");
      } else {
        console.error("Login failed.");
      }
    },

    async get_product_list() {
      try {
        const response = await fetch("http://localhost/api/products");
        const products = await response.json();
        console.log(products);
        this.products = products['hydra:member'];
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
};
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

.users-section {
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
  border: none;
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