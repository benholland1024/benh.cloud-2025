// https://nuxt.com/docs/api/configuration/nuxt-config
import colors from 'tailwindcss/colors'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  typescript: {
    strict: true,
    typeCheck: true
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui', 
    '@vueuse/nuxt'
  ],
  css: ['~/assets/custom.css']
})
