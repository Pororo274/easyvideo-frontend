<script setup lang="ts">
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

defineProps<{
  virtualMedia: VirtualMedia;
}>();

const { timeLineWidth } = useTimeLine();
const virtualMediaWidth = ref(timeLineWidth.value);
const virtualMediaStyle = computed(() => ({
  width: `${virtualMediaWidth.value}px`,
}));
</script>

<template>
  <div
    :style="virtualMediaStyle"
    class="relative py-1.5 px-4 rounded-md bg-zinc-900 group"
  >
    <VirtualMediaLever class="left-0" pin-class="bg-indigo-800" />
    <VirtualMediaLever class="right-0" pin-class="bg-indigo-800" />
    <div class="flex gap-3 items-center">
      <video
        v-if="(virtualMedia as VirtualVideo).originalDuration"
        class="h-[40px] rounded"
        :src="virtualMedia.getContent()"
      ></video>
      <!-- TODO: add VirtualImage interface -->
      <figure v-else-if="(virtualMedia as VirtualVideo).objectURL">
        <img class="h-[40px]" :src="virtualMedia.getContent()" alt="" />
      </figure>
      <h3 class="text-white font-medium text-sm">
        {{ virtualMedia.getName() }}
      </h3>
    </div>
  </div>
</template>
