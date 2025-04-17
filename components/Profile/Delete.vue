<script setup lang="ts">
const visible = ref(false)
</script>

<template>
  <u-card>
    <template #header>
      <h3>Delete Account</h3>
      <p>Permanently delete your account.</p>
    </template>
    <div>Once your account is deleted, all of its resources and data will be permanently deleted.</div>
    <div>
      <u-button type="button">Delete Account</u-button>
    </div>
  </u-card>
</template>
