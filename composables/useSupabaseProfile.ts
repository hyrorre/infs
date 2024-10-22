export type Profile = {
  id: string
  name: string
  iidx_id: string
  infinitas_id: string
  scope: 'private' | 'public' | 'rival'
}

export default function () {
  const profile = ref<Profile | null>(null)
  const supabase = useSupabaseClient()
  
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      supabase
        .from('profiles')
        .select()
        .eq('id', session.user.id)
        .then(({ data }) => {
          profile.value = data?.at(0) ?? null
        })
    } else {
      profile.value = null
    }
  })

  return profile
}
