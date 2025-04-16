import { serverSupabaseServiceRole } from '#supabase/server'
import { Song } from '~/types/types'

export default defineEventHandler(async (event) => {
  type Body = {
    songid: string
    title: string
    title2: string
    genre: string
    artist: string
    bpm: string
    unlockType: string
  }
  const body: Body = await readBody(event)
  const client = await serverSupabaseServiceRole(event)

  const song: Song = {
    id: Number(body.songid),
    title: body.title,
    title2: body.title2,
    genre: body.genre,
    artist: body.artist,
    bpm: body.bpm,
    unlock_type: body.unlockType
  }

  await client.from('songs').upsert(song as any)

  return 'The song has been added.'
})
