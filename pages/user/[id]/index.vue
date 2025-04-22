<script setup lang="ts">
const filter = ref<Filter>({
  style: 'SP',
  difficulty: null,
  level: null,
  lamp: null,
  grade: null
})

const sort = ref('TITLE')
const reverse = ref(false)

const id = useRoute().params.id

const { data: chartstats, error, status, refresh } = useFetch(`/api/user/${id}/chartstat`)
</script>

<template>
  <Header />
  <u-container>
    <h1 class="text-2xl font-bold mb-4">{{ id }}'s SCORE DATA</h1>
    <ChartstatFilter v-model:filter="filter" v-model:sort="sort" v-model:reverse="reverse" />
    <p v-if="status === 'pending'">Loading score data...</p>
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
