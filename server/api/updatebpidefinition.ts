import { serverSupabaseClient } from '#supabase/server'
import { Chart } from '~/types'

type Definition = {
  title: string
  difficulty: string
  wr: number | string
  avg: number | string
  notes: number | string
  bpm: string
  textage: string
  coef: number
}

export default defineEventHandler(async (event) => {
  const { body: definitions } = await $fetch<{ body: Definition[] }>('https://proxy.poyashi.me/?type=bpi').catch((error) => {
    throw createError({ statusCode: 500, message: error.message })
  })

  const client = await serverSupabaseClient(event)

  let { data: charts, error } = await client.from('charts').select('*, ...songs!charts_song_id_fkey(bpititle)')

  if (error || !charts) {
    throw createError({ statusCode: 500, message: error?.message })
  }

  const newcharts = charts.map((chart: Chart & { bpititle?: string }) => {
    const definition = definitions.find(
      (definition) =>
        chart.bpititle === definition.title &&
        chart.note_count === Number(definition.notes) &&
        ((chart.difficulty === 'SPH' && definition.difficulty === '3') ||
          (chart.difficulty === 'SPA' && definition.difficulty === '4') ||
          (chart.difficulty === 'SPL' && definition.difficulty === '10') ||
          (chart.difficulty === 'DPH' && definition.difficulty === '8') ||
          (chart.difficulty === 'DPA' && definition.difficulty === '9') ||
          (chart.difficulty === 'DPL' && definition.difficulty === '11'))
    )
    if (definition) {
      chart.wr = Number(definition.wr)
      chart.avg = Number(definition.avg)
      chart.coef = Number(definition.coef)
    }
    delete chart.bpititle
    return chart
  })

  console.log(newcharts)

  const { data, error: error2 } = await client
    .from('charts')
    .upsert(newcharts as never)
    .select()
  if (error2) {
    throw createError({ statusCode: 500, message: error2.message })
  }

  return data
})
