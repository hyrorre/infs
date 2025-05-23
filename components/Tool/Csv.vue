<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const saved = ref(false)
const message = ref('')

const { data: csv } = useFetch('/api/my/csv')

const toast = useToast()
const copy = async () => {
  if (csv.value) {
    await navigator.clipboard.writeText(csv.value)
    toast.add({
      title: 'Copied.'
    })
  }
}
</script>

<template>
  <u-card>
    <template #header>
      <h3>Export CSV</h3>
    </template>
    <u-button @click="copy">Copy CSV</u-button>
    <p class="mt-8 whitespace-pre overflow-x-scroll">{{ csv }}</p>
  </u-card>
</template>
