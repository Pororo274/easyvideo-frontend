<script setup lang="ts">
const { mediaPreviewStyle } = useVirtualMediaPreview();
</script>

<template>
  <AppDrag
    :style="mediaPreviewStyle"
    class="border border-blue absolute top-0 left-0"
  />
</template>
