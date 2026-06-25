import mongoose from "mongoose";

export default defineNitroPlugin(async () =>{
const config = useRuntimeConfig()
const mongoUri=String(config.mongoUri)
    try{
await mongoose.connect(mongoUri)
console.log('MongoDB goodddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
    }
    catch(error){
        console.error(error)
    };
    });
