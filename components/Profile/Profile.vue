<script setup lang="ts">
const supabase = useSupabaseClient()
const form = useSupabaseProfile()

const saved = ref(false)

const submit = (e: Event) => {
  supabase
    .from('users')
    .upsert(form.value as any)
    .then(() => {
      saved.value = true
    })
}
</script>

<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1 flex justify-between">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h3>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update your account's profile information and email address.
        </p>
      </div>
      <div class="px-4 sm:px-0"></div>
    </div>
    <div class="mt-5 md:mt-0 md:col-span-2">
      <div
        v-if="!form"
        class="px-4 py-5 bg-white dark:bg-gray-800 sm:p-6 shadow sm:rounded-tl-md sm:rounded-tr-md text-gray-700 dark:text-gray-300"
      >
        loading...
      </div>
      <form v-else @submit.prevent="submit">
        <div class="px-4 py-5 bg-white dark:bg-gray-800 sm:p-6 shadow sm:rounded-tl-md sm:rounded-tr-md">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-4">
              <label class="block font-medium text-sm text-gray-700 dark:text-gray-300" for="name">ID</label>
              <input
                class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full"
                id="name"
                type="text"
                required
                v-model="form.name"
              />
              <div class="mt-2" style="display: none"><p class="text-sm text-red-600 dark:text-red-400"></p></div>
            </div>
            <div class="col-span-6 sm:col-span-4">
              <label class="block font-medium text-sm text-gray-700 dark:text-gray-300" for="iidx_id">IIDX ID</label>
              <input
                class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full"
                id="iidx_id"
                type="text"
                v-model="form.iidx_id"
              />
              <div class="mt-2" style="display: none"><p class="text-sm text-red-600 dark:text-red-400"></p></div>
            </div>
            <div class="col-span-6 sm:col-span-4">
              <label class="block font-medium text-sm text-gray-700 dark:text-gray-300" for="infinitas_id">
                INFINITAS ID
              </label>
              <input
                class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full"
                id="infinitas_id"
                type="text"
                v-model="form.infinitas_id"
              />
              <div class="mt-2" style="display: none"><p class="text-sm text-red-600 dark:text-red-400"></p></div>
            </div>
            <!-- <div class="col-span-6 sm:col-span-4">
              <label class="block font-medium text-sm text-gray-700 dark:text-gray-300" for="apikey">API Key</label>
              <input
                class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full"
                id="apikey"
                type="password"
                required
                disabled
              />
              <div class="mt-2" style="display: none"><p class="text-sm text-red-600 dark:text-red-400"></p></div>
              <div class="flex justify-end items-center align-middle">
                <div class="mt-2 me-3">
                  <div class="text-sm text-gray-600 dark:text-gray-400" style="display: none">Copied.</div>
                </div>
                <button
                  class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150 mt-2 me-2"
                >
                  Copy
                </button>
                <button
                  class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150 mt-2"
                >
                  Regenerate
                </button>
              </div>
            </div> -->
            <div class="col-span-6 sm:col-span-4">
              <label class="block font-medium text-sm text-gray-700 dark:text-gray-300 mb-1" for="apikey">
                SCORE DATA
              </label>
              <label>
                <input
                  type="radio"
                  name="scope"
                  class="rounded-full dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
                  value="public"
                  v-model="form.scope"
                />
                <span class="mx-2 text-sm text-gray-600 dark:text-gray-400">Public</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="scope"
                  class="rounded-full dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
                  value="private"
                  v-model="form.scope"
                />
                <span class="mx-2 text-sm text-gray-600 dark:text-gray-400">Private</span>
              </label>
              <div class="mt-2" style="display: none"><p class="text-sm text-red-600 dark:text-red-400"></p></div>
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 text-end sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md"
        >
          <div class="me-3">
            <div class="text-sm text-gray-600 dark:text-gray-400" v-show="saved">Saved.</div>
          </div>
          <button class="btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>
