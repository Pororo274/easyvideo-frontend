<script setup lang="ts">
defineProps<{
  pinClass: string;
}>();
</script>

<template>
  <div
    class="hidden absolute w-3 h-full group-hover:flex items-center justify-center top-0 cursor-w-resize"
  >
    <div :class="pinClass" class="w-1 h-5 rounded-full"></div>
  </div>
</template>
