<script setup lang="ts">
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";
import type { OverlayFilter } from "~/interfaces/filters/overlay-filter.interface";
import type { ScaleFilter } from "~/interfaces/filters/scale-filter.interface";
import type { TrimFilter } from "~/interfaces/filters/trim-filter.interface";

const props = defineProps<{
  media: VirtualMedia;
}>();

const { pinCurrentTime } = useTimeLine();
const { totalLayers } = useVirtualMedias();

const isShow = computed(() => {
  const overlayFilter = props.media.filters.OverlayFilter as OverlayFilter;

  if (!overlayFilter) return false;

  if (
    overlayFilter.time.delay + overlayFilter.time.duration <
    pinCurrentTime.value
  ) {
    return false;
  }

  if (overlayFilter.time.delay > pinCurrentTime.value) {
    return false;
  }

  return true;
});

const { project } = useProject();

const getXProcent = (value: number) => (value / project.value.width) * 100;
const getYProcent = (value: number) => (value / project.value.height) * 100;

const mediaPreviewStyle = computed(() => {
  const overlayFilter = props.media.filters.OverlayFilter as OverlayFilter;
  const scaleFilter = props.media.filters.ScaleFilter as ScaleFilter;

  return {
    zIndex: totalLayers.value - props.media.layer,
    width: `${getXProcent(scaleFilter.size.width)}%`,
    height: `${getYProcent(scaleFilter.size.height)}%`,
    top: `${getYProcent(overlayFilter.position.y)}%`,
    left: `${getXProcent(overlayFilter.position.x)}%`,
  };
});

const currentTime = computed(() => {
  const overlayFilter = props.media.filters.OverlayFilter as OverlayFilter;
  const trimFilter = props.media.filters.TrimFilter as TrimFilter;

  return (
    pinCurrentTime.value - overlayFilter.time.delay + trimFilter.time.startFrom
  );
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
    <slot></slot>
  </div>
</template>
