<script setup lang="ts">
useHead({
  title: 'MY PROFILE'
})
</script>

<template>
  <Header />
  <u-container>
    <Profile class="mt-8" />
    <ProfileEmail class="mt-8" />
    <ProfileDelete class="mt-8" />
  </u-container>
  <Footer />
</template>
