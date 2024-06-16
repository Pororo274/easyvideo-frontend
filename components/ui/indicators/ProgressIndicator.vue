<script setup lang="ts">
defineProps<{
  total: number;
  current: number;
}>();
</script>

<template>
  <div class="rounded-md w-full border border-gray overflow-hidden mt-3">
    <div
      :style="{
        width: `${(current / total) * 100}%`,
      }"
      class="h-6 bg-blue"
    ></div>
  </div>
</template>
