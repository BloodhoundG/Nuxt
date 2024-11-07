<template>
  <div>
    <div>
      <nav v-if="currentUser" class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
          <NuxtLink to="/" class="nav-item nav-link">Домашняя</NuxtLink>
          <NuxtLink v-if="isAdmin" to="/admin-page" class="nav-item nav-link"
            >Админка</NuxtLink
          >
          <a @click="logout" class="nav-item nav-link">Войти</a>
        </div>
      </nav>
      <div class="jumbotron">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 offset-sm-3"><NuxtPage /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <p>
        <a
          href="http://jasonwatmore.com/post/2019/03/08/vuejs-role-based-authorization-tutorial-with-example"
          target="_top"
          >Vue.js — Учебное пособие и пример авторизации на основе ролей</a
        >
      </p>
      <p>
        <a href="http://jasonwatmore.com" target="_top">JasonWatmore.com</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { authenticationService } from "~/_services/authentication.service";
import { Role } from "~/_helpers/role";

// создание реактивной переменной для хранения данных текущего пользователя
// включая данные о фейковом jwt-token
const currentUser = ref(null);

// вычисляемое свойство isAdmin указывает что был выполнен вход с правами администратора
const isAdmin = computed(() => {
  return currentUser.value && currentUser.value.role === Role.Admin;
});

// функция сбрасывает значение currentUser из локального хранилища
// и вызывает переход на страницу регистрации
const logout = () => {
  authenticationService.logout();
  navigateTo("/login-page");
};

// подписка на currentUser для отслеживания изменения данных
authenticationService.currentUser.subscribe((x) => (currentUser.value = x));
</script>
