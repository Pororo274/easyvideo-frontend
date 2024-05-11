<script setup lang="ts">
const { LAYER_LEFT_MARGIN } = useConstants();
const { setPinCurrentTime } = useTimeLine();

const layerPinStyle = computed(() => ({
  left: `${-LAYER_LEFT_MARGIN / 2}px`,
}));

const onMove = ({ xPos }: { xPos: number }) => {
  setPinCurrentTime(xPos);
};
</script>

<template>
  <AppDrag
    @move="onMove"
    :style="layerPinStyle"
    axis="x"
    class="absolute z-20 top-0 overflow-y-hidden h-full"
  >
    <figure class="relative z-10">
      <img class="w-4" src="~/assets/img/icons/editor/pin.svg" alt="" />
    </figure>
    <div
      class="h-full rounded-full w-[2px] bg-[#fff] absolute left-1/2 -translate-x-1/2 top-0"
    ></div>
  </AppDrag>
</template>
