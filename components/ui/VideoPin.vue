<script setup lang="ts">
const props = defineProps<{
  workField: HTMLDivElement | null;
  relayWidth: number;
  preview: boolean;
  timeLineDuration: number;
}>();

const emit = defineEmits<{
  move: [xPos: number];
  automove: [globalCurrentTime: number];
}>();

const pinXPos = ref(0);
const intervalId = ref<NodeJS.Timeout | undefined>();
const globalCurrentTime = ref(0);

const preview = computed(() => props.preview);

const autoMove = () => {
  intervalId.value = setInterval(() => {
    globalCurrentTime.value += 0.01;
    pinXPos.value = (globalCurrentTime.value / props.timeLineDuration) * 100;
    pinXPos.value = pinXPos.value > 100 ? 100 : pinXPos.value;
    emit("automove", pinXPos.value);
  }, 10);
};

watch(preview, (newPreview) => {
  if (newPreview) {
    autoMove();
  } else {
    clearInterval(intervalId.value);
  }
});

const pointerDownHandler = (e: PointerEvent) => {
  if (!e.target) return;
  let lastPointerPosX = e.pageX;

  const pointerMoveHandler = (e: PointerEvent) => {
    const dX = e.pageX - lastPointerPosX;
    lastPointerPosX = e.pageX;

    pinXPos.value += (dX / props.relayWidth) * 100;
    globalCurrentTime.value = props.timeLineDuration * (pinXPos.value / 100);
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
