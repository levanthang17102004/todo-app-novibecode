export default defineNuxtConfig({
  srcDir: 'src/',
  compatibilityDate: '2026-06-26',

  nitro: {
    srcDir: '.' 
  },

  runtimeConfig: {
    mongoUri: process.env.MONGO_URI
  }
})