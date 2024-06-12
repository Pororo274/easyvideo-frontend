<script setup lang="ts">
const { hideModal } = useAppModal();
</script>

<template>
  <slot :hide="hideModal"></slot>
</template>
