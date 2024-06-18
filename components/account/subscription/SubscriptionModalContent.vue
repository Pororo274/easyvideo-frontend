<script setup lang="ts">
const onSuccess = (data: any) => {
  navigateTo(data.confirmationUrl, {
    open: {
      target: "_blank",
    },
  });
};
</script>

<template>
  <div class="p-4 border-b border-gray">
    <h3 class="text-white font-medium">Перейти на премиум</h3>
  </div>
  <div class="p-4">
    <div class="grid gap-2">
      <p class="text-white">Отсутствие водянного знака</p>
      <p class="text-white">Экспорт видео в формате Full HD</p>
      <p class="text-white">Открывайте файлы размером до 2 ГБ</p>
      <p class="text-white">Сохраняйте видео неограниченной длины</p>
    </div>
    <div class="mt-6">
      <div class="flex items-end gap-1">
        <h2 class="text-white text-3xl">390 ₽</h2>
        <p class="text-white text-sm">в месяц</p>
      </div>
    </div>
    <AppForm
      @success="onSuccess"
      class="mt-4 w-full"
      action="/subscriptions/month"
    >
      <FormButton class="w-full">Оформить на 1 месяц</FormButton>
    </AppForm>
    <MakeCloseModal v-slot="{ hide }">
      <p
        @click="hide"
        class="text-blue-light underline mt-3 text-center cursor-pointer"
      >
        Остаться на бесплатной
      </p>
    </MakeCloseModal>
  </div>
</template>
