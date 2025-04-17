<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { FullChartstat } from '~/types/types'

const columns: TableColumn<FullChartstat>[] = [
  {
    accessorKey: 'title',
    header: 'TITLE',
    cell: ({ row }) =>
      (row.getValue('title') as string).replace(
        / *(-[^-]+-|\(.+\)|~.+~|～.+～|feat\..+|ft\..+|With Money.*|そしてお米を.*|-JAKA.*)$/,
        '\n$1'
      )
  },
  {
    accessorKey: 'difficulty',
    header: 'DIFF'
  },
  {
    accessorKey: 'level',
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

const filter = ref<any>({
  style: 'SP',
  difficulty: null,
  level: null,
  lamp: null,
  grade: null
})

const sort = ref('TITLE')
const reverse = ref(false)
const isPrivate = ref(false)

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

const filterFn = (chartstat: any) => {
  return (
    chartstat.playtype === filter.value.style &&
    (filter.value.difficulty === null || chartstat.difficulty === filter.value.style + filter.value.difficulty) &&
    (filter.value.level === null || chartstat.level === filter.value.level) &&
    (filter.value.lamp === null || chartstat.lamp === filter.value.lamp) &&
    (filter.value.grade === null || chartstat.grade === filter.value.grade)
  )
}

const sortFn = (a: any, b: any) => {
  if (sort.value === 'TITLE') {
    if (a.title < b.title) {
      return reverse.value ? 1 : -1
    } else if (a.title > b.title) {
      return reverse.value ? -1 : 1
    } else {
      return 0
    }
  } else if (sort.value === 'DIFFICULTY') {
    return b.difficulty - a.difficulty
  } else if (sort.value === 'LEVEL') {
    return reverse.value ? b.level - a.level : a.level - b.level
  } else if (sort.value === 'LAMP') {
    const lamps = ['NP', 'AC', 'EC', 'NC', 'HC', 'EX', 'FC']
    return reverse.value ? lamps.indexOf(b.lamp) - lamps.indexOf(a.lamp) : lamps.indexOf(a.lamp) - lamps.indexOf(b.lamp)
  } else if (sort.value === 'SCORERATE') {
    return reverse.value ? b.percent_max - a.percent_max : a.percent_max - b.percent_max
  } else if (sort.value === 'MISS') {
    return reverse.value ? b.miss - a.miss : a.miss - b.miss
  }
  return 0
}
</script>

<template>
  <Header />
  <u-container>
    <section>
      <div>
        <span class="mr-2">STYLE</span>
        <template v-for="style in ['SP', 'DP']">
          <u-button class="m-1" v-if="filter.style === style">{{ style }}</u-button>
          <u-button class="m-1" v-else @click="filter.style = style" variant="outline">{{ style }}</u-button>
        </template>
      </div>
      <div>
        <span class="mr-2">DIFFICULTY</span>
        <template v-for="difficulty in ['B', 'N', 'H', 'A', 'L']">
          <u-button class="m-1" v-if="filter.difficulty === difficulty" @click="filter.difficulty = null">
            {{ difficulty }}
          </u-button>
          <u-button class="m-1" v-else @click="filter.difficulty = difficulty" variant="outline">{{
            difficulty
          }}</u-button>
        </template>
      </div>
      <div>
        <span class="mr-2">LEVEL</span>
        <template v-for="level in [...Array(12)].map((_, i) => i + 1)">
          <u-button class="m-1" v-if="filter.level === level" @click="filter.level = null">{{ level }}</u-button>
          <u-button class="m-1" v-else @click="filter.level = level" variant="outline">{{ level }}</u-button>
        </template>
      </div>
      <div>
        <span class="mr-2">LAMP</span>
        <template v-for="lamp in ['FC', 'EX', 'HC', 'NC', 'EC', 'AC', 'NP']">
          <u-button class="m-1" v-if="filter.lamp === lamp" @click="filter.lamp = null">{{ lamp }}</u-button>
          <u-button class="m-1" v-else @click="filter.lamp = lamp" variant="outline">{{ lamp }}</u-button>
        </template>
      </div>
      <div>
        <span class="mr-2">GRADE</span>
        <template v-for="grade in ['AAA', 'AA', 'A', 'B', 'C', 'D', 'E', 'F']">
          <u-button class="m-1" v-if="filter.grade === grade" @click="filter.grade = null">{{ grade }}</u-button>
          <u-button class="m-1" v-else @click="filter.grade = grade" variant="outline">{{ grade }}</u-button>
        </template>
      </div>
      <div>
        <span class="mr-2">SORT</span>
        <template v-for="s in ['TITLE', 'DIFFICULTY', 'LEVEL', 'LAMP', 'SCORERATE', 'MISS']">
          <u-button class="m-1" v-if="sort === s" @click="reverse = !reverse">
            {{ s + ' ' + (reverse ? '▼' : '▲') }}
          </u-button>
          <!-- prettier-ignore -->
          <u-button class="m-1" v-else @click="sort = s; reverse = false" variant="outline">
                {{ s }}
              </u-button>
        </template>
      </div>
    </section>
    <section>
      <div v-if="chartstats">Count : {{ chartstats.filter(filterFn).length }}</div>
      <div>
        <!-- <a
            :href="`https://x.com/intent/tweet?text=${encodeURI(
              route('user.name', props.rival ? props.rival.name : props.user.name)
            )}`"
            target="_blank"
            v-if="props.rival || props.user.scope === 'public'"
          >
            <u-button  >Share</u-button>
          </a> -->
        <u-button @click="refresh()">Reload</u-button>
      </div>
    </section>
    <section>
      <p v-if="isPrivate">{{ 'Rival' }}'s Score is private.</p>
      <p v-else-if="status === 'pending'">Loading score data...</p>
      <p v-else-if="!chartstats?.length">Score is not uploaded.</p>
      <u-table v-else :data="chartstats.filter(filterFn).sort(sortFn)" :columns="columns" class="score-table" />
    </section>
  </u-container>
</template>
