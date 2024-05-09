<script setup lang="ts">
import type { Media } from "~/interfaces/editor/media.interface";

defineProps<{
  media: Media;
}>();

const { addVirtualMedia } = useVirtualMedias();
</script>

<template>
  <div class="relative p-3 rounded-md hover:bg-zinc-900 group cursor-pointer">
    <div class="absolute bottom-3 right-3">
      <figure
        @click="addVirtualMedia(media.toVirtualMedia())"
        class="hidden group-hover:flex rounded items-center justify-center w-6 h-6 bg-green-500"
      >
        <img
          class="icon-white w-4"
          src="~/assets/img/icons/actions/plus.svg"
          alt=""
        />
      </figure>
    </div>
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
