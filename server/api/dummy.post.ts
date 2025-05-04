import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)

  const { data, error } = await client.from('dummys').upsert({
    id: 1,
    updated_at: new Date()
  } as any)

  if (error) {
    console.error('Error updating dummy:', error)
    throw createError({ statusCode: 500, message: 'Internal Server Error' })
  }
  return 'The dummy has been updated.'
})
