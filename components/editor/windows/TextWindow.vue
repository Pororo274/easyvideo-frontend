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
    (filters.text as TextFilter).text = text.value;

    return filters;
  });
});

const { sync } = useVirtualMediaSynchronizer();
</script>

<template>
  <MenuWindowWrapper>
    <template #name>Текст</template>
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
  </MenuWindowWrapper>
</template>
