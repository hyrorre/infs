<script setup lang="ts">
const { filter, sort, reverse } = defineProps<{
  filter: Filter
  sort: string
  reverse: boolean
}>()
</script>

<template>
  <section class="mb-8">
    <div>
      <span class="mr-2">{{ $t('style') }}</span>
      <template v-for="style in ['SP', 'DP']">
        <u-button class="m-1" v-if="filter.style === style">{{ style }}</u-button>
        <u-button class="m-1" v-else @click="filter.style = style" variant="outline">{{ style }}</u-button>
      </template>
    </div>
    <div>
      <span class="mr-2">{{ $t('difficulty') }}</span>
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
      <span class="mr-2">{{ $t('level') }}</span>
      <template v-for="level in [...Array(12)].map((_, i) => i + 1)">
        <u-button class="m-1" v-if="filter.level === level" @click="filter.level = null">{{ level }}</u-button>
        <u-button class="m-1" v-else @click="filter.level = level" variant="outline">{{ level }}</u-button>
      </template>
    </div>
    <div>
      <span class="mr-2">{{ $t('lamp') }}</span>
      <template v-for="lamp in ['FC', 'EX', 'HC', 'NC', 'EC', 'AC', 'NP']">
        <u-button class="m-1" v-if="filter.lamp === lamp" @click="filter.lamp = null">{{ lamp }}</u-button>
        <u-button class="m-1" v-else @click="filter.lamp = lamp" variant="outline">{{ lamp }}</u-button>
      </template>
    </div>
    <div>
      <span class="mr-2">{{ $t('grade') }}</span>
      <template v-for="grade in ['AAA', 'AA', 'A', 'B', 'C', 'D', 'E', 'F']">
        <u-button class="m-1" v-if="filter.grade === grade" @click="filter.grade = null">{{ grade }}</u-button>
        <u-button class="m-1" v-else @click="filter.grade = grade" variant="outline">{{ grade }}</u-button>
      </template>
    </div>
    <div>
      <span class="mr-2">{{ $t('sort') }}</span>
      <template v-for="s in [$t('title'), $t('difficulty'), $t('level'), $t('lamp'), $t('scorerate'), $t('miss')]">
        <u-button class="m-1" v-if="sort === s" @click="$emit('update:reverse', !reverse)">
          {{ s + ' ' + (reverse ? '▼' : '▲') }}
        </u-button>
        <u-button
          class="m-1"
          v-else
          @click="
            () => {
              $emit('update:sort', s)
              $emit('update:reverse', false)
            }
          "
          variant="outline"
        >
          {{ s }}
        </u-button>
      </template>
    </div>
    <div>
      <span class="mr-2">{{ $t('limit') }}</span>
      <u-select class="m-1" v-model="filter.limit" :items="[100, 200, 500, 1000, 2000, 5000, 99999]"></u-select>
    </div>
  </section>
</template>
