<script setup lang="ts">
defineProps<{
  pinClass: string;
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
</script>

<template>
  <AppDrag
    @move="onMove"
    :self-drag="false"
    class="hidden absolute w-3 h-full group-hover:flex items-center justify-center top-0 cursor-w-resize"
  >
    <div :class="pinClass" class="w-1 h-5 rounded-full"></div>
  </AppDrag>
</template>
