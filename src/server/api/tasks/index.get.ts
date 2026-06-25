import Task from '~/server/models/Task'

export default defineEventHandler(async()=>{
    return await Task.find()
})