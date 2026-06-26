import mongoose from 'mongoose'

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig()
  try {
    // Bắt buộc phải có await ở đây
    await mongoose.connect(config.mongoUri)
    console.log('Mongo connected')
  } catch (e) {
    console.error('Mongo connection Loi:', e)
  }
})