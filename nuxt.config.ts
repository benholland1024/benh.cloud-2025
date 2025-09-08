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
  app: {
    head: {
      link: [
        { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📡</text></svg>' }
      ]
    }
  },
  css: ['~/assets/custom.css']
})
