export default function () {
  const user = useSupabaseUser()
  if (!user.value) {
    return ref(null)
  }
  const { data: profile } = useFetch('/api/my/profile')
  return profile
}
