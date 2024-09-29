<script setup lang="ts">
const supabase = useSupabaseClient()

const actionIsSignin = ref(true)
const submit = (e: Event) => {
  const form = new FormData(e.target as HTMLFormElement)

  if (actionIsSignin.value) {
    supabase.auth.signInWithPassword({
      email: form.get('email') as string,
      password: form.get('password') as string
    })
  } else {
    supabase.auth.signUp({
      email: form.get('email') as string,
      password: form.get('password') as string
    })
  }
}
</script>

<template>
  <div class="text-center mt-12">
    <h1 class="text-2xl text-gray-700 dark:text-gray-300">beatmania IIDX INFINITAS SCORE TOOL</h1>
    <div
      class="m-auto w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"
    >
      <form @submit.prevent="submit">
        <div>
          <label class="label" for="email">Email</label>
          <input class="input" name="email" type="email" required autofocus />
        </div>
        <div class="mt-4">
          <label class="label" for="password">Password</label>
          <input class="input" name="password" type="password" required />
        </div>
        <div class="flex items-center justify-end mt-4">
          <nuxt-link
            class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            to="/forgot-password"
            v-show="actionIsSignin"
          >
            Forgot your password?
          </nuxt-link>
          <button class="btn-primary ms-4">
            {{ actionIsSignin ? 'SIGN IN' : 'SIGN UP' }}
          </button>
        </div>
      </form>
    </div>
    <div class="mt-8">
      Or
      <button class="btn-secondary ms-2" @click="actionIsSignin = !actionIsSignin">
        {{ actionIsSignin ? 'SIGN UP' : 'SIGN IN' }}
      </button>
    </div>
  </div>
</template>
