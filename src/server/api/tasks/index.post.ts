import Task from '~/server/models/Task'

export default defineEventHandler(async (event)=>{
    const body = await readBody(event)

    return await Task.create({

    title: body.title
    })
})