<script setup lang="ts">
useHead({
  title: "EasyVideo - Account",
});

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div>
    <AccountHeader />
    <section class="w-full h-screen pt-[85px]">
      <div class="grid grid-cols-6">
        <ProjectItem />
      </div>
    </section>
  </div>
</template>
