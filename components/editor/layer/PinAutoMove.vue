<script setup lang="ts">
const { updatePosition, xPos } = useAppDrag();
const { isAutoplay, setPinXPos, pxPerSecond } = useTimeLine();

const intervalId = ref<NodeJS.Timeout>();

watchEffect(() => {
  if (!isAutoplay.value) {
    clearInterval(intervalId.value);
    return;
  }
  intervalId.value = setInterval(() => {
    updatePosition(pxPerSecond.value / 50, 0);
  }, 20);
});

watchEffect(() => {
  setPinXPos(xPos.value);
});
</script>

<template></template>
