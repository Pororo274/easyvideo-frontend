<script setup lang="ts">
useHead({
  title: "EasyVideo",
});

definePageMeta({
  middleware: ["guest"],
});
</script>

<template>
  <div class="overflow-x-hidden">
    <LandingHeader />
    <LandingHero />
    <LandingAboutUs />
    <LandingPrice />
    <LandingFooter />
  </div>
</template>
