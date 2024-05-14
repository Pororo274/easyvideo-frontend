<script setup lang="ts">
defineProps<{
  content: string;
}>();
</script>

<template>
  <div class="absolute top-0 left-0">
    <img class="w-full h-full" :src="content" alt="" />
  </div>
</template>
