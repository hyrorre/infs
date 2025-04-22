<script setup lang="ts">
const { filter, sort, reverse, chartstats } = defineProps<{
  filter: Filter
  sort: string
  reverse: boolean
  chartstats: FullChartstat[]
}>()

import type { TableColumn } from '@nuxt/ui'

const columns: TableColumn<FullChartstat>[] = [
  {
    accessorKey: 'songs.title',
    header: 'TITLE',
    cell: ({ row }) =>
      row.original.songs.title.replace(
        / *(-[^-]+-|\(.+\)|~.+~|～.+～|feat\..+|ft\..+|With Money.*|そしてお米を.*|-JAKA.*)$/,
        '\n$1'
      )
  },
  {
    accessorKey: 'difficulty',
    header: 'DIFF'
  },
  {
    accessorKey: 'charts.level',
    header: 'LEVEL'
  },
  {
    accessorKey: 'lamp',
    header: 'LAMP'
  },
  {
    accessorKey: 'grade',
    header: 'GRADE'
  },
  {
    accessorKey: 'ex_score',
    header: 'SCORE'
  },
  {
    accessorKey: 'miss',
    header: 'MISS',
    cell: ({ row }) => (row.getValue('miss') === 9999 ? '-' : row.getValue('miss'))
  }
]

const filterFn = (chartstat: FullChartstat) => {
  return (
    chartstat.difficulty.startsWith(filter.style) &&
    (filter.difficulty === null || chartstat.difficulty === filter.style + filter.difficulty) &&
    (filter.level === null || chartstat.charts.level === filter.level) &&
    (filter.lamp === null || chartstat.lamp === filter.lamp) &&
    (filter.grade === null || chartstat.grade === filter.grade)
  )
}

const sortFn = (a: FullChartstat, b: FullChartstat) => {
  if (sort === 'TITLE') {
    if (a.songs.title < b.songs.title) {
      return reverse ? 1 : -1
    } else if (a.songs.title > b.songs.title) {
      return reverse ? -1 : 1
    } else {
      return 0
    }
  } else if (sort === 'DIFFICULTY') {
    const difficulties = ['SPB', 'SPN', 'SPH', 'SPA', 'SPL', 'DPB', 'DPN', 'DPH', 'DPA', 'DPL']
    return (reverse ? -1 : 1) * (difficulties.indexOf(b.difficulty) - difficulties.indexOf(a.difficulty))
  } else if (sort === 'LEVEL') {
    return reverse ? b.charts.level - a.charts.level : a.charts.level - b.charts.level
  } else if (sort === 'LAMP') {
    const lamps = ['NP', 'AC', 'EC', 'NC', 'HC', 'EX', 'FC']
    return reverse ? lamps.indexOf(b.lamp) - lamps.indexOf(a.lamp) : lamps.indexOf(a.lamp) - lamps.indexOf(b.lamp)
  } else if (sort === 'SCORERATE') {
    return reverse ? b.percent_max - a.percent_max : a.percent_max - b.percent_max
  } else if (sort === 'MISS') {
    return reverse ? b.miss - a.miss : a.miss - b.miss
  }
  return 0
}

const profile = useSupabaseProfile()
</script>

<template>
  <section>
    <div class="flex justify-between items-center">
      <div v-if="chartstats">Count : {{ chartstats.length }}</div>
      <div>
        <u-button
          v-if="$route.params.id || profile?.scope === 'public'"
          :href="`https://x.com/intent/tweet?text=${encodeURI(useRequestURL().hostname + '/user/' + ($route.params.id || profile?.id))}`"
          target="_blank"
          variant="outline"
          color="neutral"
          class="mr-2"
          icon="i-tabler-brand-x"
        >
          Share
        </u-button>
        <u-button variant="outline" color="neutral" icon="i-tabler-refresh" @click="$emit('refresh')">Reload</u-button>
      </div>
    </div>
    <u-table :data="chartstats.filter(filterFn).sort(sortFn)" :columns="columns" class="score-table" />
  </section>
</template>
