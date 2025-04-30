import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  await client.from('dummys').upsert({
    id: 1,
    update_at: new Date()
  } as any)

  return 'The dummy has been updated.'
})
