<script setup lang="ts">
import { FilterName } from "~/enums/editor/filter-name.enum";
import { ContentType } from "~/enums/virtual-media/content-type.enum";
import type {
  FilterList,
  VirtualMedia,
} from "~/interfaces/editor/virtual-media.interface";
import type { OverlayFilter } from "~/interfaces/filters/overlay-filter.interface";
import type { TrimFilter } from "~/interfaces/filters/trim-filter.interface";

const props = defineProps<{
  virtualMedia: VirtualMedia;
}>();

const { yPositionsLayers, pxPerSecond } = useTimeLine();
const { getOriginalNameByUuid, getObjectURLByUuid } = useMedias();
const { updateLayerByUuid, mapFilterList } = useVirtualMedias();

const startVirtualMediaWidth = computed(() => {
  if (props.virtualMedia.filters.OverlayFilter) {
    return (
      (props.virtualMedia.filters.OverlayFilter as OverlayFilter).time
        .duration * pxPerSecond.value
    );
  }
  return 0;
});
const virtualMediaWidth = ref(startVirtualMediaWidth.value);

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
  const overlayFilter = props.virtualMedia.filters.OverlayFilter;
  const trimFilter = props.virtualMedia.filters.TrimFilter;

  let newGlobalStartTime = 0;
  let newStartTime = 0;

  if (overlayFilter) {
    newGlobalStartTime = (overlayFilter as OverlayFilter).time.delay + time;
  }

  if (trimFilter) {
    newStartTime = (overlayFilter as TrimFilter).time.startFrom + time;
  }

  let newDuration = virtualMediaWidth.value / pxPerSecond.value;

  if (newStartTime >= 0 || !false) {
    virtualMediaWidth.value -= deltaX;
    updatePosition();
  }

  if (true) {
    newGlobalStartTime =
      newStartTime < 0
        ? (overlayFilter as OverlayFilter).time.delay
        : newGlobalStartTime;
    newDuration =
      newStartTime < 0
        ? (overlayFilter as OverlayFilter).time.delay
        : newDuration;
    newStartTime = newStartTime < 0 ? 0 : newStartTime;
  }

  const { time: oldTime, ...other } = overlayFilter as OverlayFilter;

  mapFilterList(props.virtualMedia.uuid, (filters: FilterList) => {
    (filters.OverlayFilter as OverlayFilter).time = {
      delay: newGlobalStartTime,
      startFrom: newStartTime,
      duration: newDuration,
    };
    (filters.TrimFilter as TrimFilter).time = {
      delay: newGlobalStartTime,
      startFrom: newStartTime,
      duration: newDuration,
    };
    (filters.ATrimFilter as TrimFilter).time = {
      delay: newGlobalStartTime,
      startFrom: newStartTime,
      duration: newDuration,
    };

    return filters;
  });
};

const onRightMove = ({ deltaX }: { deltaX: number }) => {
  const newDuration = virtualMediaWidth.value / pxPerSecond.value;
  if (false) {
    const originalDuration = 0;

    virtualMediaWidth.value =
      newDuration < originalDuration || deltaX < 0
        ? deltaX + virtualMediaWidth.value
        : originalDuration * pxPerSecond.value;
  } else {
    virtualMediaWidth.value = deltaX + virtualMediaWidth.value;
  }

  mapFilterList(props.virtualMedia.uuid, (filters: FilterList) => {
    (filters.OverlayFilter as OverlayFilter).time.duration =
      virtualMediaWidth.value / pxPerSecond.value;
    (filters.TrimFilter as TrimFilter).time.duration =
      virtualMediaWidth.value / pxPerSecond.value;
    (filters.ATrimFilter as TrimFilter).time.duration =
      virtualMediaWidth.value / pxPerSecond.value;

    return filters;
  });
};

const onMove = ({ xPos }: { xPos: number }) => {
  mapFilterList(props.virtualMedia.uuid, (filters: FilterList) => {
    (filters.OverlayFilter as OverlayFilter).time.delay =
      xPos / pxPerSecond.value;
    (filters.TrimFilter as TrimFilter).time.delay = xPos / pxPerSecond.value;
    (filters.ATrimFilter as TrimFilter).time.delay = xPos / pxPerSecond.value;

    return filters;
  });
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
        v-if="virtualMedia.contentType === ContentType.Video"
        class="h-[40px] rounded object-contain"
        :src="getObjectURLByUuid(virtualMedia.content)"
      ></video>
      <figure v-else-if="virtualMedia.contentType === ContentType.Image">
        <img
          class="h-[40px] object-contain"
          :src="getObjectURLByUuid(virtualMedia.content)"
          alt=""
        />
      </figure>
      <h3
        class="text-white font-medium text-sm text-nowrap text-ellipsis overflow-hidden select-none"
      >
        {{ getOriginalNameByUuid(virtualMedia.content) }}
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
