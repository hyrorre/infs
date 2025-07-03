<script setup lang="ts">
const { t } = useI18n()
const id = useRoute().params.id
const title = id + t('score_data')

useHead({
  title,
  meta: [
    { property: 'og:title', content: title },
    { property: 'twitter:title', content: title }
  ]
})

const { filter, sort, reverse } = useChartstatFilter()
const { data: chartstats, error, status, refresh } = useFetch(`/api/user/${id}/chartstat`)
</script>

<template>
  <Header />
  <u-container>
    <h1 class="text-2xl font-bold mb-4">{{ id + t('score_data') }}</h1>
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
