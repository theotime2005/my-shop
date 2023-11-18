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
        router.push('/admin/users');
      } else {
        console.error("Leave failed.");
      }
    };

    return { leave };
  },
  data() {
    return {
      userName: '',
      userEmail: '',
      userPassword: '',
    };
  },
  methods: {
    showFlashMessage(message, reload) {
      this.$refs.flashMessage.displayFlash(message, reload);
    },
    async addUser() {
      try {
        const newUser = {
          fullName: this.userName,
          email: this.userEmail,
          password: this.userPassword,
        };

        // remplace l'URL par l'API réelle
        const response = await fetch('http://localhost/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("user_token")}`
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          console.log('Utilisateur ajouté avec succès');
          this.showFlashMessage("User added", '/admin/users');
        } else {
          console.error('Échec de l\'ajout de l\'utilisateur');
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
      <h2>Add a user</h2>
    <div class="user-add">
      <form @submit.prevent="addUser">

        <input class="custom-container-name" v-model="userName" type="text" placeholder="User name" id="userName" required>

        <input class="custom-container" v-model="userEmail" type="email" id="userEmail" required>

        <input class="custom-container" v-model="userPassword" type="password" id="userPassword" required>

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

.product-edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgrey;
  width: 300px;
  height: 225px;
  margin: auto;
  border-radius: 5px;
}

.user-add form {
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

