<script setup lang="ts">
import { ContentType } from "~/enums/virtual-media/content-type.enum";

const { getObjectURLByUuid } = useMedias();
const { isShow, virtualMedia, mediaPreviewStyle } = useVirtualMediaPreview();
</script>

<template>
  <div
    v-if="virtualMedia.contentType === ContentType.Image"
    v-show="isShow"
    :style="mediaPreviewStyle"
    class="absolute top-0 left-0"
  >
    <img
      class="w-full h-full"
      :src="getObjectURLByUuid(virtualMedia.content)"
      alt=""
    />
  </div>
</template>
