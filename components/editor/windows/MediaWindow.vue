<script setup lang="ts">
const { addFromFiles, medias, allowedTypesString } = useMedias();

const onFileInput = (e: Event) => {
  if (!e.target) return;
  const target = e.target as HTMLInputElement;

  if (!target.files) return;

  const files = target.files;

  addFromFiles(...files);
};
</script>

<template>
  <MenuWindowWrapper>
    <template #name>Медиа</template>
    <template #right-side>
      <label
        class="w-6 h-6 flex items-center justify-center hover:bg-zinc-900 rounded-md cursor-pointer"
      >
        <img
          class="icon-white w-4"
          src="~/assets/img/icons/actions/plus.svg"
          alt=""
        />
        <input
          @input="onFileInput"
          type="file"
          class="hidden"
          multiple
          :accept="allowedTypesString"
        /> </label
    ></template>
    <div v-if="medias.length" class="grid grid-cols-3">
      <MediaItem v-for="media in medias" :media="media" />
    </div>
    <div v-else class="w-full h-full flex items-center justify-center">
      <h3 class="text-zinc-700 text-base font-medium">Здесь пока пусто...</h3>
    </div>
  </MenuWindowWrapper>
</template>
