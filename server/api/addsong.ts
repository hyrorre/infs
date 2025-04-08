import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseServiceRole(event)

  // const { count } = await client.from('songs').select().eq('id', body.songid)
  // if (count) {
  //   return 'The song has already been added.'
  // }

  await client.from('songs').upsert({
    iidx_id: body.songid,
    title: body.title,
    title2: body.title2,
    genre: body.genre,
    artist: body.artist,
    bpm: body.bpm,
    unlocktype: body.unlockType
  } as any)
  return
})
