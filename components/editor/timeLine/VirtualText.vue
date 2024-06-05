<script setup lang="ts">
import type { Time } from "~/interfaces/coordinate/time.interface";

const { pxPerSecond } = useTimeLine();
const { setPosition, yPos } = useAppDrag();
const { virtualMedia } = useVirtualMediaItem();

setPosition({
  x: (virtualMedia.value.filters.time as Time).delay * pxPerSecond.value,
  y: yPos.value,
});
</script>

<template>
  <div class="flex gap-3 items-center pl-4">
    <div class="h-[40px]"></div>
    <h3
      class="text-white font-medium text-sm text-nowrap text-ellipsis overflow-hidden select-none"
    >
      {{ virtualMedia.content }}
    </h3>
  </div>
</template>
