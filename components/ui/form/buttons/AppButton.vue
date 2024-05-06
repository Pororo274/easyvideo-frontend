<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <button
    :disabled="disabled"
    class="py-1.5 px-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-70"
  >
    <slot></slot>
  </button>
</template>
