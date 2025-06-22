<script setup lang="ts">
const { locales, setLocale, locale } = useI18n()
</script>

<template>
  <footer class="py-16 text-center text-sm text-black dark:text-white/70">
    <p>hyrorre all rights reserved.</p>
    <p class="mt-2">
      <u-link to="https://github.com/hyrorre/infs" target="_blank">GitHub</u-link>
      <u-link to="https://x.com/hyrorre" target="_blank" class="ml-2">Twitter</u-link>
      <u-link :to="$localePath('/user/hyrorre')" class="ml-2">Score</u-link>
    </p>
    <p class="mt-2">
      <u-link
        v-for="locale in locales"
        @click="setLocale(locale.code)"
        class="first:ml-0 ml-2"
        :active="locale.code === $i18n.locale"
      >
        {{ locale.name }}
      </u-link>
    </p>
  </footer>
</template>
