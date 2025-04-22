<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const signOut = () => {
  const supabase = useSupabaseClient()
  supabase.auth.signOut().then(() => useRouter().push('/'))
}

const id = useRoute().params.id
const user = useSupabaseUser()
const profile = useSupabaseProfile()

const items = computed(
  () =>
    <NavigationMenuItem[][]>[
      [
        {
          label: 'INF SCORE TOOL',
          icon: 'i-tabler-infinity',
          to: user.value ? '/my' : '/',
          active: false
        },
        {},
        {
          label: 'Score',
          icon: 'i-tabler-table',
          to: id ? `/user/${id}` : '/my'
        },
        {
          label: 'Statistics',
          icon: 'i-tabler-chart-bar',
          to: id ? `/user/${id}/stat` : '/my/stat'
        }
      ],
      user.value
        ? [
            {
              label: profile.value?.name,
              icon: 'i-tabler-user',
              children: [
                {
                  label: 'Profile',
                  to: '/my/profile'
                },
                {
                  label: 'Sign Out',
                  onSelect: () => signOut()
                }
              ]
            }
          ]
        : []
    ]
)
</script>

<template>
  <header class="border-b border-(--ui-border) mb-8">
    <u-navigation-menu :items="items" content-orientation="vertical" />
  </header>
</template>
