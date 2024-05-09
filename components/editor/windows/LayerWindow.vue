<script setup lang="ts">
const { getVirtualMediasByLayer, totalLayers } = useVirtualMedias();
const { updateTimeLineWidth, timeLineWidth } = useTimeLine();

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
        <div v-for="layer in totalLayers" class="relavive">
          <VirtualMediaItem
            v-for="media in getVirtualMediasByLayer(layer)"
            :virtual-media="media"
          />
        </div>
      </div>
    </div>
  </div>
</template>
