<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="block text-center rounded-md border border-gray py-2 px-6 font-medium text-base text-white hover:border-blue"
  >
    <slot></slot>
  </NuxtLink>
</template>
