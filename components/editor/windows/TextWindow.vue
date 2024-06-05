<script setup lang="ts">
import type {
  FilterList,
  VirtualMedia,
} from "~/interfaces/editor/virtual-media.interface";
import type { TextFilter } from "~/interfaces/filters/text-filter.interface";

const { currentData } = useEditorWindows<string>();
const { virtualMedias, updateContentByUuid, mapFilterList } =
  useVirtualMedias();

const virtualMedia = computed(
  () =>
    virtualMedias.value.find(
      (x) => x.uuid === currentData.value
    ) as VirtualMedia
);

const text = ref(virtualMedia.value.content);
const fontSize = ref((virtualMedia.value.filters.text as TextFilter).fontSize);

watchEffect(() => {
  updateContentByUuid(currentData.value, text.value);
  mapFilterList(currentData.value, (filters: FilterList) => {
    (filters.text as TextFilter).fontSize = fontSize.value;

    return filters;
  });
});

const { sync } = useVirtualMediaSynchronizer();
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="p-4 border-b border-r border-gray">
      <h3 class="text-white font-medium text-base">Текст</h3>
    </div>
    <div class="overflow-y-auto flex-1 border-r border-gray p-4">
      <div class="grid gap-4">
        <AppInput
          @blur="sync"
          v-model="text"
          placeholder="Ваш текст"
          input-class="border-gray"
        >
          Значение
        </AppInput>
        <AppInput
          @blur="sync"
          v-model="fontSize"
          type="number"
          placeholder="Размер шрифта"
          input-class="border-gray"
        >
          Размер
        </AppInput>
      </div>
    </div>
  </div>
</template>
