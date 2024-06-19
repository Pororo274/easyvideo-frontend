<script setup lang="ts">
useHead({
  title: "EasyVideo - Admin",
});

definePageMeta({
  middleware: ["auth", "admin"],
});
</script>

<template>
  <div>
    <AccountHeader />
    <section class="w-full min-h-screen overflow-hidden pt-[77px]">
      <AdminNavMenu />
      <div class="mt-4">
        <NuxtPage />
      </div>
    </section>
  </div>
</template>
