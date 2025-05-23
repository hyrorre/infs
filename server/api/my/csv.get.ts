import { serverSupabaseClient } from '#supabase/server'
import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const {
    data: { user }
  } = await client.auth.getUser()

  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized.' })
  }

  const { data, error } = await client.from('csv_sp').select('*').csv()

  if (!data) {
    throw createError({ statusCode: 500, message: error?.message ?? 'Internal Server Error' })
  }

  const minified = stringify(parse(data))

  return minified
})
