<script setup lang="ts">
const { getObjectURLByUuid } = useMedias();
const { isShow, virtualMedia, mediaPreviewStyle } = useVirtualMediaPreview();
</script>

<template>
  <div v-show="isShow" :style="mediaPreviewStyle" class="absolute top-0 left-0">
    <PreviewDefaultSize>
      <img
        class="w-full h-full"
        :src="getObjectURLByUuid(virtualMedia.content)"
        alt=""
      />
    </PreviewDefaultSize>
  </div>
</template>
