<script setup lang="ts">
useHead({
  title: 'beatmania IIDX INFINITAS SCORE TOOL',
  titleTemplate: '%s'
})

const user = useSupabaseUser()

const route = useRoute()
const { locale } = useI18n()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <Header />
  <u-container class="text-center">
    <ContentRenderer v-if="page" :value="page" class="content" />
  </u-container>
  <Footer />
</template>
