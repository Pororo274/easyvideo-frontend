<script setup lang="ts">
import { ContentType } from "~/enums/virtual-media/content-type.enum";
import VirtualVideo from "../timeLine/VirtualVideo.vue";

const { virtualMedias } = useVirtualMedias();
const { timeLineWidth, pxPerSecond, setStartTimeLineWidth } = useTimeLine();
const { LAYER_LEFT_MARGIN } = useConstants();

const layerBase = ref<HTMLDivElement | null>();

const pinLayerStyle = computed(() => ({
  width: `${timeLineWidth.value + LAYER_LEFT_MARGIN}px`,
}));

const timeLineLeft = ref(0);
const onTimelineScroll = (e: Event) => {
  if (!e.currentTarget) return;
  timeLineLeft.value = (e.currentTarget as HTMLDivElement).scrollLeft;
};
const timeLinePinStyle = computed(() => ({
  left: `${LAYER_LEFT_MARGIN / 2 - timeLineLeft.value}px`,
}));

const totalTime = computed(() =>
  pxPerSecond.value ? Math.floor(timeLineWidth.value / pxPerSecond.value) : 0
);

onMounted(() => {
  if (!layerBase.value) return;

  const baseWidth = layerBase.value.clientWidth;
  setStartTimeLineWidth(baseWidth - LAYER_LEFT_MARGIN - 10);
});
</script>

<template>
  <div class="relative pt-2 pb-2">
    <div
      class="relative w-full h-full overflow-hidden flex flex-col"
      ref="layerBase"
    >
      <div :style="pinLayerStyle" class="relative h-12 overflow-x-hidden z-20">
        <div
          :style="{ left: `${LAYER_LEFT_MARGIN - timeLineLeft}px` }"
          class="absolute w-full bg-black h-12"
        >
          <TimestampPin
            v-for="order in Math.floor(totalTime)"
            :key="order"
            :order="order"
          />
        </div>
      </div>
      <div :style="pinLayerStyle" class="absolute h-full">
        <TimeLinePin :style="timeLinePinStyle" v-if="virtualMedias.length" />
      </div>
      <div
        @scroll="onTimelineScroll"
        class="relative right-0 flex-1 overflow-scroll h-full w-full"
      >
        <VirtualMediaItem
          v-for="media in virtualMedias"
          :key="media.uuid"
          :virtual-media="media"
          class="left-4"
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
