<script setup lang="ts">
import type { VirtualImage } from "~/interfaces/editor/virtual-image.interface";
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

const props = defineProps<{
  virtualMedia: VirtualMedia;
}>();

const { yPositionsLayers, pxPerSecond } = useTimeLine();
const { getOriginalNameByUuid, getObjectURLByUuid } = useMedias();
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
  const time = deltaX / pxPerSecond.value;
  let newGlobaStartTime = props.virtualMedia.globalStartTime + time;
  let newStartTime = props.virtualMedia.startTime + time;
  let newDuration = virtualMediaWidth.value / pxPerSecond.value;

  if (
    newStartTime >= 0 ||
    !(props.virtualMedia as VirtualVideo).originalDuration
  ) {
    virtualMediaWidth.value -= deltaX;
    updatePosition();
  }

  if ((props.virtualMedia as VirtualVideo).originalDuration) {
    newGlobaStartTime =
      newStartTime < 0 ? props.virtualMedia.globalStartTime : newGlobaStartTime;
    newDuration = newStartTime < 0 ? props.virtualMedia.duration : newDuration;
    newStartTime = newStartTime < 0 ? 0 : newStartTime;
  }

  updateGlobalStartTimeById(props.virtualMedia.uuid, newGlobaStartTime);
  updateStartTimeById(props.virtualMedia.uuid, newStartTime);
  updateDurationById(props.virtualMedia.uuid, newDuration);
};

const onRightMove = ({ deltaX }: { deltaX: number }) => {
  const newDuration = virtualMediaWidth.value / pxPerSecond.value;
  if ((props.virtualMedia as VirtualVideo).originalDuration) {
    const originalDuration = (props.virtualMedia as VirtualVideo)
      .originalDuration;

    virtualMediaWidth.value =
      newDuration < originalDuration || deltaX < 0
        ? deltaX + virtualMediaWidth.value
        : originalDuration * pxPerSecond.value;
  } else {
    virtualMediaWidth.value = deltaX + virtualMediaWidth.value;
  }

  updateDurationById(
    props.virtualMedia.uuid,
    virtualMediaWidth.value / pxPerSecond.value
  );
};

const onMove = ({ xPos }: { xPos: number }) => {
  updateGlobalStartTimeById(props.virtualMedia.uuid, xPos / pxPerSecond.value);
};

const onTeleport = ({ yPos }: { yPos: number }) => {
  const layer = yPositionsLayers.value.findIndex((x) => x === yPos) + 1;
  updateLayerById(props.virtualMedia.uuid, layer);
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
    :class="[isCapture ? 'border-blue' : 'border-transparent']"
    class="absolute py-1.5 rounded-md bg-gray group cursor-move border overflow-hidden"
  >
    <div class="flex gap-3 items-center pl-4">
      <video
        v-if="(virtualMedia as VirtualVideo).originalDuration"
        class="h-[40px] rounded-md object-contain"
        :src="getObjectURLByUuid((virtualMedia as VirtualVideo).mediaUuid)"
      ></video>
      <figure v-else-if="(virtualMedia as VirtualImage).mediaUuid">
        <img
          class="h-[40px] object-contain"
          :src="getObjectURLByUuid((virtualMedia as VirtualImage).mediaUuid)"
          alt=""
        />
      </figure>
      <h3
        class="text-white font-medium text-sm text-nowrap text-ellipsis overflow-hidden select-none"
      >
        {{ getOriginalNameByUuid((virtualMedia as VirtualImage).mediaUuid) }}
      </h3>
    </div>
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
