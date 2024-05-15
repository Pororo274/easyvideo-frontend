<script setup lang="ts">
const { hideModal } = useAppModal();
const { $api } = useNuxtApp();

const { data } = await useAsyncData<{ key: string; text: string }[]>(() =>
  $api("/projects/configs")
);

const onSuccess = (data: any) => {
  navigateTo(`/account/${data.id}`);
};
</script>

<template>
  <div class="p-5 border-b border-b-zinc-800">
    <div class="flex items-center justify-between">
      <h2 class="text-white text-xl font-medium">Новый проект</h2>
      <figure @click="hideModal" class="cursor-pointer">
        <img
          style="
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg)
              brightness(103%) contrast(103%);
          "
          class="w-4 h-4"
          src="~/assets/img/icons/actions/close.svg"
          alt=""
        />
      </figure>
    </div>
  </div>
  <div class="p-5">
    <AppForm @success="onSuccess" action="/projects">
      <div class="grid gap-4">
        <FormInput name="name" placeholder="Без названия">Название</FormInput>
        <FormSelect name="config" :default-value="data[0].key">
          <template #label>Настройки</template>
          <option v-for="config in data" :value="config.key">
            {{ config.text }}
          </option>
        </FormSelect>
      </div>
      <FormButton class="mt-6 w-full">Создать</FormButton>
    </AppForm>
  </div>
</template>
