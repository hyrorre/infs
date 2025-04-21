import { serverSupabaseServiceRole } from '#supabase/server'
import { Song } from '~/types'

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

  const result = await client.from('songs').upsert(song as any)

  if (result.error) {
    throw createError({ statusCode: 500, message: result.error.message })
  }

  return 'The song has been added.'
})
