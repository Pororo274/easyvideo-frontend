<script setup lang="ts">
import download from "~/assets/img/icons/editor/download.svg";

defineProps<{
  name: string;
}>();

const { isUploading } = useMediaUpload();

const isDownloadModalActive = ref(false);

const { addVirtualMedia } = useVirtualMedias();
const { createVirtualText } = useVirtualMediaFactory();
const { sync } = useVirtualMediaSynchronizer();

const addVirtualText = () => {
  const virtualMedia = createVirtualText();

  addVirtualMedia(virtualMedia);
  sync();
};

const { currentWindow, currentData } = useEditorWindows();

const showMedia = () => {
  (currentWindow.value = "mediaWindow"), (currentData.value = "");
};
</script>

<template>
  <AppHeader>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/account"
          class="rounded-md flex items-center justify-center w-6 h-6 hover:bg-zinc-800"
        >
          <img
            class="icon-white rotate-90 w-4 h-4"
            src="~/assets/img/icons/actions/arrow-down.svg"
            alt=""
          />
        </NuxtLink>
        <h2 class="text-white font-medium text-base">
          {{ name }}
        </h2>
      </div>
      <nav>
        <ul class="flex">
          <li
            class="relative py-1 px-4 cursor-default rounded-md group hover:bg-gray-dark"
          >
            <p class="text-white font-medium">Добавить</p>
            <div
              class="w-[150px] absolute top-8 rounded-md border border-gray bg-black hidden group-hover:block"
            >
              <ul>
                <li
                  @click="addVirtualText"
                  class="py-1 px-4 hover:bg-gray flex items-center gap-4"
                >
                  <p class="text-white font-medium">Текст</p>
                </li>
                <li class="text-white font-medium py-1 px-4 hover:bg-gray">
                  Медиафайл
                </li>
              </ul>
            </div>
          </li>
          <li
            class="relative py-1 px-4 cursor-default rounded-md group hover:bg-gray-dark"
          >
            <p class="text-white font-medium">Показать</p>
            <div
              class="w-[150px] absolute top-8 rounded-md border border-gray bg-black hidden group-hover:block"
            >
              <ul>
                <li
                  @click="showMedia"
                  class="py-1 px-4 hover:bg-gray flex items-center gap-4"
                >
                  <p class="text-white font-medium">Медиафайлы</p>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      <div class="flex gap-2">
        <IconButton
          @click="isDownloadModalActive = true"
          :animation="false"
          :icon="download"
        />
        <figure
          class="w-9 h-9 rounded-md flex items-center justify-center cursor-pointer hover:bg-zinc-900"
        >
          <img
            v-show="isUploading"
            class="sync_rotation icon-amber w-4"
            src="~/assets/img/icons/editor/sync.svg"
            alt=""
          />
          <img
            v-show="!isUploading"
            class="icon-green w-[22px]"
            src="~/assets/img/icons/editor/cloud-success.svg"
            alt=""
          />
        </figure>
        <UserNotificationList class="z-20" />
      </div>
    </div>
  </AppHeader>
  <AppModal v-model="isDownloadModalActive">
    <ProjectExportOutputModal />
  </AppModal>
</template>

<style scoped>
@keyframes sync-rotation {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.sync_rotation {
  animation: sync-rotation 2.5s linear 0s infinite;
}
</style>
