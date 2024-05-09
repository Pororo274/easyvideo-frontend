<script setup lang="ts">
import type { VirtualImage } from "~/interfaces/editor/virtual-image.interface";
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

const props = defineProps<{
  virtualMedia: VirtualMedia;
}>();

const { timeLineWidth } = useTimeLine();
const virtualMediaWidth = ref(timeLineWidth.value);

const opacity = ref(1);
const itemHeight = ref(52);
const dYIgnore = ref(10);
const dYFromStart = ref(0);
const initYPos = ref((props.virtualMedia.layer - 1) * (itemHeight.value + 8));
const xPos = ref(0);
const yPos = ref(initYPos.value);
const zIndex = ref(0);

const onMove = ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
  dYFromStart.value += deltaY;

  xPos.value += deltaX;
  yPos.value =
    dYIgnore.value > Math.abs(dYFromStart.value)
      ? initYPos.value
      : initYPos.value + dYFromStart.value;
};

const onDown = () => {
  opacity.value = 0.7;
  zIndex.value = 10;
};

const onUp = () => {
  opacity.value = 1;
  zIndex.value = 0;
  xPos.value = yPos.value === initYPos.value ? xPos.value : 0;
  yPos.value = initYPos.value;
  dYFromStart.value = 0;
};

const initDrag = useDrag({
  onMove,
  onDown,
  onUp,
});

const virtualMediaStyle = computed(() => ({
  width: `${virtualMediaWidth.value}px`,
  transform: `translate(${xPos.value}px, ${yPos.value}px)`,
  zIndex: zIndex.value,
  opacity: opacity.value,
}));
</script>

<template>
  <div
    @pointerdown="initDrag"
    :style="virtualMediaStyle"
    class="absolute py-1.5 px-4 rounded-md bg-zinc-900 group cursor-move"
  >
    <VirtualMediaLever class="left-0" pin-class="bg-indigo-800" />
    <VirtualMediaLever class="right-0" pin-class="bg-indigo-800" />
    <div class="flex gap-3 items-center">
      <video
        v-if="(virtualMedia as VirtualVideo).originalDuration"
        class="h-[40px] rounded"
        :src="virtualMedia.getContent()"
      ></video>
      <figure v-else-if="(virtualMedia as VirtualImage).objectURL">
        <img class="h-[40px]" :src="virtualMedia.getContent()" alt="" />
      </figure>
      <h3 class="text-white font-medium text-sm">
        {{ virtualMedia.getName() }}
      </h3>
    </div>
  </div>
</template>
