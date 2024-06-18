<script setup lang="ts">
import type { FilterList } from "~/interfaces/editor/virtual-media.interface";

const props = defineProps<{
  mediaUuid: string;
}>();

const { getVirtualMediaByUuid, mapFilterList } = useVirtualMedias();
const { sync } = useVirtualMediaSynchronizer();

const changeHorizontalFlip = () => {
  mapFilterList(props.mediaUuid, (filters: FilterList) => {
    filters.flip = {
      h: !filters?.flip?.h ?? true,
      v: !!filters?.flip?.v ?? false,
    };

    return filters;
  });
  sync();
};

const changeVerticalFlip = () => {
  mapFilterList(props.mediaUuid, (filters: FilterList) => {
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
</template>
