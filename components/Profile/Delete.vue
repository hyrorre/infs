<template>
  <div class="md:grid md:grid-cols-3 md:gap-6 mt-10 sm:mt-0">
    <div class="md:col-span-1 flex justify-between">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Delete Account</h3>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Permanently delete your account.</p>
      </div>
      <div class="px-4 sm:px-0"></div>
    </div>
    <div class="mt-5 md:mt-0 md:col-span-2">
      <div class="px-4 py-5 sm:p-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div class="max-w-xl text-sm text-gray-600 dark:text-gray-400">
          Once your account is deleted, all of its resources and data will be permanently deleted.
        </div>
        <div class="mt-5">
          <button
            type="button"
            class="inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
          >
            Delete Account
          </button>
        </div>
        <dialog class="z-50 m-0 min-h-full min-w-full overflow-y-auto bg-transparent backdrop:bg-transparent">
          <div class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50" scroll-region="">
            <div class="fixed inset-0 transform transition-all" style="display: none">
              <div class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <div
              class="mb-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto sm:max-w-2xl"
              style="display: none"
            >
              <!---->
            </div>
          </div>
        </dialog>
      </div>
    </div>
  </div>
</template>
