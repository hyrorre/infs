<template>
  <u-app>
    <nuxt-page />
  </u-app>
</template>

<style lang="scss">
.content {
  text-align: start;
  p {
    margin-top: 1rem;
  }

  h1 {
    font-size: xx-large;
  }

  h2 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding-top: 2rem;
    // border-top: 1px solid var(--color-gray-300);
  }

  h3 {
    margin-top: 1rem;
    padding-top: 1rem;
    // border-top: 1px solid var(--color-gray-300);
  }

  pre {
    padding: 1rem;
    border-radius: 0.5rem;
    color: white;
    background-color: var(--color-gray-900);
    // TODO: update background-color
  }

  ol {
    margin-top: 1rem;
    margin-left: 1.5rem;
    list-style-type: decimal;
  }
}
</style>
