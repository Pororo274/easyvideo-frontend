<script setup lang="ts">
const { virtualMedias } = useVirtualMedias();
const { updateTimeLineWidth, timeLineWidth, layerLines } = useTimeLine();

const layerBase = ref<HTMLDivElement | null>();

const layerListStyle = computed(() => ({
  width: `${timeLineWidth.value}px`,
}));

onMounted(() => {
  if (!layerBase.value) return;

  const baseWidth = layerBase.value.clientWidth;
  updateTimeLineWidth(baseWidth);
});
</script>

<template>
  <div class="p-5">
    <div class="relative w-full" ref="layerBase">
      <div :style="layerListStyle" class="absolute grid gap-1">
        <VirtualMediaItem
          v-for="media in virtualMedias"
          :virtual-media="media"
        />
        <LayerLine
          v-for="layerLine in layerLines"
          :key="layerLine.yPos"
          :layer-line="layerLine"
        />
      </div>
    </div>
  </div>
</template>
