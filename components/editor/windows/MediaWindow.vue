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
  <div class="flex flex-col h-full">
    <div class="p-4 border-b border-gray">
      <div class="flex items-center justify-between">
        <h3 class="text-white font-medium text-base">Медиа</h3>
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
          />
        </label>
      </div>
    </div>
    <div class="overflow-y-auto flex-1">
      <div v-if="medias.length" class="grid grid-cols-5">
        <MediaItem v-for="media in medias" :media="media" />
      </div>
      <div v-else class="w-full h-full flex items-center justify-center">
        <h3 class="text-zinc-700 text-base font-medium">Здесь пока пусто...</h3>
      </div>
    </div>
  </div>
</template>
