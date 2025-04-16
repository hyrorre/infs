import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  type Body = {
    songid: string
    unlockType: string
  }
  const body: Body = await readBody(event)
  const client = await serverSupabaseServiceRole(event)

  const song = {
    id: Number(body.songid),
    unlock_type: body.unlockType
  }

  const result = await client.from('songs').upsert(song as any)

  if (result.error) {
    throw createError({ statusCode: 500, message: result.error.message })
  }

  return 'The song has been updated.'
})
