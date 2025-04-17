<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const saved = ref(false)
const error_message = ref('')

const form = reactive({
  email: ''
})

const submit = async (e: FormSubmitEvent<typeof form>) => {
  supabase.auth.updateUser(form).then(({ data, error }) => {
    if (error) {
      error_message.value = error.message
    } else {
      error_message.value = ''
      saved.value = true
    }
  })
}
</script>

<template>
  <u-card>
    <template #header>
      <h3>Email</h3>
      <p>Update your account's email address.</p>
    </template>
    <div v-if="!user?.email">loading...</div>
    <u-form v-else :state="form" @submit="submit">
      <u-form-field label="Email" name="email">
        <u-input v-model="form.email" required autofocus class="w-full" size="lg" />
      </u-form-field>
      <p>{{ error_message }}</p>
      <u-button>Save</u-button>
    </u-form>
  </u-card>
</template>
