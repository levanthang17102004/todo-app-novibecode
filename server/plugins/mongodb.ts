import mongoose from 'mongoose'

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig()
  const uri = config.mongoUri

  if (!uri) {
    console.error('MONGODB ERROR')
    return
  }

  mongoose.set('bufferCommands', false) 

  try {
    console.log('Continue connect MongoDB...')
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    })
    console.log('MONGODB SUCCESS')
  } catch (error) {
    console.error('MONGODB CRITICAL ERROR')
    console.error(error)
  }
})