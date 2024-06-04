<script setup lang="ts">
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";
import type { OverlayFilter } from "~/interfaces/filters/overlay-filter.interface";

const props = defineProps<{
  pinClass: string;
  virtualMedia: VirtualMedia;
}>();

interface OnMoveEvent {
  deltaX: number;
  updatePosition(): void;
}

const emit = defineEmits<{
  move: [event: OnMoveEvent];
}>();

const { updatePosition } = useAppDrag();

const onMove = ({ deltaX }: { deltaX: number }) => {
  emit("move", {
    deltaX,
    updatePosition() {
      updatePosition(deltaX, 0);
    },
  });
};

const { sync } = useVirtualMediaSynchronizer();

const onUp = () => {
  sync();
};
</script>

<template>
  <AppDrag
    @move="onMove"
    @up="onUp"
    :self-drag="false"
    :class="pinClass"
    class="hidden absolute w-3 h-full group-hover:flex items-center justify-center top-0 cursor-w-resize"
  >
    <div class="bg-gray rounded-full w-0.5 h-4"></div>
  </AppDrag>
</template>
