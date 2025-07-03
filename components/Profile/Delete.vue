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
      <h3>{{ $t('delete_account') }}</h3>
    </template>
    <div>{{ $t('delete_account_description') }}</div>
    <u-modal>
      <u-button color="error" class="mt-4">{{ $t('delete_account') }}</u-button>
      <template #body>
        <u-form :state="form" @submit="submit">
          {{ $t('delete_account_confirm') }}
          <u-form-field name="del" class="mt-4">
            <u-input v-model="form.del" required class="w-full" size="lg" />
          </u-form-field>
          <div class="mt-4 flex justify-end items-center">
            <div class="mr-4">{{ message }}</div>
            <u-button color="error" type="submit">{{ $t('delete_account') }}</u-button>
          </div>
        </u-form>
      </template>
    </u-modal>
  </u-card>
</template>
