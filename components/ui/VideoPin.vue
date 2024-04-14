<script setup lang="ts">
const props = defineProps<{
  workField: HTMLDivElement | null;
  relayWidth: number;
}>();

const emit = defineEmits<{
  move: [xPox: number];
}>();

const pinXPos = ref(0);
const currentPointerXPos = ref(0);

const pointerDownHandler = (e: PointerEvent) => {
  currentPointerXPos.value = e.pageX;
  if (!props.workField) return;

  props.workField.addEventListener("pointermove", pointerMoveHandler);
  props.workField.addEventListener("pointerup", pointerUpHandler);
};

const pointerUpHandler = () => {
  if (!props.workField) return;
  props.workField.removeEventListener("pointermove", pointerMoveHandler);
};

const pointerMoveHandler = (e: PointerEvent) => {
  const newXPos = pinXPos.value + (e.pageX - currentPointerXPos.value);
  currentPointerXPos.value = e.pageX;

  if (newXPos >= props.relayWidth) {
    pinXPos.value = props.relayWidth;
    return;
  }

  if (newXPos <= 0) {
    pinXPos.value = 0;
    return;
  }

  pinXPos.value = newXPos;

  emit("move", pinXPos.value);
};
</script>

<template>
  <div class="relative w-full">
    <div
      :style="{
        left: `${pinXPos}px`,
      }"
      ref="pin"
      class="absolute"
      @pointerdown="pointerDownHandler"
    >
      <div class="w-3 h-3 bg-red-600 -translate-x-1/2"></div>
      <div class="w-px h-72 bg-red-600"></div>
    </div>
  </div>
</template>
