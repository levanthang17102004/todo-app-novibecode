export default defineNuxtConfig({
  srcDir: 'src/',
  runtimeConfig: {
    mongoUri: process.env.MONGO_URI || ''
  }
})