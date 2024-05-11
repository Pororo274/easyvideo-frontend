<script setup lang="ts">
defineProps<{
  content: string;
}>();
</script>

<template>
  <div class="abolute top-9 left-0">
    <img class="w-full h-full" :src="content" alt="" />
  </div>
</template>
