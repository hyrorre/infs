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
          to: '/',
          active: false,
          class: 'site-title'
        }
      ].concat(
        user.value || id
          ? [
              {},
              {
                label: 'Score',
                icon: 'i-tabler-table',
                to: id ? `/user/${id}` : '/my'
              },
              {
                label: 'Stat',
                icon: 'i-tabler-chart-bar',
                to: id ? `/user/${id}/stat` : '/my/stat'
              }
            ]
          : ([] as any)
      ),
      user.value
        ? [
            {
              class: 'profile',
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
        : [
            {
              label: 'Sign In',
              icon: 'i-tabler-login',
              to: '/signin'
            },
            {
              label: 'Sign Up',
              icon: 'i-tabler-user-plus',
              to: '/signup'
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

<style>
@media screen and (max-width: 640px) {
  header {
    .site-title {
      .truncate {
        display: none;
      }
    }

    .profile {
      .truncate {
        display: none;
      }
    }
  }
}
</style>
