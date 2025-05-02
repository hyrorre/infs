<script setup lang="ts">
import { GChart } from 'vue-google-charts'

const id = useRoute().params.id
const title = `${id}'s SCORE STATISTICS`

useHead({
  title,
  meta: [
    { property: 'og:title', content: title },
    { property: 'twitter:title', content: title }
  ]
})

const { filter, sort, reverse } = useChartstatFilter()
const { data: chartstats, error, status, refresh } = useFetch<FullChartstat[]>(`/api/user/${id}/chartstat`)

const data = computed(() =>
  [['TEST', 'AAA', 'AA', 'A', 'B', 'C', 'D', 'F']].concat(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
      (level) =>
        [
          level,
          chartstats.value?.filter(
            (chartstat) =>
              chartstat.difficulty?.startsWith('SP') && chartstat.charts.level === level && chartstat.grade === 'AAA'
          ).length,
          chartstats.value?.filter(
            (chartstat) =>
              chartstat.difficulty?.startsWith('SP') && chartstat.charts.level === level && chartstat.grade === 'AA'
          ).length,
          chartstats.value?.filter(
            (chartstat) =>
              chartstat.difficulty?.startsWith('SP') && chartstat.charts.level === level && chartstat.grade === 'A'
          ).length,
          chartstats.value?.filter(
            (chartstat) =>
              chartstat.difficulty?.startsWith('SP') && chartstat.charts.level === level && chartstat.grade === 'B'
          ).length,
          chartstats.value?.filter(
            (chartstat) =>
              chartstat.difficulty?.startsWith('SP') && chartstat.charts.level === level && chartstat.grade === 'C'
          ).length,
          chartstats.value?.filter(
            (chartstat) =>
              chartstat.difficulty?.startsWith('SP') && chartstat.charts.level === level && chartstat.grade === 'D'
          ).length,
          chartstats.value?.filter(
            (chartstat) =>
              chartstat.difficulty?.startsWith('SP') && chartstat.charts.level === level && chartstat.grade === 'F'
          ).length
        ] as any
    )
  )
)

const options = {
  height: 600,
  legend: { position: 'top', maxLines: 3 },
  // bar: { groupWidth: '75%' },
  isStacked: 'percent'
}
</script>

<template>
  <Header :title="'My Score'" />
  <u-container>
    <h1 class="text-2xl font-bold mb-4">{{ id }}'s SCORE DATA</h1>
    <p v-if="status === 'pending'">Loading score data...</p>
    <p v-else-if="error">{{ error.message }}</p>
    <p v-else-if="!chartstats?.length">Score is not uploaded.</p>
    <GChart v-else type="BarChart" :data="data" :options="options" />
  </u-container>
  <Footer />
</template>
