<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const saved = ref(false)
const error_message = ref('')

const submit = (e: Event) => {
  const form = new FormData(e.target as HTMLFormElement)

  supabase.auth
    .updateUser({
      email: form.get('email') as string
    })
    .then(({ data, error }) => {
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
  <div class="md:grid md:grid-cols-3 md:gap-6 mt-10">
    <div class="md:col-span-1 flex justify-between">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Email</h3>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Update your account's email address.</p>
      </div>
      <div class="px-4 sm:px-0"></div>
    </div>
    <div class="mt-5 md:mt-0 md:col-span-2">
      <div
        v-if="!user?.email"
        class="px-4 py-5 bg-white dark:bg-gray-800 sm:p-6 shadow sm:rounded-tl-md sm:rounded-tr-md text-gray-700 dark:text-gray-300"
      >
        loading...
      </div>
      <form v-else @submit.prevent="submit">
        <div class="px-4 py-5 bg-white dark:bg-gray-800 sm:p-6 shadow sm:rounded-tl-md sm:rounded-tr-md">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-4">
              <label class="block font-medium text-sm text-gray-700 dark:text-gray-300" for="email">Email</label>
              <input
                class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full"
                id="email"
                type="email"
                name="email"
                required
                :value="user.email"
              />
              <div class="mt-2" style="display: none"><p class="text-sm text-red-600 dark:text-red-400"></p></div>
              <div class="hidden">
                <p class="text-sm mt-2 dark:text-white">
                  Your email address is unverified.
                  <button
                    class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                  >
                    Click here to re-send the verification email.
                  </button>
                </p>
                <div class="mt-2 font-medium text-sm text-green-600 dark:text-green-400" style="display: none">
                  A new verification link has been sent to your email address.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 text-end sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md"
        >
          <div class="me-3">
            <div class="text-sm text-gray-600 dark:text-gray-400" v-show="saved">Check your email box.</div>
            <div class="mt-2">
              <p class="text-sm text-red-600 dark:text-red-400">{{ error_message }}</p>
            </div>
          </div>
          <button class="btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>
