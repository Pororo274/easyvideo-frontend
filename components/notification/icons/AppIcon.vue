<script setup lang="ts">
defineProps<{
  icon: string;
}>();
</script>

<template>
  <img class="w-4" :src="icon" alt="" />
</template>
