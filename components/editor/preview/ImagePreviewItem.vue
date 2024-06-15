<script setup lang="ts">
const { getObjectURLByUuid } = useMedias();
const { virtualMedia, mediaPreviewStyle } = useVirtualMediaPreview();
</script>

<template>
  <div :style="mediaPreviewStyle" class="absolute">
    <PreviewDefaultSize>
      <img
        class="w-full h-full"
        :src="getObjectURLByUuid(virtualMedia.content)"
        alt=""
      />
    </PreviewDefaultSize>
  </div>
</template>
