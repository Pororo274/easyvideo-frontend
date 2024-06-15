<script setup lang="ts">
const { isAdmin } = useUser();
</script>

<template>
  <slot v-if="!isAdmin"></slot>
</template>
