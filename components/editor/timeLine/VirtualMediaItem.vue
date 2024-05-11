<script setup lang="ts">
import type { VirtualImage } from "~/interfaces/editor/virtual-image.interface";
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

const props = defineProps<{
  virtualMedia: VirtualMedia;
}>();

const { yPositionsLayers, pxPerSecond } = useTimeLine();
const {
  updateDurationById,
  updateGlobalStartTimeById,
  updateStartTimeById,
  updateLayerById,
} = useVirtualMedias();
const virtualMediaWidth = ref(props.virtualMedia.duration * pxPerSecond.value);

const opacity = ref(1);
const itemHeight = ref(52);
const initXPos = ref(0);
const initYPos = ref((props.virtualMedia.layer - 1) * (itemHeight.value + 8));
const zIndex = ref(0);
const isCapture = ref(false);

const onDown = () => {
  opacity.value = 0.7;
  zIndex.value = 10;
  isCapture.value = true;
};

const onUp = () => {
  opacity.value = 1;
  zIndex.value = 0;
  isCapture.value = false;
};

const onLeftMove = ({
  deltaX,
  updatePosition,
}: {
  deltaX: number;
  updatePosition(): void;
}) => {
  virtualMediaWidth.value -= deltaX;
  updatePosition();
  const time = deltaX / pxPerSecond.value;

  updateGlobalStartTimeById(
    props.virtualMedia.id,
    props.virtualMedia.globalStartTime + time
  );
  updateStartTimeById(
    props.virtualMedia.id,
    props.virtualMedia.startTime + time
  );
  updateDurationById(
    props.virtualMedia.id,
    virtualMediaWidth.value / pxPerSecond.value
  );
};

const onRightMove = ({ deltaX }: { deltaX: number }) => {
  virtualMediaWidth.value += deltaX;

  updateDurationById(
    props.virtualMedia.id,
    virtualMediaWidth.value / pxPerSecond.value
  );
};

const onMove = ({ xPos }: { xPos: number }) => {
  updateGlobalStartTimeById(props.virtualMedia.id, xPos / pxPerSecond.value);
};

const onTeleport = ({ yPos }: { yPos: number }) => {
  const layer = yPositionsLayers.value.findIndex((x) => x === yPos) + 1;
  updateLayerById(props.virtualMedia.id, layer);
};

const virtualMediaStyle = computed(() => ({
  width: `${virtualMediaWidth.value}px`,
  zIndex: zIndex.value,
  opacity: opacity.value,
}));
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
    :class="[isCapture ? 'border-indigo-600' : 'border-transparent']"
    class="absolute py-1.5 rounded-md bg-zinc-800 group cursor-move border"
  >
    <div class="flex gap-3 items-center pl-4 overflow-hidden">
      <video
        v-if="(virtualMedia as VirtualVideo).originalDuration"
        class="h-[40px] rounded-md object-contain"
        :src="virtualMedia.getContent()"
      ></video>
      <figure v-else-if="(virtualMedia as VirtualImage).objectURL">
        <img
          class="h-[40px] object-contain"
          :src="virtualMedia.getContent()"
          alt=""
        />
      </figure>
      <h3
        class="text-white font-medium text-sm text-nowrap text-ellipsis overflow-hidden select-none"
      >
        {{ virtualMedia.getName() }}
      </h3>
    </div>
    <VirtualMediaLever
      @move="onLeftMove"
      class="left-0"
      pin-class="bg-indigo-600"
    />
    <VirtualMediaLever
      @move="onRightMove"
      class="right-0"
      pin-class="bg-indigo-600"
    />
  </AppDrag>
</template>
