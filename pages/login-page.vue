<template>
  <div>
    <div class="alert alert-info">
      <strong>Обычный пользователь</strong> - Логин: user Пароль: user
      <br />
      <strong>Администратор</strong> - Логин: admin Пароль: admin
    </div>
    <h2>Авторизация</h2>
    <VeeForm @submit="onSubmit">
      <div class="form-group">
        <label for="username">Имя пользователя</label>
        <VeeField
          v-model="username"
          v-slot="{ field, meta }"
          :rules="'required'"
          name="username"
        >
          <input
            type="text"
            v-bind="field"
            class="form-control"
            :class="meta.errors.length ? 'is-invalid' : ''"
          />
          <VeeErrorMessage name="username">
            <span class="is-invalid">Имя пользователя обязательно</span>
          </VeeErrorMessage>
        </VeeField>
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <VeeField
          v-model="password"
          v-slot="{ field, meta }"
          :rules="'required'"
          name="password"
        >
          <input
            type="password"
            v-bind="field"
            class="form-control"
            :class="meta.errors.length ? 'is-invalid' : ''"
          />
        </VeeField>
        <VeeErrorMessage name="password">
          <span class="is-invalid">Пароль обязателен</span>
        </VeeErrorMessage>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">
          <span
            class="spinner-border spinner-border-sm"
            v-show="loading"
          ></span>
          <span>Войти</span>
        </button>
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </VeeForm>
  </div>
</template>

<script setup>
import { authenticationService } from "../_services/authentication.service";
import { defineRule, configure } from "vee-validate";

// глобальная установка параметра валидации текущего поля при каждом его изменении
configure({ validateOnInput: true });

// глобально определяю правило для обязательных полей
defineRule("required", (value) => {
  if (!value || !value.length) {
    return "Обязательное поле";
  }
  return true;
});

// имя пользователя
const username = ref("");

// пароль пользователя
const password = ref("");

// флаг true/false для прелоадера который появляется при отправке формы
const loading = ref(false);

// переменная для перенаправления пользователя после авторизации
const returnUrl = ref("");

// данные ошибки
const error = ref("");

// функция вызывается при отправке форму
const onSubmit = async () => {
  // включается прелоадер
  loading.value = true;

  // происходит авторизация по введённому логину и паролю
  // если пользователь ввёл правильные данные происходит переход на другую страницу
  try {
    await authenticationService
      .login(username.value, password.value)
      .then((user) => navigateTo(returnUrl.value));
  } catch (err) {
    // в случае ошибки она отобразится под формой
    error.value = err;
  } finally {
    // выключается прелоадер
    loading.value = false;
  }
};

// если авторизация прошла успешно перенаправляет на домашнюю страницу
if (authenticationService.currentUserValue) {
  navigateTo("/");
}

// значение переменной становится равно текущему урлу или '/'
returnUrl.value = useRoute().query.returnUrl || "/";
</script>

<style>
.is-invalid {
  color: #ff0000;
}
</style>
