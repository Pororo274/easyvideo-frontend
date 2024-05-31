<script setup lang="ts">
import { ContentType } from "~/enums/virtual-media/content-type.enum";

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
  <div class="absolute" :style="mediaPreviewStyle">
    <video
      v-if="virtualMedia.contentType === ContentType.Video"
      :src="getObjectURLByUuid(virtualMedia.content)"
      class="absolute w-full h-full object-fill"
      ref="video"
    ></video>
  </div>
</template>
