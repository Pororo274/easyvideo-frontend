<script setup lang="ts">
const { project } = useProject();
const { updateUploadStatus } = useMediaUpload();
const { virtualMedias } = useVirtualMedias();
const { hideModal } = useAppModal();

const onSuccess = () => {
  updateUploadStatus(true);
  hideModal();
};
</script>

<template>
  <div>
    <div class="p-5 border-b border-b-zinc-800">
      <div class="flex items-center justify-between">
        <h2 class="text-white text-xl font-medium">Экспорт</h2>
        <CloseModalButton />
      </div>
    </div>
    <div class="p-5">
      <AppForm
        @success="onSuccess"
        :action="`/projects/${project.id}/render`"
        :data="{ virtualMedias }"
      >
        <div>
          <h2 class="text-white font-medium text-xl">Параметры экспорта:</h2>
          <div class="grid grid-cols-3 mt-2">
            <div>
              <h3 class="text-white font-medium text-sm">Ширина:</h3>
              <h2 class="text-white font-medium">{{ project.width }}px</h2>
            </div>
            <div>
              <h3 class="text-white font-medium text-sm">Высота:</h3>
              <h2 class="text-white font-medium">{{ project.height }}px</h2>
            </div>
            <div>
              <h3 class="text-white font-medium text-sm">Часто кадров:</h3>
              <h2 class="text-white font-medium">25fps</h2>
            </div>
          </div>
        </div>
        <FormButton class="w-full mt-4">Экспортировать</FormButton>
      </AppForm>
    </div>
  </div>
</template>
