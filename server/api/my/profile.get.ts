import { serverSupabaseClient } from '#supabase/server'
import { Profile } from '~/types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const {
    data: { user }
  } = await client.auth.getUser()

  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized.' })
  }

  const { data } = await client.from('profiles').select().eq('id', user.id).single<Profile>()
  return data
})
