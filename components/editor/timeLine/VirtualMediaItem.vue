<script setup lang="ts">
import { Key } from "~/enums/keyboard/key.enum";
import { ContentType } from "~/enums/virtual-media/content-type.enum";
import type { Time } from "~/interfaces/coordinate/time.interface";
import type {
  FilterList,
  VirtualMedia,
} from "~/interfaces/editor/virtual-media.interface";

const props = defineProps<{
  virtualMedia: VirtualMedia;
}>();

const { yPositionsLayers, pxPerSecond } = useTimeLine();
const { updateLayerByUuid, mapFilterList, deleteByUuid } = useVirtualMedias();
const { addOnDownListener } = useKeyboard();
const { currentWindow, currentData } = useEditorWindows<string>();
const { sync } = useVirtualMediaSynchronizer();

const virtualMediaWidth = ref(0);

const opacity = ref(1);
const itemHeight = ref(52);
const initXPos = ref(0);
const initYPos = ref((props.virtualMedia.layer - 1) * (itemHeight.value + 8));
const zIndex = ref(0);
const xPos = ref(initXPos.value);
const isCapture = ref(false);

const isSelected = computed(
  () => currentData.value === props.virtualMedia.uuid
);

addOnDownListener({
  key: Key.Delete,
  handler: () => {
    if (isSelected.value) {
      currentWindow.value = "mediaWindow";
      deleteByUuid(props.virtualMedia.uuid);
      sync();
    }
  },
});

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
  currentData.value = props.virtualMedia.uuid;
  currentWindow.value = `${props.virtualMedia.contentType}Window`;
};

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
  let newXMargin = xMargin.value + deltaX;
  let newWidth = virtualMediaWidth.value - deltaX;

  if (virtualMedia.value.filters.initDuration) {
    const initDuration = virtualMedia.value.filters.initDuration as number;

    if (newXMargin < 0 || newWidth / pxPerSecond.value > initDuration) {
      return;
    }
  }

  updatePosition();
  xMargin.value = newXMargin;
  virtualMediaWidth.value = newWidth;
  mapFilterList(props.virtualMedia.uuid, (filters: FilterList) => {
    const time = {
      duration: duration.value,
      startFrom: startTime.value,
      delay: globalStartTime.value,
    };
    filters.time = time;
    return filters;
  });
};

const onRightMove = ({ deltaX }: { deltaX: number }) => {
  let newWidth = deltaX + virtualMediaWidth.value;

  if (virtualMedia.value.filters.initDuration) {
    if (
      newWidth / pxPerSecond.value >
      (virtualMedia.value.filters.initDuration as number)
    ) {
      newWidth =
        pxPerSecond.value * (virtualMedia.value.filters.initDuration as number);
    }
  }

  virtualMediaWidth.value = newWidth;
  mapFilterList(props.virtualMedia.uuid, (filters: FilterList) => {
    const time = {
      duration: duration.value,
      startFrom: startTime.value,
      delay: globalStartTime.value,
    };
    filters.time = time;
    return filters;
  });
};

const onMove = ({ xPos: newXPos }: { xPos: number }) => {
  xPos.value = newXPos;
  mapFilterList(props.virtualMedia.uuid, (filters: FilterList) => {
    const time = {
      duration: duration.value,
      startFrom: startTime.value,
      delay: globalStartTime.value,
    };
    filters.time = time;
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

setVirtualMediaWidth(
  (props.virtualMedia.filters.time as Time).duration * pxPerSecond.value
);

setXMargin(
  (props.virtualMedia.filters.time as Time).startFrom * pxPerSecond.value
);
setXPos((props.virtualMedia.filters.time as Time).delay * pxPerSecond.value);

const virtualMedia = computed(() => props.virtualMedia);

provide("virtualMediaItem", {
  duration,
  startTime,
  globalStartTime,
  setVirtualMediaWidth,
  setXMargin,
  setXPos,
  xPos: readonly(xPos),
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
    :class="isSelected ? 'border-blue' : 'border-transparent'"
    class="absolute py-1.5 rounded-md bg-gray group border overflow-hidden"
  >
    <VirtualVideo v-if="virtualMedia.contentType === ContentType.Video" />
    <VirtualImage v-if="virtualMedia.contentType === ContentType.Image" />
    <VirtualText v-if="virtualMedia.contentType === ContentType.Text" />
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
