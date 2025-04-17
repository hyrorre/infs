<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()
const form = useSupabaseProfile()

const saved = ref(false)

const submit = (e: FormSubmitEvent<typeof form.value>) => {
  supabase
    .from('users')
    .upsert(form as any)
    .then(() => {
      saved.value = true
    })
}
</script>

<template>
  <u-card>
    <template #header>
      <h3>Profile Information</h3>
      <p>Update your account's profile information and email address.</p>
    </template>
    <div v-if="!form">loading...</div>
    <u-form v-else :state="form" @submit="submit">
      <u-form-field label="ID" name="name">
        <u-input v-model="form.name" required class="w-full" size="lg" />
      </u-form-field>
      <u-form-field label="IIDX ID" name="iidx_id">
        <u-input v-model="form.iidx_id" required class="w-full" size="lg" />
      </u-form-field>
      <u-form-field label="INFINITAS ID" name="infinitas_id">
        <u-input v-model="form.infinitas_id" required class="w-full" size="lg" />
      </u-form-field>

      <URadioGroup
        v-model="form.scope"
        :items="[
          { label: 'Public', value: 'public' },
          { label: 'Private', value: 'private' }
        ]"
        orientation="horizontal"
      />
      <div>
        <div v-show="saved">Saved.</div>
      </div>
      <u-button>Save</u-button>
    </u-form>
  </u-card>
</template>
