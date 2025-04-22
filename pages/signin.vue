<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

useHead({
  title: 'SIGN IN'
})

const supabase = useSupabaseClient()

const form = reactive({
  email: '',
  password: ''
})
const error_message = ref('')

const submit = async (e: FormSubmitEvent<typeof form>) => {
  await supabase.auth.signInWithPassword(form).then(({ error }) => {
    if (error) {
      error_message.value = error.message
    } else {
      useRouter().push('/my')
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
          <div class="flex justify-between items-end">
            <u-link to="/forgot" class="text-left">Forgot your password?</u-link>
            <u-button type="submit" size="lg" class="mt-8">SIGN IN</u-button>
          </div>
        </u-form>
      </u-card>
    </div>
  </u-container>
</template>
