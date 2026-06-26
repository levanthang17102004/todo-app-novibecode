import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
  if (isConnected) return

  const config = useRuntimeConfig()

  await mongoose.connect(config.mongoUri)

  isConnected = true

  console.log('Mongo Connected')
}