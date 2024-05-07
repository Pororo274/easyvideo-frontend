<script setup lang="ts">
import type { Media } from "~/interfaces/editor/media.interface";

const props = defineProps<{
  media: Media;
}>();

const format = computed(() => {
  if (["image/jpeg", "image/png"].find((x) => x === props.media.file.type)) {
    return "image";
  }

  if (props.media.file.type === "video/mp4") {
    return "video";
  }
});
</script>

<template>
  <div class="p-3 rounded-md hover:bg-zinc-900 cursor-pointer">
    <div class="w-full aspect-video">
      <MediaItemPreview
        :file-type="media.file.type"
        :object-url="media.objectURL"
      />
    </div>
    <h4
      class="text-white text-medium text-ellipsis mt-2 whitespace-nowrap overflow-hidden"
    >
      {{ media.file.name }}
    </h4>
    <h4 class="text-white text-medium text-xl">
      {{ (media.file.name.match(/\.\w+$/) as RegExpMatchArray)[0] }}
    </h4>
  </div>
</template>
