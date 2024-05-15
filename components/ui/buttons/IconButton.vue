<script setup lang="ts">
defineProps<{
  icon: string;
}>();
</script>

<template>
  <div
    class="w-9 h-9 flex items-center justify-center rounded-md cursor-pointer hover:bg-zinc-800 group"
  >
    <img
      class="icon-white w-4 transition-all group-hover:rotate-45"
      :src="icon"
      alt=""
    />
  </div>
</template>
