<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

useHead({
  title: 'FORGOT PASSWORD'
})

const supabase = useSupabaseClient()

const form = reactive({
  email: ''
})
const error_message = ref('')

const submit = async (e: FormSubmitEvent<typeof form>) => {
  await supabase.auth.resetPasswordForEmail(form.email, { redirectTo: window.location.origin + '/reset' })
}
</script>

<template>
  <u-container class="text-center h-full flex flex-col justify-center">
    <h1 class="text-4xl">beatmania IIDX INFINITAS SCORE TOOL</h1>
    <div>
      <u-card class="mt-8 sm:max-w-md mx-auto" variant="subtle">
        <u-form :state="form" @submit="submit">
          <u-form-field label="Email" name="email">
            <u-input v-model="form.email" required autofocus class="w-full" size="lg" />
          </u-form-field>
          <p>{{ error_message }}</p>
          <div class="flex justify-end items-end">
            <u-button type="submit" size="lg" class="mt-8">SUBMIT</u-button>
          </div>
        </u-form>
      </u-card>
    </div>
  </u-container>
</template>
