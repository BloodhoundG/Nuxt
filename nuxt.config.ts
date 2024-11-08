// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  build: {
    transpile: ["rxjs"],
  },
  modules: ["@vee-validate/nuxt"],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  plugins: ["~/plugins/fake-backend.js"],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "//netdna.bootstrapcdn.com/bootstrap/4.2.0/css/bootstrap.min.css",
        },
      ],
    },
  },
});
