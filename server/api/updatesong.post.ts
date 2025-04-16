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

  await client.from('songs').upsert(song as any)

  return 'The song has been updated.'
})
