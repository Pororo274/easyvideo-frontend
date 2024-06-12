<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <AppButton
    :disabled="disabled"
    class="bg-blue text-white hover:bg-blue-dark disabled:hover:bg-blue"
  >
    <slot></slot>
  </AppButton>
</template>
