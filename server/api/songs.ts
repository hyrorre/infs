import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // const body = await readBody(event)

  const client = await serverSupabaseServiceRole(event)

  const { data } = await client.from('songs').select()

  return data
})
