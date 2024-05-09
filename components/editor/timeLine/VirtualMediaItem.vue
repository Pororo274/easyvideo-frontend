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
const initYPos = ref((props.virtualMedia.layer - 1) * (itemHeight.value + 8));
const zIndex = ref(0);

const onDown = () => {
  opacity.value = 0.7;
  zIndex.value = 10;
};

const onUp = () => {
  opacity.value = 1;
  zIndex.value = 0;
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
};

const onRightMove = ({ deltaX }: { deltaX: number }) => {
  virtualMediaWidth.value += deltaX;
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
    :style="virtualMediaStyle"
    :init-y-pos="initYPos"
    :delta-y-ignore="15"
    class="absolute py-1.5 rounded-md bg-zinc-900 group cursor-move"
  >
    <div class="flex gap-3 items-center pl-4 overflow-hidden">
      <video
        v-if="(virtualMedia as VirtualVideo).originalDuration"
        class="h-[40px] rounded"
        :src="virtualMedia.getContent()"
      ></video>
      <figure v-else-if="(virtualMedia as VirtualImage).objectURL">
        <img class="h-[40px]" :src="virtualMedia.getContent()" alt="" />
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
      pin-class="bg-indigo-800"
    />
    <VirtualMediaLever
      @move="onRightMove"
      class="right-0"
      pin-class="bg-indigo-800"
    />
  </AppDrag>
</template>
