import { authenticationService } from "~/_services";

export default defineNuxtRouteMiddleware((to, from) => {
  const { authorize } = to.meta;

  const currentUser = authenticationService.currentUserValue;

  if (authorize) {
    if (!currentUser) {
      return navigateTo("/login-page");
    }

    if (Array.isArray(authorize)) {
      if (authorize.length && !authorize.includes(currentUser.role)) {
        return navigateTo("/");
      }
    }
  }

  nextTick();
});
