<template>
  <div>
    <h1>Admin</h1>
    <p>This page can only be accessed by administrators.</p>
    <div>
      All users from secure (admin only) api end point:
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id">
          {{ user.firstName + " " + user.lastName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { userService } from "../_services/user.service";
import { Role } from "~/_helpers/role";

definePageMeta({
  authorize: [Role.Admin],
});

const users = ref([]);

userService.getAll().then((user) => (users.value = user));
</script>
