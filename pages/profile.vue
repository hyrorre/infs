<template>
  <Header title="Profile" />
  <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
    <Profile />
    <div class="hidden sm:block">
      <div class="py-8"><div class="border-t border-gray-200 dark:border-gray-700"></div></div>
    </div>
    <ProfileEmail class="mt-10 sm:mt-0" />
    <div class="hidden sm:block">
      <div class="py-8"><div class="border-t border-gray-200 dark:border-gray-700"></div></div>
    </div>
    <ProfilePassword class="mt-10 sm:mt-0" />
    <div class="hidden sm:block">
      <div class="py-8"><div class="border-t border-gray-200 dark:border-gray-700"></div></div>
    </div>
    <ProfileDelete class="mt-10 sm:mt-0" />
  </div>
</template>
