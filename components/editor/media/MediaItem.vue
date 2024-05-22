<script setup lang="ts">
import type { Media } from "~/interfaces/editor/media.interface";

const props = defineProps<{
  media: Media;
}>();

const { createVirtualMedia } = useVirtualMediaFactory();
const { addVirtualMedia } = useVirtualMedias();

const create = async () => {
  const virtualMedia = await createVirtualMedia(props.media);

  addVirtualMedia(virtualMedia);
};
</script>

<template>
  <div class="relative p-3 rounded-md hover:bg-gray-dark group">
    <div
      class="absolute cursor-pointer rounded overflow-hidden w-6 h-6 bottom-3 right-3 z-10"
    >
      <figure
        @click="create"
        class="hidden group-hover:flex items-center justify-center h-full w-full bg-green"
      >
        <img
          class="icon-white w-3"
          src="~/assets/img/icons/actions/plus.svg"
          alt=""
        />
      </figure>
    </div>
    <div class="w-full aspect-video">
      <MediaItemPreview :file-type="media.type" :object-url="media.objectURL" />
    </div>
    <h4
      class="text-white text-medium text-ellipsis mt-2 whitespace-nowrap overflow-hidden"
    >
      {{ media.originalName }}
    </h4>
  </div>
</template>
