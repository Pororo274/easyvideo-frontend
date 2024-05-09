<script setup lang="ts">
const props = defineProps<{
  layerLine: { yPos: number; isActive: boolean };
}>();

const layerLineStyle = computed(() => {
  return {
    transform: `translate(${0}px, ${props.layerLine.yPos}px)`,
    display: props.layerLine.isActive ? "block" : "none",
  };
});
</script>

<template>
  <div :style="layerLineStyle" class="absolute w-full h-px bg-yellow-500"></div>
</template>
