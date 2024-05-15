<script setup lang="ts">
const props = defineProps<{
  order: number;
}>();

const { pxPerSecond } = useTimeLine();

const text = computed(
  () =>
    `${Math.floor((props.order - 1) / 60)
      .toString()
      .padStart(2, "0")}:${((props.order - 1) % 60)
      .toString()
      .padStart(2, "0")}`
);

const isShortLine = computed(() =>
  Math.floor((props.order - 1) % Math.ceil(140 / pxPerSecond.value))
);
</script>

<template>
  <div
    v-show="!Math.floor((order - 1) % Math.ceil(20 / pxPerSecond))"
    :style="{ transform: `translate(${(order - 1) * pxPerSecond}px, 0)` }"
    class="absolute w-0.5 h-6 -translate-x-1/2"
  >
    <div
      :class="[isShortLine ? 'h-1.5' : 'h-6']"
      class="rounded-full w-0.5 h-6 bg-zinc-700"
    ></div>
    <p
      v-show="!isShortLine"
      class="absolute text-zinc-700 text-xs -translate-x-1/2 top-full"
    >
      {{ text }}
    </p>
  </div>
</template>
