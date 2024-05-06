<script setup lang="ts">
useHead({
  title: "EasyVideo - Account",
});
</script>

<template>
  <div>
    <header class="p-4 border-b border-b-zinc-800 fixed w-full top-0 left-0">
      <div class="flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div
            class="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center"
          >
            <p class="text-white font-medium text-xs">U</p>
          </div>
          <h2 class="text-white text-base">Username</h2>
        </div>
        <AppButton>
          <div class="flex gap-3 items-center">
            <p>Создать проект</p>
          </div>
        </AppButton>
      </div>
    </header>
    <section class="w-full h-screen p-4">
      <div class="grid grid-cols-5"></div>
    </section>
  </div>
</template>
