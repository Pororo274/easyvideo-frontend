<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <AppButton
    :disabled="disabled"
    class="bg-red text-white hover:bg-red-dark disabled:hover:bg-red"
  >
    <slot></slot>
  </AppButton>
</template>
