<script setup lang="ts">
import type {
  FilterList,
  VirtualMedia,
} from "~/interfaces/editor/virtual-media.interface";

const { currentData } = useEditorWindows<string>();
const { getVirtualMediaByUuid, mapFilterList } = useVirtualMedias();
const { getObjectURLByUuid, getOriginalNameByUuid } = useMedias();
const { sync } = useVirtualMediaSynchronizer();
const {} = useVirtualMedias();

const virtualMedia = computed(
  () => getVirtualMediaByUuid(currentData.value) as VirtualMedia
);

const objectURL = computed(() => {
  return getObjectURLByUuid(virtualMedia.value.content);
});

const changeHorizontalFlip = () => {
  mapFilterList(currentData.value, (filters: FilterList) => {
    filters.flip = {
      h: !filters?.flip?.h ?? true,
      v: !!filters?.flip?.v ?? false,
    };

    return filters;
  });
  sync();
};

const changeVerticalFlip = () => {
  mapFilterList(currentData.value, (filters: FilterList) => {
    filters.flip = {
      h: !!filters?.flip?.h ?? true,
      v: !filters?.flip?.v ?? false,
    };

    return filters;
  });
  sync();
};
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
      <div class="mt-5">
        <div class="flex gap-3">
          <div
            @click="changeHorizontalFlip"
            class="py-2 flex-1 border border-gray rounded-md cursor-pointer hover:bg-gray"
          >
            <figure>
              <img
                class="icon-white w-5 mx-auto"
                src="~/assets/img/icons/editor/actions/flip.svg"
                alt=""
              />
            </figure>
          </div>
          <div
            @click="changeVerticalFlip"
            class="py-2 flex-1 border border-gray rounded-md cursor-pointer hover:bg-gray"
          >
            <figure>
              <img
                class="icon-white w-5 mx-auto rotate-90"
                src="~/assets/img/icons/editor/actions/flip.svg"
                alt=""
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
