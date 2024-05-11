<script setup lang="ts">
import type { VirtualImage } from "~/interfaces/editor/virtual-image.interface";
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

const props = defineProps<{
  media: VirtualMedia;
}>();

const { pinCurrentTime } = useTimeLine();
const { totalLayers } = useVirtualMedias();

const isShow = computed(() => {
  if (
    props.media.globalStartTime + props.media.duration <
    pinCurrentTime.value
  ) {
    return false;
  }

  if (props.media.globalStartTime > pinCurrentTime.value) {
    return false;
  }

  return true;
});

const { project } = useProject();

const mediaPreviewStyle = computed(() => ({
  zIndex: totalLayers.value - props.media.layer,
  width: `${
    ((props.media as VirtualVideo).originalWidth / project.value.width) * 100
  }%`,
  height: `${
    ((props.media as VirtualVideo).originalHeight / project.value.height) * 100
  }%`,
}));

const currentTime = computed(
  () =>
    pinCurrentTime.value - props.media.globalStartTime + props.media.startTime
);
</script>

<template>
  <VideoPreviewItem
    v-if="(media as VirtualVideo).originalDuration"
    v-show="isShow"
    :content="props.media.getContent()"
    :current-time="currentTime"
    :style="mediaPreviewStyle"
  />
  <ImagePreviewItem
    v-else-if="(media as VirtualImage).objectURL"
    v-show="isShow"
    :content="props.media.getContent()"
    :style="mediaPreviewStyle"
  />
</template>
