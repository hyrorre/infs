export default function () {
  const { data: profile } = useFetch('/api/my/profile')
  return profile
}
