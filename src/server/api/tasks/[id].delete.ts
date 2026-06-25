import Task from '~/server/models/Task'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  return await Task.findByIdAndDelete(id)
})