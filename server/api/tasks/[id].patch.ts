import Task from "~~/server/models/Task"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Id is required'
    })
  }

  const body = await readBody(event)

  return await Task.findByIdAndUpdate(
    id,
    body,
    {
      new: true
    }
  )
})