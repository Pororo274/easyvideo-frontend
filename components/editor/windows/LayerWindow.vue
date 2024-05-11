<script setup lang="ts">
const { virtualMedias } = useVirtualMedias();
const { updateTimeLineWidth, timeLineWidth } = useTimeLine();
const { LAYER_LEFT_MARGIN } = useConstants();

const layerBase = ref<HTMLDivElement | null>();

const layerListStyle = computed(() => ({
  width: `${timeLineWidth.value}px`,
}));

onMounted(() => {
  if (!layerBase.value) return;

  const baseWidth = layerBase.value.clientWidth;
  updateTimeLineWidth(baseWidth - LAYER_LEFT_MARGIN);
});
</script>

<template>
  <div class="relative pt-2 pb-2">
    <div class="relative w-full h-full overflow-scroll" ref="layerBase">
      <div :style="layerListStyle" class="absolute h-full left-4 pt-12">
        <LayerPin v-if="virtualMedias.length" />
        <VirtualMediaItem
          v-for="media in virtualMedias"
          :key="media.id"
          :virtual-media="media"
        />
      </div>
    </div>
  </div>
</template>
