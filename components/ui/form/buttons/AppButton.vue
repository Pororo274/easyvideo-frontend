<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <button
    :disabled="disabled"
    class="py-1.5 px-3 rounded-md bg-blue text-white font-medium hover:bg-blue-dark disabled:opacity-70 disabled:hover:bg-blue"
  >
    <slot></slot>
  </button>
</template>
