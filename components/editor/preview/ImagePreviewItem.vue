<script setup lang="ts">
defineProps<{
  content: string;
}>();
</script>

<template>
  <img class="absolute top-0 left-0" :src="content" alt="" />
</template>
