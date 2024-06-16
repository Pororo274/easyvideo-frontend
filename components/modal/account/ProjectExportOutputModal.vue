<script setup lang="ts">
import { SystemNotificationType } from "~/enums/notifications/system-notification-type.enum";

const { project } = useProject();
const { updateUploadStatus } = useMediaUpload();
const { hideModal } = useAppModal();
const { pushSystemNotification } = useAppNotification();
const { isUploading } = useMediaUpload();

const onSuccess = () => {
  updateUploadStatus(true);
  pushSystemNotification({
    message: "Начался экспорт...",
    type: SystemNotificationType.SUCCESS,
  });
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
      <AppForm @success="onSuccess" :action="`/projects/${project.id}/render`">
        <div>
          <h3 class="text-white font-medium text">Формат:</h3>
          <div class="py-1.5 px-12 bg-gray rounded-md mt-2 inline-block">
            <p class="text-white">MP4</p>
          </div>
          <div class="flex justify-between mt-4">
            <p class="text-white">Разрешение</p>
            <p class="text-white">{{ project.width }}x{{ project.height }}</p>
          </div>
        </div>
        <FormButton class="w-full mt-4" :disabled="isUploading"
          >Экспортировать</FormButton
        >
        <p v-show="isUploading" class="text-yellow text-center mt-2">
          Экспорт пока не возможен. Идет синхронизация
        </p>
      </AppForm>
    </div>
  </div>
</template>
