<template>
  <div>
    <div>
      <nav v-if="currentUser" class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
          <NuxtLink to="/" class="nav-item nav-link">Home</NuxtLink>
          <NuxtLink v-if="isAdmin" to="/admin-page" class="nav-item nav-link"
            >Admin</NuxtLink
          >
          <a @click="logout" class="nav-item nav-link">Logout</a>
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
          >Vue.js - Role Based Authorization Tutorial & Example</a
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

const currentUser = ref(null);

const isAdmin = computed(() => {
  return currentUser.value && currentUser.value.role === Role.Admin;
});

const logout = () => {
  authenticationService.logout();
  navigateTo("/login-page");
};

authenticationService.currentUser.subscribe((x) => (currentUser.value = x));
</script>
