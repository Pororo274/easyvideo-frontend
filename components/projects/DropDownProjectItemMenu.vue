<script setup lang="ts">
defineProps<{
  projectId: number;
}>();

const isDeleteProjectModalActive = ref(false);

const onSuccess = () => {
  isDeleteProjectModalActive.value = false;
};
</script>

<template>
  <div
    class="fixed w-[180px] bg-black rounded-md border border-gray overflow-hidden shadow-md z-50"
  >
    <AppModal v-model="isDeleteProjectModalActive">
      <div class="p-5">
        <h3 class="text-white font-medium text-xl text-center">Вы уверены?</h3>
        <p class="text-white text-center">Это действие нельзя будет отменить</p>
        <div class="flex gap-4 mt-4">
          <AppForm
            @success="onSuccess"
            :action="`/projects/${projectId}`"
            class="flex-1"
            method="delete"
          >
            <FormButton class="w-full">Да</FormButton>
          </AppForm>
          <MakeCloseModal v-slot="{ hide }">
            <RedButton @click="hide" class="flex-1">Нет</RedButton>
          </MakeCloseModal>
        </div>
      </div>
    </AppModal>
    <NuxtLink
      @click.stop
      :to="`/account/${projectId}`"
      class="block py-1 px-3 text-white text-xs cursor-default hover:bg-blue"
      >Открыть</NuxtLink
    >
    <NuxtLink
      @click.stop
      :to="`/account/${projectId}`"
      target="_blank"
      class="block py-1 px-3 border-b border-gray text-white text-xs cursor-default hover:bg-blue"
      >Открыть в новой вкладке</NuxtLink
    >
    <div
      @click.stop
      class="block py-1 px-3 text-white border-b border-gray text-xs cursor-default hover:bg-blue"
    >
      Поделиться
    </div>
    <div
      @click.stop
      class="block py-1 px-3 text-white text-xs cursor-default hover:bg-blue"
    >
      Переименовать
    </div>
    <div
      @click="isDeleteProjectModalActive = true"
      class="block py-1 px-3 text-white text-xs cursor-default hover:bg-red"
    >
      Удалить
    </div>
  </div>
</template>
