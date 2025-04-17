<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()

const form = reactive({
  email: '',
  password: ''
})
const error_message = ref('')

const open = ref(false)

const submit = async (e: FormSubmitEvent<typeof form>) => {
  await supabase.auth.signUp(form).then(({ error }) => {
    if (error) {
      error_message.value = error.message
    } else {
      error_message.value = ''
      open.value = true // open modal
    }
  })
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
          <u-form-field label="Password" name="password" class="mt-4">
            <u-input v-model="form.password" required class="w-full" size="lg" type="password" />
          </u-form-field>
          <p>{{ error_message }}</p>
          <div class="flex justify-end items-end">
            <u-button type="submit" size="lg" class="mt-8">SIGN UP</u-button>
          </div>
        </u-form>
      </u-card>
    </div>
    <u-modal v-model:open="open" :close="false">
      <template #header>
        <h2 class="text-xl">Sign up completed.</h2>
      </template>
      <template #body>
        <p>Check your email box.</p>
        <u-button to="/" class="mt-4">Close</u-button>
      </template>
    </u-modal>
  </u-container>
</template>
