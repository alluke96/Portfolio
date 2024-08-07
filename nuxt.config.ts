// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', 'nuxt-mdi'],
  app: {
    baseURL: '/allyson-dunke-portfolio/',
    buildAssetsDir: 'assets',
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})