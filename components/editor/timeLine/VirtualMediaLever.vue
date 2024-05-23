<script setup lang="ts">
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";

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

const { updatePosition, setPosition, yPos } = useAppDrag();
const { pxPerSecond } = useTimeLine();

const onMove = ({ deltaX }: { deltaX: number }) => {
  emit("move", {
    deltaX,
    updatePosition() {
      updatePosition(deltaX, 0);
    },
  });
};

onMounted(() => {
  setPosition({
    x: props.virtualMedia.globalStartTime * pxPerSecond.value,
    y: yPos.value,
  });
});

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
    class="hidden absolute w-3 h-full group-hover:block items-center justify-center top-0 cursor-w-resize"
  >
  </AppDrag>
</template>
