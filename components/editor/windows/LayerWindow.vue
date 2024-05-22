<script setup lang="ts">
const { virtualMedias } = useVirtualMedias();
const {
  updateTimeLineWidth,
  timeLineWidth,
  pxPerSecond,
  setStartTimeLineWidth,
} = useTimeLine();
const { LAYER_LEFT_MARGIN } = useConstants();

const layerBase = ref<HTMLDivElement | null>();

const layerListStyle = computed(() => ({
  width: `${timeLineWidth.value}px`,
}));

const pinLayerStyle = computed(() => ({
  width: `${timeLineWidth.value + LAYER_LEFT_MARGIN}px`,
}));

const timeLinePinStyle = computed(() => ({
  left: `${LAYER_LEFT_MARGIN / 2}px`,
}));

const totalTime = computed(() =>
  pxPerSecond.value ? Math.floor(timeLineWidth.value / pxPerSecond.value) : 0
);

onMounted(() => {
  if (!layerBase.value) return;

  const baseWidth = layerBase.value.clientWidth;
  setStartTimeLineWidth(baseWidth - LAYER_LEFT_MARGIN);
});
</script>

<template>
  <div class="relative pt-2 pb-2">
    <div class="relative w-full h-full overflow-scroll" ref="layerBase">
      <div :style="pinLayerStyle" class="absolute h-full overflow-x-hidden">
        <div
          :style="{ left: `${LAYER_LEFT_MARGIN}px` }"
          class="absolute w-full"
        >
          <TimestampPin
            v-for="order in Math.floor(totalTime)"
            :key="order"
            :order="order"
          />
        </div>
        <TimeLinePin :style="timeLinePinStyle" v-if="virtualMedias.length" />
      </div>
      <div :style="layerListStyle" class="absolute left-4 pt-12 overflow-none">
        <VirtualMediaItem
          v-for="media in virtualMedias"
          :key="media.uuid"
          :virtual-media="media"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 12px;
  background: transparent;
  margin-top: 0;
  margin-bottom: 0;
  box-shadow: none;
}

::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  background: #37373f;
  border-radius: 12px;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background: #37373f;
  border-width: 1px;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
