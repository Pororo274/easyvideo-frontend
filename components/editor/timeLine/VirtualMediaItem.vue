<script setup lang="ts">
import type { VirtuaImage } from "~/interfaces/editor/virtual-image.interface";
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

const props = defineProps<{
  virtualMedia: VirtualMedia;
}>();

const { timeLineWidth } = useTimeLine();
const virtualMediaWidth = ref(timeLineWidth.value);

const itemHeight = ref(52);

const opacity = ref(1);
const initYPos = ref((props.virtualMedia.layer - 1) * (itemHeight.value + 8));
const xPos = ref(0);
const yPos = ref(initYPos.value);
const zIndex = ref(0);

const dYFromStart = ref(0);

const dYMistake = ref(10);

const lastPointerPos = ref({
  x: 0,
  y: 0,
});

const onPointerMove = (e: PointerEvent) => {
  const dx = e.pageX - lastPointerPos.value.x;
  const dY = e.pageY - lastPointerPos.value.y;

  dYFromStart.value += dY;

  xPos.value += dx;
  yPos.value =
    dYMistake.value > Math.abs(dYFromStart.value)
      ? yPos.value
      : yPos.value + dY;

  lastPointerPos.value = {
    x: e.pageX,
    y: e.pageY,
  };

  const yCenterPos = yPos.value + 26;
};

const onPointerUp = () => {
  opacity.value = 1;
  zIndex.value = 0;
  xPos.value = 0;
  yPos.value = initYPos.value;
  dYFromStart.value = 0;
  document.body.removeEventListener("pointermove", onPointerMove);
};

const onPointerDown = (e: PointerEvent) => {
  opacity.value = 0.7;
  zIndex.value = 10;
  lastPointerPos.value = {
    x: e.pageX,
    y: e.pageY,
  };

  document.body.addEventListener("pointermove", onPointerMove);
  document.body.addEventListener("pointerup", onPointerUp);
};

const virtualMediaStyle = computed(() => ({
  width: `${virtualMediaWidth.value}px`,
  transform: `translate(${xPos.value}px, ${yPos.value}px)`,
  zIndex: zIndex.value,
  opacity: opacity.value,
}));
</script>

<template>
  <div
    @pointerdown="onPointerDown"
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
      <figure v-else-if="(virtualMedia as VirtuaImage).objectURL">
        <img class="h-[40px]" :src="virtualMedia.getContent()" alt="" />
      </figure>
      <h3 class="text-white font-medium text-sm">
        {{ virtualMedia.getName() }}
      </h3>
    </div>
  </div>
</template>
