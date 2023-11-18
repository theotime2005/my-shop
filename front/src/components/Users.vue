<template>
  <div class="content">
    <header>
      <div class="add-container">
        <button class="custom-button" @click="add">Add</button>
      </div>
    </header>

    <section class="users-section">
      <h2>users list</h2>
      <div class="users-container">
        <div class="user" v-for="user in userList" :key="user.id">
          <h3>{{ user.fullName }}</h3>
          <p>{{ user.email }}</p>
          <div class="user-buttons">
            <button class="edit-button" @click="edit(user.id)">Edit</button>
            <button class="delete-button" @click="deleteUser(user.id)">Delete</button>
          </div>
          <p>Identifier: {{ user.id }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
    };
  },
  methods: {
    async deleteUser(userId) {
      // Logique pour supprimer le produit
      console.log('Supprimer le produit avec l\'ID :', userId);
      try {
        const deleter = await fetch(`http://localhost/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          }
        });
        console.log("Utilisateur supprimé");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    add() {
      const isAddIn = true;

      if (isAddIn) {
        this.$router.push('/admin/users/add');
      } else {
        console.error("Ajout échoué.");
      }
    },
    edit(id) {
      const isEditIn = true;

      if (isEditIn) {
        this.$router.push(`/admin/users/edit/${id}`);
      } else {
        console.error("Édition échouée.");
      }
    },

    async get_user_list() {
      try {
        const response = await fetch("http://localhost/api/users", {
          method: 'GET',
          headers: {
            'authorization': `bearer ${sessionStorage.getItem("user_token")}`
          }
        });
        const users = await response.json();
        console.log(users);
        this.userList = users['hydra:member'];
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.get_user_list();
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

.user {
  border: 1px solid #ccc;
  padding: 10px;
}

.users-section {
  margin-top: 20px;
  align-items: center;
}
</style>
