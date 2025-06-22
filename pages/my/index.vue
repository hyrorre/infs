<script setup lang="ts">
useHead({
  title: 'MY SCORE DATA'
})

definePageMeta({
  middleware: async () => {
    const { data: profile } = await useFetch('/api/my/profile')
    if (!profile.value) {
      return navigateTo('/my/profile')
    }
  }
})

const { filter, sort, reverse } = useChartstatFilter()
const { data: chartstats, error, status, refresh } = useFetch('/api/my/chartstat')
</script>

<template>
  <Header />
  <u-container>
    <h1 class="text-2xl font-bold mb-4">MY SCORE DATA</h1>
    <ChartstatFilter v-model:filter="filter" v-model:sort="sort" v-model:reverse="reverse" />
    <p v-if="status === 'pending'">{{ $t('loading') }}</p>
    <p v-else-if="error">{{ error.message }}</p>
    <p v-else-if="!chartstats?.length">Score is not uploaded.</p>
    <ChartstatTable
      v-else
      :filter="filter"
      :sort="sort"
      :reverse="reverse"
      :chartstats="chartstats"
      @refresh="refresh()"
    />
  </u-container>
  <Footer />
</template>
