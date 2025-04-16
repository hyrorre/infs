import { serverSupabaseServiceRole } from '#supabase/server'
import { Chart } from '~/types/types'

export default defineEventHandler(async (event) => {
  type Body = {
    songid: string
    diff: 'SPB' | 'SPN' | 'SPH' | 'SPA' | 'SPL' | 'DPB' | 'DPN' | 'DPH' | 'DPA' | 'DPL'
    notecount: string
    level: string
  }
  const body: Body = await readBody(event)
  const client = await serverSupabaseServiceRole(event)

  const chart: Chart = {
    song_id: Number(body.songid),
    difficulty: body.diff,
    note_count: Number(body.notecount),
    level: Number(body.level)
  }

  await client.from('charts').upsert(chart as any)

  return 'The chart has been added.'
})
