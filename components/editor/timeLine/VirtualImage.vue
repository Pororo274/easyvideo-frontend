<script setup lang="ts">
import type { FilterList } from "~/interfaces/editor/virtual-media.interface";
import type { OverlayFilter } from "~/interfaces/filters/overlay-filter.interface";
import type { TrimFilter } from "~/interfaces/filters/trim-filter.interface";

const { pxPerSecond } = useTimeLine();
const { mapFilterList } = useVirtualMedias();
const { setPosition, yPos } = useAppDrag();
const { getObjectURLByUuid, getOriginalNameByUuid } = useMedias();
const {
  virtualMedia,
  setVirtualMediaWidth,
  setXMargin,
  setXPos,
  duration,
  startTime,
  globalStartTime,
} = useVirtualMediaItem();

setVirtualMediaWidth(
  (virtualMedia.value.filters.OverlayFilter as OverlayFilter).time.duration *
    pxPerSecond.value
);

setXMargin(
  (virtualMedia.value.filters.OverlayFilter as OverlayFilter).time.startFrom *
    pxPerSecond.value
);
setXPos(
  (virtualMedia.value.filters.OverlayFilter as OverlayFilter).time.delay *
    pxPerSecond.value
);

setPosition({
  x:
    (virtualMedia.value.filters.OverlayFilter as OverlayFilter).time.delay *
    pxPerSecond.value,
  y: yPos.value,
});

const uuid = virtualMedia.value.uuid;

watchEffect(() => {
  mapFilterList(uuid, (filters: FilterList) => {
    const time = {
      duration: duration.value,
      startFrom: 0,
      delay: globalStartTime.value,
    };
    (filters.OverlayFilter as OverlayFilter).time = time;
    return filters;
  });
});
</script>

<template>
  <div class="flex gap-3 items-center pl-4">
    <img
      class="h-[40px] rounded object-contain"
      :src="getObjectURLByUuid(virtualMedia.content)"
    ></img>
    <h3
      class="text-white font-medium text-sm text-nowrap text-ellipsis overflow-hidden select-none"
    >
      {{ getOriginalNameByUuid(virtualMedia.content) }}
    </h3>
  </div>
</template>
