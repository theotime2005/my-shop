<template>
  <div class="content">
    <header>
      <div class="leave-container">
        <button class="custom-button" @click="leave">Leave</button>
      </div>
    </header>

    <h2>Edit a user « {{ this.productName }} »</h2>
    <div class="user-edit">
      <form @submit.prevent="editUser">

        <label for="userName">User name</label>
        <input class="custom-container-name" v-model="userName" type="text" id="userName" required>

        <label for="userEmail">Email</label>
        <input class="custom-container" v-model="userEmail" type="email" id="userEmail" required>

        <label for="userPassword">Password</label>
        <input class="custom-container" v-model="userPassword" type="password" id="userPassword" required>

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
        router.push('/admin/users');
      } else {
        console.error("Leave failed.");
      }
    };

    return { leave };
  },
  data() {
    return {
      username: '',
      userEmail: '',
      userPassword: '',
    };
  },
  methods: {
    async getUserInformation(id) {
      try {
        const putRequest = await fetch(`http://localhost/api/users/${id}`, {
          method: 'GET',
          headers: {
            'authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          },
        });
        const data = await putRequest.json();
        this.userName = data.fullName;
        this.userEmail = data.email;
        this.userPassword = data.password;
      } catch (error) {
        console.error(error);
        this.leave();
      }
    },

    async editUser() {
      try {
        const newUser = {
          fullName: this.userName,
          email: this.userEmail,
          password: this.userPassword
        };

        // Remplacez l'URL par l'API réelle
        const requestUrl = `http://localhost/api/users/${this.$route.params.id}`;
        const response = await fetch(requestUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          console.log('Utilisateur modifié avec succès');
          router.push('/');
        } else {
          console.error('Échec de la modification du produit');
        }
      } catch (error) {
        console.error('Une erreur s\'est produite', error);
      }
    },
  },
  mounted() {
    this.getUserInformation(this.$route.params.id);
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

.user-edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgrey;
  width: 300px;
  height: 225px;
  margin: auto;
  border-radius: 5px;
}

.user-edit form {
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

