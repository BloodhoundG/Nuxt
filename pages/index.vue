<template>
  <div>
    <h1>Home</h1>
    <p>You're logged in with Vue.js & JWT!!</p>
    <p>
      Your role is: <strong>{{ currentUser.role }}</strong
      >.
    </p>
    <p>This page can be accessed by all authenticated users.</p>
    <div>
      Current user from secure api end point:
      <ul v-if="userFromApi">
        <li>{{ userFromApi.firstName }} {{ userFromApi.lastName }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { authenticationService } from "~/_services/authentication.service";
import { userService } from "~/_services/user.service";

definePageMeta({
  authorize: [],
});

let currentUser = ref(authenticationService.currentUserValue);

let userFromApi = ref(null);

userService
  .getById(currentUser.value.id)
  .then((user) => (userFromApi.value = user));
</script>
