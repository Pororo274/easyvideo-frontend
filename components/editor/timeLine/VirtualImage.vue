<script setup lang="ts">
import type { Time } from "~/interfaces/coordinate/time.interface";

const { pxPerSecond } = useTimeLine();
const { setPosition, yPos } = useAppDrag();
const { getObjectURLByUuid, getOriginalNameByUuid } = useMedias();
const {
  virtualMedia
} = useVirtualMediaItem();

setPosition({
  x: (virtualMedia.value.filters.time as Time).delay * pxPerSecond.value,
  y: yPos.value,
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
