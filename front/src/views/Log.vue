<script>
import { ref } from "vue";
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const pAlert = ref(""); // Définir pAlert avec ref()

    const router = useRouter();

    async function test_log() {
      pAlert.value="";
      if (email.value.length > 0 && password.value.length > 0) {
        try {
          const data = {
            email: email.value,
            password: password.value
          };

          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };

          const logRequest = await fetch("http://localhost/authentication_token", requestOptions);
          if (logRequest.status === 401) {
            pAlert.value = "Your email or your password isn't correct"; // Utiliser pAlert.value
          } else {
            const data_token = await logRequest.json();
            sessionStorage.setItem("user_token", data_token.token);
            router.push('/admin/products');
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    return {
      email,
      password,
      pAlert, // Retourner pAlert
      test_log
    };
  }
};
</script>


<template>
  <h1>Log in</h1>
  <form @submit.prevent="test_log">
    <label for="email">Enter your email</label>
    <input type="email" id="email" v-model="email" placeholder="john.kennedy@whitehouse.com" required>
    <label for="password">Password</label>
    <input type="password" id="password" v-model="password" required>
    <p idd="alert">{{ pAlert }}</p>
    <button type="button" id="log" @click="test_log">Log In</button>
  </form>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#app {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  text-align: center;
}

h1 {
  color: #333;
}

form {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

#alert {
  color: #d9534f;
  margin-top: 10px;
}
</style>