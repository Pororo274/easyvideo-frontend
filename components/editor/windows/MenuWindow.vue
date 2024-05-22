<script setup lang="ts">
const mediaWindow = resolveComponent("MediaWindow");
</script>

<template>
  <div>
    <component :is="mediaWindow" />
  </div>
</template>
