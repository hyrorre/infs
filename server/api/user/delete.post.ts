import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)
  const user = await client.auth.getUser()
  if (!user.data.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized.' })
  }
  const { error } = await client.auth.admin.deleteUser(user.data.user.id)
  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }
  return 'The user has been deleted.'
})
