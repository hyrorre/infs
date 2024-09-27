<script lang="ts">
  import { enhance } from '$app/forms'
  const submit = (e: any) => {
    console.log(e)
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="text-center">
  <h1 class="mt-4 text-xl">INFINITAS SCORE TOOL</h1>

  <form method="POST" use:enhance={submit} class="bg-white dark:bg-gray-800">
    <label class="block my-2">
      Email
      <input
        name="email"
        type="email"
        class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1"
      />
    </label>
    <label class="block my-2">
      Password
      <input
        name="password"
        type="password"
        class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1"
      />
    </label>
    <button class="p-1 border">Login</button>
  </form>
</section>
