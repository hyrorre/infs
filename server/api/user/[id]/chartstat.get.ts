import { serverSupabaseServiceRole } from '#supabase/server'
import { Profile } from '~/types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)
  const user_name = event.context.params?.id
  // const {
  //   data: { user }
  // } = await client.auth.getUser()

  if (!user_name) {
    throw createError({ statusCode: 400, message: 'Bad Request.' })
  }

  const { data: profile } = await client.from('profiles').select('id, scope').eq('name', user_name).single<Profile>()
  if (!profile || profile.scope !== 'public') {
    throw createError({ statusCode: 403, message: 'Score is private.' })
  }

  const { data } = await client
    .from('chartstats')
    .select(
      'song_id, difficulty, grade, gradediff, lamp, miss, ex_score, percent_max, charts(note_count, level), songs(title)'
    )
    .eq('user_id', profile.id)
  // .setHeader('Cache-Control', 'private, max-age: 86400000') // 1000 days

  return data
})
