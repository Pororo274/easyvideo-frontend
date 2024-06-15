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
    <section class="w-full h-screen pt-[77px]">
      <AdminNavMenu />
      <div class="mt-4">
        <NuxtPage />
      </div>
    </section>
  </div>
</template>
