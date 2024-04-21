<script setup lang="ts">
interface PointerMoveEvent extends PointerEvent {
  dX: number;
}

const props = defineProps<{
  relay: HTMLDivElement | null;
}>();

const emit = defineEmits<{
  change: [currentTimeLineWidth: number, currentTimeLinePosX: number];
}>();

const currentTimeLineWidth = ref(100);
const timeLinePosX = ref(0);

const rightThumbPointerMoveHandler = ({ dX }: PointerMoveEvent) => {
  if (!props.relay) return;

  currentTimeLineWidth.value -= (dX / props.relay.clientWidth) * 100;
  timeLinePosX.value += (dX / props.relay.clientWidth) * 100;
  emit("change", currentTimeLineWidth.value, timeLinePosX.value);
};

const leftThumbPointerMoveHandler = ({ dX }: PointerMoveEvent) => {
  if (!props.relay) return;

  currentTimeLineWidth.value += (dX / props.relay.clientWidth) * 100;
  emit("change", currentTimeLineWidth.value, timeLinePosX.value);
};

const pointerDownHandler = (
  e: PointerEvent,
  pointerMoveHandler: (event: PointerMoveEvent) => void
) => {
  if (!e.target) return;
  let lastPointerPosX = e.pageX;

  const moveHandler = (e: PointerEvent) => {
    if (!props.relay) return;
    const dX = e.pageX - lastPointerPosX;
    lastPointerPosX = e.pageX;

    pointerMoveHandler({
      ...e,
      dX,
    });
  };

  const pointerUpHandler = () => {
    document.body.removeEventListener("pointermove", moveHandler);
    document.body.removeEventListener("pointerup", pointerUpHandler);
  };

  document.body.addEventListener("pointermove", moveHandler);
  document.body.addEventListener("pointerup", pointerUpHandler);
};
</script>

<template>
  <div
    :style="{
      width: `${currentTimeLineWidth}%`,
      left: `${timeLinePosX}%`,
    }"
    class="absolute overflow-hidden top-0 w-full h-full rounded-xl bg-slate-950 flex justify-between"
  >
    <div
      @pointerdown="(e) => pointerDownHandler(e, rightThumbPointerMoveHandler)"
      class="w-3 h-full bg-yellow-500 cursor-w-resize"
    ></div>
    <div
      @pointerdown="(e) => pointerDownHandler(e, leftThumbPointerMoveHandler)"
      class="w-3 h-full bg-yellow-500 cursor-w-resize"
    ></div>
  </div>
</template>
