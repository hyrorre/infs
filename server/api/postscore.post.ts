import { serverSupabaseServiceRole } from '#supabase/server'
import { Chart, Chartstat } from '~/types'

function grade(score: number, max: number) {
  const percent = score / max
  if (percent < 2 / 9) return 'F'
  if (percent < 3 / 9) return 'E'
  if (percent < 4 / 9) return 'D'
  if (percent < 5 / 9) return 'C'
  if (percent < 6 / 9) return 'B'
  if (percent < 7 / 9) return 'A'
  if (percent < 8 / 9) return 'AA'
  else return 'AAA'
}

function gradediff(score: number, max: number) {
  const percent = score / max
  if (percent < 2 / 9) {
    if (percent < 2 / 18) {
      return 'F+' + score
    } else {
      return 'E-' + Math.ceil((max * 2) / 9 - score)
    }
  }
  if (percent < 3 / 9) {
    if (percent < 5 / 18) {
      return 'E+' + Math.ceil(score - (max * 2) / 9)
    } else {
      return 'D-' + Math.ceil((max * 3) / 9 - score)
    }
  }
  if (percent < 4 / 9) {
    if (percent < 7 / 18) {
      return 'D+' + Math.ceil(score - (max * 3) / 9)
    } else {
      return 'C-' + Math.ceil((max * 4) / 9 - score)
    }
  }
  if (percent < 5 / 9) {
    if (percent < 9 / 18) {
      return 'C+' + Math.ceil(score - (max * 4) / 9)
    } else {
      return 'B-' + Math.ceil((max * 5) / 9 - score)
    }
  }
  if (percent < 6 / 9) {
    if (percent < 11 / 18) {
      return 'B+' + Math.ceil(score - (max * 5) / 9)
    } else {
      return 'A-' + Math.ceil((max * 6) / 9 - score)
    }
  }
  if (percent < 7 / 9) {
    if (percent < 13 / 18) {
      return 'A+' + Math.ceil(score - (max * 6) / 9)
    } else {
      return 'AA-' + Math.ceil((max * 7) / 9 - score)
    }
  }
  if (percent < 8 / 9) {
    if (percent < 15 / 18) {
      return 'AA+' + Math.ceil(score - (max * 7) / 9)
    } else {
      return 'AAA-' + Math.ceil((max * 8) / 9 - score)
    }
  } else {
    if (percent < 17 / 18) {
      return 'AAA+' + Math.ceil(score - (max * 8) / 9)
    } else if (score < max) {
      return 'MAX-' + Math.ceil(max - score)
    } else {
      return 'MAX+0'
    }
  }
}

export default defineEventHandler(async (event) => {
  type Body = {
    apikey: string
    songid: string
    diff: 'SPB' | 'SPN' | 'SPH' | 'SPA' | 'SPL' | 'DPB' | 'DPN' | 'DPH' | 'DPA' | 'DPL'
    exscore: string
    misscount: string
    lamp: string
  }
  const body: Body = await readBody(event)
  const client = await serverSupabaseServiceRole(event)

  if (!body.apikey) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { data: user } = (await client.from('apikeys').select('id').eq('apikey', body.apikey).single()) as {
    data: { id: string }
  }
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { data: chart } = (await client
    .from('charts')
    .select('note_count')
    .eq('song_id', body.songid)
    .eq('difficulty', body.diff)
    .single()) as { data: Chart }
  if (!chart) {
    throw createError({ statusCode: 404, message: 'Chart Not Found' })
  }

  const chartstat: Chartstat = {
    user_id: user.id,
    song_id: Number(body.songid),
    difficulty: body.diff,
    grade: grade(Number(body.exscore), chart.note_count * 2),
    gradediff: gradediff(Number(body.exscore), chart.note_count * 2),
    lamp: body.lamp,
    miss: Math.min(Number(body.misscount), 9999),
    ex_score: Number(body.exscore),
    percent_max: Number(body.exscore) / (chart.note_count * 2)
  }

  const result = await client.from('chartstats').upsert(chartstat as any)

  if (result.error) {
    throw createError({ statusCode: 500, message: result.error.message })
  }

  return 'The score has been posted.'
})
