<script setup lang="ts">
import { FilterName } from "~/enums/editor/filter-name.enum";
import type { OverlayFilter } from "~/interfaces/filters/overlay-filter.interface";
import type { ScaleFilter } from "~/interfaces/filters/scale-filter.interface";

const { mediaPreviewStyle, virtualMedia } = useVirtualMediaPreview();
const { getFilterByUuidAndName, updateOrAddFilterByUuid } = useVirtualMedias();

const onMove = ({ xPos, yPos }: { xPos: number; yPos: number }) => {
  const filter = getFilterByUuidAndName<OverlayFilter>(
    virtualMedia.value.uuid,
    FilterName.OverlayFilter
  );

  updateOrAddFilterByUuid<OverlayFilter>(virtualMedia.value.uuid, {
    name: FilterName.OverlayFilter,
    filter: {
      time: filter.time,
      position: {
        x: xPos,
        y: yPos,
      },
    },
  });
};

const initWidth = ref(
  (virtualMedia.value.filters.ScaleFilter as ScaleFilter).size.width
);
const initHeight = ref(
  (virtualMedia.value.filters.ScaleFilter as ScaleFilter).size.height
);

const resizeEl = ref<HTMLDivElement | null>(null);

const onDown = () => {
  initWidth.value = (
    virtualMedia.value.filters.ScaleFilter as ScaleFilter
  ).size.width;
  initHeight.value = (
    virtualMedia.value.filters.ScaleFilter as ScaleFilter
  ).size.height;
  if (!resizeEl.value) return;
  try {
    resizeEl.value.focus();
  } catch (e) {}
};

const { isShifted } = useKeyboard();

const resize = ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
  let newWidth =
    (virtualMedia.value.filters.ScaleFilter as ScaleFilter).size.width + deltaX;
  let newHeight =
    (virtualMedia.value.filters.ScaleFilter as ScaleFilter).size.height +
    deltaY;

  if (isShifted.value) {
    const proportion = initWidth.value / initHeight.value;
    newHeight = newWidth / proportion;
  }

  updateOrAddFilterByUuid<ScaleFilter>(virtualMedia.value.uuid, {
    name: FilterName.ScaleFilter,
    filter: {
      size: {
        width: newWidth,
        height: newHeight,
      },
    },
  });
};

const { sync } = useVirtualMediaSynchronizer();
</script>

<template>
  <div :style="mediaPreviewStyle" class="absolute group">
    <AppDrag
      @move="onMove"
      @up="sync"
      :self-drag="false"
      class="border border-transparent group-hover:border-blue absolute cursor-move w-full h-full"
    />
    <div
      class="absolute w-3 h-3 top-full left-full -translate-x-1/2 -translate-y-1/2"
    >
      <AppDrag
        @down="onDown"
        @move="resize"
        @up="sync"
        ref="resizeEl"
        :self-drag="false"
        class="absolute h-full w-full cursor-nwse-resize group-hover:bg-blue focus:outline-none"
      />
    </div>
  </div>
</template>
