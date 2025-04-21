<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const saved = ref(false)
const message = ref('')

const submit = async () => {
  supabase.auth.updateUser({ email: user.value?.email }).then(({ data, error }) => {
    message.value = error ? error.message : 'Check your email box.'
  })
}
</script>

<template>
  <u-card>
    <template #header>
      <h3>Email</h3>
    </template>
    <div v-if="!user?.email">loading...</div>
    <u-form v-else :state="user" @submit="submit">
      <u-form-field label="Email" name="email">
        <u-input v-model="user.email" required autofocus class="w-full" size="lg" />
      </u-form-field>
      <div class="mt-4 flex justify-end items-center">
        <div class="mr-4">{{ message }}</div>
        <u-button type="submit">Save</u-button>
      </div>
    </u-form>
  </u-card>
</template>
