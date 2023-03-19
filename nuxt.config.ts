export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
    '@kidonng/daisyui/index.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  ssr: false,
  runtimeConfig: {
    public: {
      dbUrl: process.env.POCKETBASE_URL,
    },
  },
})
