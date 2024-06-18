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
  <MenuWindowWrapper>
    <template #name> Изображение </template>
    <div class="p-4">
      <div class="flex gap-3 items-center">
        <div class="w-28 aspect-video">
          <MediaItemPreview :object-url="objectURL" :file-type="'image/png'" />
        </div>
        <div class="flex-1">
          <p class="text-white">
            {{ getOriginalNameByUuid(virtualMedia.content) }}
          </p>
        </div>
      </div>
      <MediaFlipButtons :media-uuid="currentData" class="mt-5" />
    </div>
  </MenuWindowWrapper>
</template>
