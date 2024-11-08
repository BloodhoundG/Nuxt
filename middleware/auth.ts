import { authenticationService } from "~/_services";

export default defineNuxtRouteMiddleware((to, from) => {
  const { authorize } = to.meta;
  const currentUser = authenticationService.currentUserValue;

  if (currentUser && to.path === "/login-page") {
    return navigateTo("/");
  }

  if (authorize) {
    if (Array.isArray(authorize)) {
      if (authorize.length && !authorize.includes(currentUser.role)) {
        return navigateTo("/");
      }
    }

    if (!currentUser) {
      return navigateTo("/login-page");
    }
  }

  nextTick();
});
