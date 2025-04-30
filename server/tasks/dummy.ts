import { serverSupabaseClient } from '#supabase/server'

export default defineTask({
  meta: {
    name: 'dummy',
    description: 'Dummy task for supabase'
  },
  run: async (event: any) => {
    const client = await serverSupabaseClient(event)

    await client.from('dummys').upsert({
      id: 1,
      update_at: new Date()
    } as any)

    return {
      result: 'The dummy has been updated.'
    }
  }
})
