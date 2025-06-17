import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const {
    data: { user }
  } = await client.auth.getUser()

  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized.' })
  }

  const { data, error } = await client.from('csv_sp').select('*').csv()

  if (!data) {
    throw createError({ statusCode: 500, message: error?.message ?? 'Internal Server Error' })
  }

  return data
})
