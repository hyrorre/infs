<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()
</script>

<template>
  <u-container class="text-center h-full flex flex-col justify-center">
    <h1 class="text-4xl">beatmania IIDX INFINITAS SCORE TOOL</h1>
    <div class="mt-8">
      <u-link to="/signin" class="m-4">SIGN IN</u-link>
      <u-link to="/signup" class="m-4">SIGN UP</u-link>
    </div>
  </u-container>
  <Footer />
</template>
