<template>
  <div>
    <h1>Домашняя</h1>
    <p>Вы вошли в систему с помощью Vue.js и JWT!!</p>
    <p>
      Ваша роль это: <strong>{{ currentUser.role }}</strong
      >.
    </p>
    <p>Доступ к этой странице имеют все аутентифицированные пользователи.</p>
    <div>
      Текущий пользователь из безопасной конечной точки API:
      <ul v-if="userFromApi">
        <li>{{ userFromApi.firstName }} {{ userFromApi.lastName }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { authenticationService } from "~/_services/authentication.service";
import { userService } from "~/_services/user.service";

// установка метаданных страницы
definePageMeta({
  authorize: [],
  middleware: ["auth"],
});

// создание реактивной переменной для хранения данных текущего пользователя
// включая данные о фейковом jwt-token
const currentUser = ref(authenticationService.currentUserValue);

// создание реактивной переменной для хранения данных текущего пользователя
// данные получены в результате запроса на фейковый бекенд
// jwt-token в этих данных отсутствует
const userFromApi = ref(null);

// отправка запроса на фейковый бекенд
userService
  .getById(currentUser.value.id)
  .then(user => (userFromApi.value = user));
</script>
