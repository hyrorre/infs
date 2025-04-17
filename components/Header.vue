<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const profile = useSupabaseProfile()

const signOut = () => {
  const supabase = useSupabaseClient()
  supabase.auth.signOut().then(() => useRouter().push('/'))
}

const items = computed(
  () =>
    <NavigationMenuItem[][]>[
      [
        {
          label: 'INF SCORE TOOL',
          icon: 'i-tabler-infinity',
          to: '/my',
          active: false
        },
        {},
        {
          label: 'Score',
          icon: 'i-tabler-table',
          to: '/my'
        },
        {
          label: 'Statistics',
          icon: 'i-tabler-chart-bar',
          to: '/my/stat'
        }
      ],
      [
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
              to: '/signout'
            }
          ]
        }
      ]
    ]
)
</script>

<template>
  <header class="border-b border-(--ui-border) mb-8">
    <u-navigation-menu :items="items" content-orientation="vertical" />
  </header>
</template>
