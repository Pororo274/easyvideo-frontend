<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string;
    animation?: boolean;
  }>(),
  {
    animation: true,
  }
);
</script>

<template>
  <div
    class="w-9 h-9 flex items-center justify-center rounded-md cursor-pointer hover:bg-zinc-800 group"
  >
    <img
      :class="{
        'group-hover:rotate-45': animation,
      }"
      class="icon-white w-4 transition-all"
      :src="icon"
      alt=""
    />
  </div>
</template>
