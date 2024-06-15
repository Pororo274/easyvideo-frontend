<script setup lang="ts">
import { ContentType } from "~/enums/virtual-media/content-type.enum";
import type { Time } from "~/interfaces/coordinate/time.interface";
import type { Position } from "~/interfaces/editor/position.interface";
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";

const props = defineProps<{
  media: VirtualMedia;
}>();

const { pinCurrentTime } = useTimeLine();
const { totalLayers } = useVirtualMedias();

const isShow = computed(() => {
  const time = props.media.filters.time as Time;

  if (time.delay + time.duration < pinCurrentTime.value) {
    return false;
  }

  if (time.delay > pinCurrentTime.value) {
    return false;
  }

  return true;
});

const { project } = useProject();
const { windowHeight, windowWidth } = usePreviewWindow();

const getRelativeX = (value: number) =>
  (value / project.value.width) * windowWidth.value;
const getRelativeY = (value: number) =>
  (value / project.value.height) * windowHeight.value;

const mediaPreviewStyle = computed(() => {
  const position = props.media.filters.position as Position;

  return {
    zIndex: totalLayers.value - props.media.layer,
    top: `${getRelativeY(position.y)}px`,
    left: `${getRelativeX(position.x)}px`,
  };
});

const currentTime = computed(() => {
  const time = props.media.filters.time as Time;

  return pinCurrentTime.value - time.delay + time.startFrom;
});

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
    <slot>
      <VideoPreviewItem v-if="media.contentType === ContentType.Video" />
      <ImagePreviewItem v-if="media.contentType === ContentType.Image" />
      <TextPreviewItem v-if="media.contentType === ContentType.Text" />
    </slot>
  </div>
</template>
