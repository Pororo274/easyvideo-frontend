<script setup lang="ts">
import type { Position } from "~/interfaces/editor/position.interface";
// import type { Size } from "~/interfaces/editor/size.interface";
import type { FilterList } from "~/interfaces/editor/virtual-media.interface";
import type { TextFilter } from "~/interfaces/filters/text-filter.interface";

const { mediaPreviewStyle, virtualMedia } = useVirtualMediaPreview();
const { mapFilterList } = useVirtualMedias();
const { sync } = useVirtualMediaSynchronizer();

const onMove = ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
  mapFilterList(virtualMedia.value.uuid, (filters: FilterList) => {
    filters.position = {
      x: (filters.position as Position).x + deltaX,
      y: (filters.position as Position).y + deltaY,
    };

    return filters;
  });
};

const textStyle = computed(() => ({
  fontSize: `${(virtualMedia.value.filters.text as TextFilter).fontSize}px`,
}));

// const initWidth = ref((virtualMedia.value.filters.size as Size).width);
// const initHeight = ref((virtualMedia.value.filters.size as Size).height);

// const resizeEl = ref<HTMLDivElement | null>(null);

// const onDown = () => {
//   initWidth.value = (virtualMedia.value.filters.size as Size).width;
//   initHeight.value = (virtualMedia.value.filters.size as Size).height;
//   if (!resizeEl.value) return;
//   try {
//     resizeEl.value.focus();
//   } catch (e) {}
// };

// const { isShifted } = useKeyboard();

// const resize = ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
//   let newWidth = (virtualMedia.value.filters.size as Size).width + deltaX;
//   let newHeight = (virtualMedia.value.filters.size as Size).height + deltaY;

//   if (isShifted.value) {
//     const proportion = initWidth.value / initHeight.value;
//     newHeight = newWidth / proportion;
//   }

//   mapFilterList(virtualMedia.value.uuid, (filters: FilterList) => {
//     filters.size = {
//       width: newWidth,
//       height: newHeight,
//     };
//     return filters;
//   });
// };
</script>

<template>
  <AppDrag
    @move="onMove"
    @up="sync"
    :self-drag="false"
    :style="mediaPreviewStyle"
    class="border border-transparent hover:border-blue absolute cursor-move"
  >
    <p
      style="font-family: Arial, Helvetica, sans-serif"
      :style="textStyle"
      class="opacity-0 pointer-events-none text-nowrap"
    >
      {{ virtualMedia.content }}
    </p>
  </AppDrag>

  <!-- <div
      class="absolute w-3 h-3 top-full left-full -translate-x-1/2 -translate-y-1/2"
    >
      <AppDrag
        @down="onDown"
        @move="resize"
        @up="sync"
        ref="resizeEl"
        :self-drag="false"
        class="absolute h-full w-full cursor-nwse-resize group-hover:bg-blue focus:outline-none"
      />
    </div> -->
</template>
