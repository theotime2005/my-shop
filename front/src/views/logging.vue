<script setup>
import logging_check from "@/components/logging_check.vue";

function send_to_test() {
  let email = document.getElementById("email");
  let password=document.getElementById("password");
  if (email.value.length>0 && password.value.length>0) {

  }
}
</script>

<template>
  <h1>Logging</h1>
  <form>
    <label for="email">Enter your email</label>
    <input type="email" id="email" placeholder="john.kenedy@whitehouse.com" required>
    <label for="password">Password</label>
    <input type="password" id="password" required>
    <label for="log">Logging</label>
    <input type="button" id="log" @click=send_to_test>
  </form>
</template>