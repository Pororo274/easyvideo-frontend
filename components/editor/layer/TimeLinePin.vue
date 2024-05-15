<script setup lang="ts">
const { stopAutoPlay } = useTimeLine();

const onDown = () => {
  stopAutoPlay();
};
</script>

<template>
  <AppDrag
    @down="onDown"
    :min-x="0"
    axis="x"
    class="absolute z-20 top-0 overflow-y-hidden h-full"
  >
    <PinAutoMove />
    <figure class="relative z-10">
      <img class="w-4" src="~/assets/img/icons/editor/pin.svg" alt="" />
    </figure>
    <div
      class="h-full rounded-full w-[2px] bg-[#fff] absolute left-1/2 -translate-x-1/2 top-0"
    ></div>
  </AppDrag>
</template>
