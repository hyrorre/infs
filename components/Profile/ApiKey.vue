<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { data: form } = useAsyncData<ApiKey>(async () => {
  const { data, error } = await supabase.from('apikeys').select('*').single<ApiKey>()
  if (error) {
    const { data, error: error2 } = await supabase
      .from('apikeys')
      .insert({ id: user.value?.id } as any)
      .select()
      .single<ApiKey>()
    if (error2) {
      throw error
    }
    return data as any
  }
  return data as any
})

const message = ref('')
const open = ref(false)

const input_type = ref('password')

const copy = () => {
  input_type.value = 'text'
  if (form.value) {
    navigator.clipboard.writeText(form.value.apikey)
    message.value = 'Copied to clipboard.'
  }
}

const submit = () => {
  form.value!.apikey = crypto.randomUUID()
  supabase
    .from('apikeys')
    .upsert(form.value as any)
    .then(async ({ error }) => {
      if (error) {
        message.value = error.message
        return
      }
      copy()
      open.value = false
    })
}
</script>

<template>
  <u-card>
    <template #header>
      <h3>Api Key</h3>
    </template>
    <div v-if="!form">loading...</div>
    <u-form v-else :state="form">
      <u-form-field label="API KEY" name="apikey" class="mt-4">
        <u-input v-model="form.apikey" class="w-full" size="lg" :type="input_type" disabled />
      </u-form-field>
      <div class="mt-4 flex justify-end items-center">
        <div class="mr-4">{{ message }}</div>
        <u-button type="submit" variant="outline" class="mr-2" @click="copy">Copy</u-button>
        <u-modal v-model:open="open">
          <u-button type="submit" variant="outline">Regenerate</u-button>
          <template #body>
            <div v-if="!form">loading...</div>
            <u-form v-else :state="form" @submit="submit">
              The API key you have been using will be invalidated.<br />Would you like to issue a new API key?
              <!-- 今まで使用していたAPIキーは無効になります。<br />新しいAPIキーを発行しますか？ -->
              <u-form-field name="apikey" class="invisible">
                <u-input v-model="form.apikey" required class="w-full" size="lg" />
              </u-form-field>
              <div class="flex justify-end items-center">
                <u-button type="submit" @click="submit">Regenerate</u-button>
              </div>
            </u-form>
          </template>
        </u-modal>
      </div>
    </u-form>
  </u-card>
</template>
