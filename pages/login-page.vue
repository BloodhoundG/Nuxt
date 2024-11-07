<template>
  <div>
    <div class="alert alert-info">
      <strong>Normal User</strong> - U: user P: user
      <br />
      <strong>Administrator</strong> - U: admin P: admin
    </div>
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          v-model.trim="$v.username.$model"
          name="username"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.username.$error }"
        />
        <div v-if="submitted && !$v.username.required" class="invalid-feedback">
          Username is required
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          v-model.trim="$v.password.$model"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.password.$error }"
        />
        <div v-if="submitted && !$v.password.required" class="invalid-feedback">
          Password is required
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">
          <span
            class="spinner-border spinner-border-sm"
            v-show="loading"
          ></span>
          <span>Login</span>
        </button>
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { authenticationService } from "../_services/authentication.service";

let username = ref("");
let password = ref("");
let submitted = ref(false);
let loading = ref(false);
let returnUrl = ref("");
let error = ref("");

const rules = {
  username: { required },
  password: { required },
};

const $v = useVuelidate(rules, { username, password });

const onSubmit = () => {
  submitted.value = true;

  $v.$touch;

  if ($v.$invalid) {
    return;
  }

  loading.value = true;

  try {
    authenticationService
      .login(username.value, password.value)
      .then((user) => navigateTo(returnUrl.value));
  } catch (e) {
    error.value = err;
    loading.value = false;
  }
};

if (authenticationService.currentUserValue) {
  navigateTo("/");
}

returnUrl.value = useRoute().query.returnUrl || "/";
</script>
