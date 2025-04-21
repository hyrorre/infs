<script setup lang="ts">
import { GChart } from 'vue-google-charts'

const force = ref(false)
const {
  data: chartstats,
  status,
  refresh,
  error
} = useFetch<FullChartstat[]>('https://infs.iidx.wiki/api/getscore/hyrorre', {
  method: 'GET',
  cache: force.value ? 'no-cache' : 'force-cache'
})

const data = computed(() =>
  [['TEST', 'AAA', 'AA', 'A', 'B', 'C', 'D', 'F']].concat(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((level) => [
      level,
      chartstats.value?.filter(
        (chartstat) => chartstat.difficulty?.startsWith('SP') && chartstat.level === level && chartstat.grade === 'AAA'
      ).length,
      chartstats.value?.filter(
        (chartstat) => chartstat.difficulty?.startsWith('SP') && chartstat.level === level && chartstat.grade === 'AA'
      ).length,
      chartstats.value?.filter(
        (chartstat) => chartstat.difficulty?.startsWith('SP') && chartstat.level === level && chartstat.grade === 'A'
      ).length,
      chartstats.value?.filter(
        (chartstat) => chartstat.difficulty?.startsWith('SP') && chartstat.level === level && chartstat.grade === 'B'
      ).length,
      chartstats.value?.filter(
        (chartstat) => chartstat.difficulty?.startsWith('SP') && chartstat.level === level && chartstat.grade === 'C'
      ).length,
      chartstats.value?.filter(
        (chartstat) => chartstat.difficulty?.startsWith('SP') && chartstat.level === level && chartstat.grade === 'D'
      ).length,
      chartstats.value?.filter(
        (chartstat) => chartstat.difficulty?.startsWith('SP') && chartstat.level === level && chartstat.grade === 'F'
      ).length
    ])
  )
)

const data_sample = [
  ['TEST', 'AAA', 'AA', 'A', 'B', 'C', 'D', 'F'],
  [1, 10, 24, 20, 32, 18, 5, 5],
  [2, 16, 22, 23, 30, 16, 9, 5],
  [3, 28, 19, 29, 30, 12, 13, 5]
]

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
    <h1>Statistics</h1>
    <p>{{ data }}</p>
    <GChart type="BarChart" :data="data" :options="options" />
  </u-container>
  <Footer />
</template>
