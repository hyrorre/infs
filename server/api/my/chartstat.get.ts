import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const {
    data: { user }
  } = await client.auth.getUser()

  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized.' })
  }

  const { data } = await client
    .from('chartstats')
    .select(
      'song_id, difficulty, grade, gradediff, lamp, miss, ex_score, percent_max, charts(note_count, level), songs(title)'
    )
    .eq('user_id', user.id)
  // .setHeader('Cache-Control', 'private, max-age: 86400000') // 1000 days

  return data
})
