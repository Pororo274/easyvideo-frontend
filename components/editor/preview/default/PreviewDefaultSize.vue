<script setup lang="ts">
import type { Size } from "~/interfaces/editor/size.interface";

const { virtualMedia } = useVirtualMediaPreview();

const { proportion } = usePreviewWindow();

const mediaPreviewStyle = computed(() => {
  const size = virtualMedia.value.filters.size as Size;

  return {
    width: `${size.width * proportion.value}px`,
    height: `${size.height * proportion.value}px`,
  };
});
</script>
<template>
  <div class="absolute" :style="mediaPreviewStyle">
    <slot></slot>
  </div>
</template>
