// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', 'nuxt-mdi', "@nuxtjs/i18n"],
  app: {
    baseURL: '/',
    buildAssetsDir: 'public',
    pageTransition: { name: 'page', mode: 'in-out' },
    head: {
      htmlAttrs: { lang: 'pt' },
      title: 'Allyson Dunke | Portfolio',
    }
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'pt',
        name: 'Português'
      },
      {
        code: 'en',
        name: 'English'
      }
    ],
    strategy: 'prefix_except_default', // ou 'no_prefix'
    pages: {
      index: {
        en: '/en',
        pt: '/',
      },
    },
  }
})