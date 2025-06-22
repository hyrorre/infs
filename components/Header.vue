<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const signOut = () => {
  const supabase = useSupabaseClient()
  supabase.auth.signOut().then(() => useRouter().push(localePath('/')))
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
          to: localePath('/'),
          active: false,
          class: 'site-title'
        }
      ].concat(
        user.value || id
          ? [
              {},
              {
                label: t('score'),
                icon: 'i-tabler-table',
                to: localePath(id ? `/user/${id}` : '/my')
              },
              {
                label: t('stat'),
                icon: 'i-tabler-chart-bar',
                to: localePath(id ? `/user/${id}/stat` : '/my/stat')
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
                  label: t('profile'),
                  to: localePath('/my/profile')
                },
                {
                  label: t('signout'),
                  onSelect: () => signOut()
                }
              ]
            }
          ]
        : [
            {
              label: t('signin'),
              icon: 'i-tabler-login',
              to: localePath('/signin')
            },
            {
              label: t('signup'),
              icon: 'i-tabler-user-plus',
              to: localePath('/signup')
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
