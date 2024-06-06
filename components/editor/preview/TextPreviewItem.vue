<script setup lang="ts">
import { ContentType } from "~/enums/virtual-media/content-type.enum";
import type { TextFilter } from "~/interfaces/filters/text-filter.interface";

const video = ref<HTMLVideoElement>();

const { isAutoplay } = useTimeLine();
const { currentTime, isShow, virtualMedia, mediaPreviewStyle, proportion } =
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

const textStyle = computed(() => ({
  fontSize: `${(virtualMedia.value.filters.text as TextFilter).fontSize}px`,
}));
</script>

<template>
  <div
    v-if="virtualMedia.contentType === ContentType.Text"
    :style="mediaPreviewStyle"
    class="absolute"
  >
    <p
      style="font-family: Arial, Helvetica, sans-serif"
      :style="textStyle"
      class="text-white text-nowrap font-normal"
    >
      {{ virtualMedia.content }}
    </p>
  </div>
</template>
