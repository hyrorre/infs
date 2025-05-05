<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const {
  data: form,
  error,
  status
} = useAsyncData<Profile>(async () => {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.value!.id).single<Profile>()
  if (error) {
    const { data, error: error2 } = await supabase
      .from('profiles')
      .insert({ id: user.value?.id } as any)
      .select()
      .single<Profile>()
    if (error2) {
      throw error
    }
    return data as any
  }
  return data as any
})

const message = ref('')

const submit = () => {
  supabase
    .from('profiles')
    .upsert(form.value as any)
    .then(async ({ error }) => {
      message.value = error ? error.message : 'Saved.'
    })
}
</script>

<template>
  <u-card>
    <template #header>
      <h3>Profile</h3>
    </template>
    <div v-if="status === 'pending'">loading...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <u-form v-else-if="form" :state="form" @submit="submit">
      <u-form-field label="ID" name="name">
        <u-input v-model="form.name" required class="w-full" size="lg" />
      </u-form-field>
      <u-form-field label="IIDX ID" name="iidx_id" class="mt-4">
        <u-input v-model="form.iidx_id" class="w-full" size="lg" />
      </u-form-field>
      <u-form-field label="INFINITAS ID" name="infinitas_id" class="mt-4">
        <u-input v-model="form.infinitas_id" class="w-full" size="lg" />
      </u-form-field>
      <URadioGroup
        v-model="form.scope"
        :items="[
          { label: 'Public', value: 'public' },
          { label: 'Private', value: 'private' }
        ]"
        orientation="horizontal"
        class="mt-4"
      />
      <p class="mt-1 text-gray-500">
        {{ form.scope === 'public' ? 'Everyone can see your scores.' : 'Only you can see your scores.' }}
      </p>
      <div class="mt-4 flex justify-end items-center">
        <div class="mr-4">{{ message }}</div>
        <u-button type="submit">Save</u-button>
      </div>
    </u-form>
  </u-card>
</template>
