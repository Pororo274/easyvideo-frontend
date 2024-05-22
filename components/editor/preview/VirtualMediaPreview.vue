<script setup lang="ts">
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

const getXProcent = (value: number) => (value / project.value.width) * 100;
const getYProcent = (value: number) => (value / project.value.height) * 100;

const mediaPreviewStyle = computed(() => ({
  zIndex: totalLayers.value - props.media.layer,
  width: `${getXProcent((props.media as VirtualVideo).originalWidth)}%`,
  height: `${getYProcent((props.media as VirtualVideo).originalHeight)}%`,
  top: `${getYProcent((props.media as VirtualVideo).position.y)}%`,
  left: `${getXProcent((props.media as VirtualVideo).position.x)}%`,
}));

const currentTime = computed(
  () =>
    pinCurrentTime.value - props.media.globalStartTime + props.media.startTime
);

const virtualMedia = computed(() => props.media);

provide("virtualMediaPreview", {
  mediaPreviewStyle,
  currentTime,
  isShow,
  virtualMedia,
});
</script>

<template>
  <div v-show="isShow">
    <slot></slot>
  </div>
</template>
