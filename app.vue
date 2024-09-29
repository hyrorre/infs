<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const profile = useSupabaseProfile()
const signin = (e: Event) => {
  const form = new FormData(e.target as HTMLFormElement)

  supabase.auth.signInWithPassword({
    email: form.get('email') as string,
    password: form.get('password') as string
  })
}

const signout = () => {
  supabase.auth.signOut()
}
</script>

<template>
  <div>
    <h1 class="text-center text-2xl mt-10">INFINITAS SCORE TOOL</h1>
    <form @submit.prevent="signin" class="text-center mt-4">
      <label class="block my-2">
        Email
        <input name="email" type="email" class="border" />
      </label>
      <label class="block my-2">
        Password
        <input name="password" type="password" class="border" />
      </label>
      <button class="p-1 border">Login</button>
    </form>
    <div class="text-center mt-2">
      <button class="p-1 border" @click="signout">Sign out</button>
      <div>{{ profile }}</div>
    </div>
  </div>
</template>
