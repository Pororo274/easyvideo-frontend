<script setup lang="ts">
const video = ref<HTMLVideoElement>();

const { isAutoplay } = useTimeLine();
const { getObjectURLByUuid } = useMedias();
const { currentTime, isShow, virtualMedia, mediaPreviewStyle, filterStyle } =
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
    <PreviewDefaultSize>
      <video
        :src="getObjectURLByUuid(virtualMedia.content)"
        :style="filterStyle"
        class="absolute w-full h-full object-fill"
        ref="video"
      ></video>
    </PreviewDefaultSize>
  </div>
</template>
