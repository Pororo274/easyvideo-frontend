<script setup lang="ts">
import { ContentType } from "~/enums/virtual-media/content-type.enum";
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";

const props = defineProps<{
  virtualMedia: VirtualMedia;
}>();

const { yPositionsLayers, pxPerSecond } = useTimeLine();
const { updateLayerByUuid } = useVirtualMedias();

const virtualMediaWidth = ref(0);

const opacity = ref(1);
const itemHeight = ref(52);
const initXPos = ref(0);
const initYPos = ref((props.virtualMedia.layer - 1) * (itemHeight.value + 8));
const zIndex = ref(0);
const xPos = ref(initXPos.value);
const isCapture = ref(false);

const xMargin = ref(0);

const duration = computed(() => virtualMediaWidth.value / pxPerSecond.value);
const globalStartTime = computed(() => xPos.value / pxPerSecond.value);
const startTime = computed(() => xMargin.value / pxPerSecond.value);

const setVirtualMediaWidth = (newWidth: number) => {
  virtualMediaWidth.value = newWidth;
};

const setXPos = (newXPos: number) => {
  xPos.value = newXPos;
};

const setXMargin = (newXMargin: number) => {
  xMargin.value = newXMargin;
};

const onDown = () => {
  opacity.value = 0.7;
  zIndex.value = 10;
  isCapture.value = true;
};

const { sync } = useVirtualMediaSynchronizer();

const onUp = () => {
  opacity.value = 1;
  zIndex.value = 0;
  isCapture.value = false;
  sync();
};

const onLeftMove = ({
  deltaX,
  updatePosition,
}: {
  deltaX: number;
  updatePosition(): void;
}) => {
  xMargin.value += deltaX;

  virtualMediaWidth.value -= deltaX;
  updatePosition();
};

const onRightMove = ({ deltaX }: { deltaX: number }) => {
  virtualMediaWidth.value = deltaX + virtualMediaWidth.value;
};

const onMove = ({ xPos: newXPos }: { xPos: number }) => {
  xPos.value = newXPos;
};

const onTeleport = ({ yPos }: { yPos: number }) => {
  const layer = yPositionsLayers.value.findIndex((x) => x === yPos) + 1;

  updateLayerByUuid(props.virtualMedia.uuid, layer);
};

const virtualMediaStyle = computed(() => ({
  width: `${virtualMediaWidth.value}px`,
  zIndex: zIndex.value,
  opacity: opacity.value,
}));

const virtualMedia = computed(() => props.virtualMedia);

provide("virtualMediaItem", {
  duration,
  startTime,
  globalStartTime,
  setVirtualMediaWidth,
  setXMargin,
  setXPos,
  virtualMedia: readonly(virtualMedia),
});
</script>

<template>
  <AppDrag
    @down="onDown"
    @up="onUp"
    @move="onMove"
    @teleport="onTeleport"
    :init-x-pos="initXPos"
    :style="virtualMediaStyle"
    :init-y-pos="initYPos"
    :delta-y-ignore="15"
    :y-teleports="yPositionsLayers"
    :min-x="0"
    :class="[isCapture ? 'border-blue' : 'border-transparent']"
    class="absolute py-1.5 rounded-md bg-gray group cursor-move border overflow-hidden"
  >
    <VirtualVideo v-if="virtualMedia.contentType === ContentType.Video" />
    <VirtualMediaLever
      @move="onLeftMove"
      class="left-0"
      :virtual-media="virtualMedia"
      pin-class="bg-blue"
    />
    <VirtualMediaLever
      @move="onRightMove"
      class="right-0"
      :virtual-media="virtualMedia"
      pin-class="bg-blue"
    />
  </AppDrag>
</template>
