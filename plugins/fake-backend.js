import { configureFakeBackend } from "../_helpers/fake-backend";

export default defineNuxtPlugin(() => {
  configureFakeBackend();
});
