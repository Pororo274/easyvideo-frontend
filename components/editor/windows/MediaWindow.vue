<script setup lang="ts">
const { medias } = useMedias();
</script>

<template>
  <MenuWindowWrapper>
    <template #name>Медиа</template>
    <template #right-side>
      <label
        class="w-6 h-6 flex items-center justify-center hover:bg-gray-dark rounded-md cursor-pointer"
      >
        <img
          class="icon-white w-4 h-4"
          src="~/assets/img/icons/actions/plus.svg"
          alt=""
        />
        <MediaInput />
      </label>
    </template>
    <div v-if="medias.length" class="grid grid-cols-3">
      <MediaItem v-for="media in medias" :media="media" />
    </div>
    <div v-else class="w-full h-full flex items-center justify-center">
      <h3 class="text-zinc-700 text-base font-medium">Здесь пока пусто...</h3>
    </div>
  </MenuWindowWrapper>
</template>
