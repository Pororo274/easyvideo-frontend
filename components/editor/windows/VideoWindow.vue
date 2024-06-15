<script setup lang="ts">
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";

const { currentData } = useEditorWindows<string>();
const { getVirtualMediaByUuid } = useVirtualMedias();
const { getObjectURLByUuid, getOriginalNameByUuid } = useMedias();
const {} = useVirtualMedias();

const virtualMedia = computed(
  () => getVirtualMediaByUuid(currentData.value) as VirtualMedia
);

const objectURL = computed(() => {
  return getObjectURLByUuid(virtualMedia.value.content);
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="p-4 border-b border-r border-gray">
      <h3 class="text-white font-medium text-base">Видео</h3>
    </div>
    <div class="overflow-y-auto flex-1 border-r border-gray p-4">
      <div class="flex gap-3 items-center">
        <div class="w-28 aspect-video">
          <MediaItemPreview :object-url="objectURL" :file-type="'video/mp4'" />
        </div>
        <div class="flex-1">
          <p class="text-white">
            {{ getOriginalNameByUuid(virtualMedia.content) }}
          </p>
        </div>
      </div>
      <div
        class="px-3 py-2 border border-gray rounded-md text-white mt-4 text-center hover:bg-gray-dark select-none"
      >
        Кадрировать
      </div>
    </div>
  </div>
</template>
