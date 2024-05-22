<script setup lang="ts">
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

const video = ref<HTMLVideoElement>();

const { isAutoplay } = useTimeLine();
const { getObjectURLByUuid } = useMedias();
const { currentTime, isShow, virtualMedia, mediaPreviewStyle } =
  useVirtualMediaPreview();

watchEffect(() => {
  if (!video.value) return;

  if (isAutoplay.value && isShow.value) {
    video.value.play();
    return;
  } else {
    video.value.pause();
  }
  video.value.currentTime = currentTime.value;
});
</script>

<template>
  <video
    v-if="(virtualMedia as VirtualVideo).originalDuration"
    :style="mediaPreviewStyle"
    :src="getObjectURLByUuid((virtualMedia as VirtualVideo).mediaUuid)"
    class="absolute"
    ref="video"
  ></video>
</template>
