<script setup lang="ts">
const { virtualMedias, addVirtualMedia } = useVirtualMedias();
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
const { selectedVirtualMedia } = useEditorWindows<string>();

const cut = () => {
  if (!selectedVirtualMedia.value) return;

  const { filters, ...other } = selectedVirtualMedia.value;
};
</script>

<template>
  <div class="relative pb-2 overflow-y-hidden">
    <div class="flex flex-col h-full">
      <div class="p-2 border-b border-gray">
        <div class="flex items-center justify-between">
          <figure
            :class="[selectedVirtualMedia ? 'bg-gray' : 'bg-gray-dark']"
            class="rounded-md p-2"
          >
            <div
              :class="[
                selectedVirtualMedia ? 'brightness-100' : 'brightness-[0.3]',
              ]"
            >
              <img
                class="w-4 icon-white -rotate-45"
                src="~/assets/img/icons/editor/actions/cut.svg"
                alt=""
              />
            </div>
          </figure>
        </div>
      </div>
      <div
        ref="layerBase"
        class="relative w-full flex-1 overflow-scroll flex flex-col"
      >
        <div
          :style="pinLayerStyle"
          class="relative h-12 overflow-x-hidden z-20"
        >
          <div
            :style="{ left: `${LAYER_LEFT_MARGIN - timeLineLeft}px` }"
            class="absolute w-full h-full"
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
          class="absolute pt-12 right-0 flex-1 overflow-visible h-full w-full"
        >
          <VirtualMediaItem
            v-for="media in virtualMedias"
            :key="media.uuid"
            :virtual-media="media"
            class="left-4"
          />
        </div>
      </div>
      <div class="relative w-full flex-1" v-if="!virtualMedias.length">
        <p
          class="text-gray-light absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          Монтажная область пуста
        </p>
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
