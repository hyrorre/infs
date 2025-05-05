<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const visible = ref(false)
const message = ref('')
const form = reactive({
  del: ''
})

const submit = () => {
  if (form.del.includes('Delete')) {
    message.value = 'Please enter "Delete" to confirm.'
    return
  }
  useFetch('/api/user/delete', {
    method: 'POST'
  })
    .then(() => {
      message.value = 'Account Deleted.'
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    })
    .catch((error) => {
      message.value = error.message
    })
}
</script>

<template>
  <u-card>
    <template #header>
      <h3>Delete Account</h3>
    </template>
    <div>Once your account is deleted, all of its resources and data will be permanently deleted.</div>
    <u-modal>
      <u-button color="error" class="mt-4">Delete Account</u-button>
      <template #body>
        <u-form :state="form" @submit="submit">
          Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will
          be permanently deleted. Please enter "Delete" to confirm you would like to permanently delete your account.
          <u-form-field name="del" class="mt-4">
            <u-input v-model="form.del" required class="w-full" size="lg" />
          </u-form-field>
          <div class="mt-4 flex justify-end items-center">
            <div class="mr-4">{{ message }}</div>
            <u-button color="error" type="submit">DELETE ACCOUNT</u-button>
          </div>
        </u-form>
      </template>
    </u-modal>
  </u-card>
</template>
