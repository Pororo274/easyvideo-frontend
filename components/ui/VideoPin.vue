<script setup lang="ts">
const props = defineProps<{
  workField: HTMLDivElement | null;
  relayWidth: number;
  preview: boolean;
  timeLineDuration: number;
}>();

const emit = defineEmits<{
  move: [xPos: number];
  automove: [xPos: number];
}>();

const pinXPos = ref(0);
const timeoutId = ref<NodeJS.Timeout | undefined>();

const preview = computed(() => props.preview);

const movePin = () => {
  emit("automove", pinXPos.value);
  const dX = 100 / (props.timeLineDuration * 100);
  timeoutId.value = setTimeout(() => {
    pinXPos.value += dX;
    movePin();
  }, 10);
};

watch(preview, (newPreview) => {
  if (newPreview) {
    movePin();
  } else {
    clearTimeout(timeoutId.value);
  }
});

const pointerDownHandler = (e: PointerEvent) => {
  if (!e.target) return;
  let lastPointerPosX = e.pageX;

  const pointerMoveHandler = (e: PointerEvent) => {
    const dX = e.pageX - lastPointerPosX;
    lastPointerPosX = e.pageX;

    pinXPos.value += (dX / props.relayWidth) * 100;
    emit("move", pinXPos.value);
  };

  const pointerUpHandler = () => {
    document.body.removeEventListener("pointermove", pointerMoveHandler);
    document.body.removeEventListener("pointerup", pointerUpHandler);
  };

  document.body.addEventListener("pointermove", pointerMoveHandler);
  document.body.addEventListener("pointerup", pointerUpHandler);
};
</script>

<template>
  <div class="relative w-full">
    <div
      :style="{
        left: `${pinXPos}%`,
      }"
      class="absolute -top-[12px] -translate-x-1/2"
      @pointerdown="pointerDownHandler"
    >
      <div class="w-3 h-3 bg-red-600"></div>
      <div
        class="w-px h-72 bg-red-600 absolute top-3 left-1/2 -translate-x-1/2"
      ></div>
    </div>
  </div>
</template>
