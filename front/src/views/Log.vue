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
            router.push('/admin');
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
    <p>{{ pAlert }}</p>
    <button type="button" id="log" @click="test_log">Log In</button>
  </form>
</template>
