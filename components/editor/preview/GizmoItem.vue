<script setup lang="ts">
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

const { mediaPreviewStyle, virtualMedia } = useVirtualMediaPreview();
const { updatePositionByUuid, updateSizeByUuid } = useVirtualMedias();

const onMove = ({ xPos, yPos }: { xPos: number; yPos: number }) => {
  updatePositionByUuid(virtualMedia.value.uuid, {
    x: xPos,
    y: yPos,
  });
};

const initWidth = ref((virtualMedia.value as VirtualVideo).size.width);
const initHeight = ref((virtualMedia.value as VirtualVideo).size.height);

const resizeEl = ref<HTMLDivElement | null>(null);

const onDown = () => {
  initWidth.value = (virtualMedia.value as VirtualVideo).size.width;
  initHeight.value = (virtualMedia.value as VirtualVideo).size.height;
  if (!resizeEl.value) return;
  try {
    resizeEl.value.focus();
  } catch (e) {}
};

const { isShifted } = useKeyboard();

const resize = ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
  let newWidth = (virtualMedia.value as VirtualVideo).size.width + deltaX;
  let newHeight = (virtualMedia.value as VirtualVideo).size.height + deltaY;

  if (isShifted.value) {
    const proportion = initWidth.value / initHeight.value;
    newHeight = newWidth / proportion;
  }

  updateSizeByUuid(virtualMedia.value.uuid, {
    width: newWidth,
    height: newHeight,
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
