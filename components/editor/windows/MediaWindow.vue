<script setup lang="ts">
import type { Media } from "~/interfaces/editor/media.interface";

useHead({
  title: "EasyVideo - Без названия",
});

const medias = ref<Media[]>([]);

const allowedTypes = ref(["video/mp4", "image/png", "image/jpeg"]);

const allowedTypesString = computed(() =>
  allowedTypes.value
    .slice(1)
    .reduce((a, c) => `${a}, ${c}`, allowedTypes.value[0])
);

const onFileInput = (e: Event) => {
  if (!e.target) return;
  const target = e.target as HTMLInputElement;

  if (!target.files) return;

  const files = target.files;

  for (let i = 0; i < files.length; i++) {
    medias.value.push({
      file: files[i],
      objectURL: URL.createObjectURL(files[i]),
    });
  }
};
</script>

<template>
  <div>
    <div class="p-4 border-b border-b-zinc-800">
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
    <div class="overflow-y-auto">
      <div class="grid grid-cols-5">
        <MediaItem v-for="media in medias" :media="media" />
      </div>
    </div>
  </div>
</template>
