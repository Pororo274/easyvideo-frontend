<script setup lang="ts">
import type { VirtualImage } from "~/interfaces/editor/virtual-image.interface";
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

const { getObjectURLByUuid } = useMedias();
const { isShow, virtualMedia } = useVirtualMediaPreview();
</script>

<template>
  <div
    v-if="!(virtualMedia as VirtualVideo)?.originalDuration && (virtualMedia as VirtualImage).mediaUuid"
    v-show="isShow"
    class="absolute top-0 left-0"
  >
    <img
      class="w-full h-full"
      :src="getObjectURLByUuid((virtualMedia as VirtualImage).mediaUuid)"
      alt=""
    />
  </div>
</template>
