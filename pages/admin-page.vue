<template>
  <div>
    <h1>Администратор</h1>
    <p>Доступ к этой странице имеют только администратор.</p>
    <div>
      Все пользователи из безопасной (только администратор) конечной точки API:
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

// установка метаданных страницы
definePageMeta({
  authorize: [Role.Admin],
});

// массив пользователей, которым доступна админка
const users = ref([]);

// функция достаёт всех пользователей которым доступна админка и заносит их в users.value
userService.getAll().then((user) => (users.value = user));
</script>
