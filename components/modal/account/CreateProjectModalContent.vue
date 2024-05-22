<script setup lang="ts">
const { account } = useProjectConfig();

const onSuccess = (data: any) => {
  navigateTo(`/account/${data.id}`);
};
</script>

<template>
  <div class="p-5 border-b border-b-zinc-800">
    <div class="flex items-center justify-between">
      <h2 class="text-white text-xl font-medium">Новый проект</h2>
      <CloseModalButton />
    </div>
  </div>
  <div class="p-5">
    <AppForm @success="onSuccess" action="/projects">
      <div class="grid gap-4">
        <FormInput name="name" placeholder="Без названия">Название</FormInput>
        <FormSelect
          name="config"
          :default-value="account.projectConfigs[0].key"
        >
          <template #label>Настройки</template>
          <option v-for="config in account.projectConfigs" :value="config.key">
            {{ config.text }}
          </option>
        </FormSelect>
      </div>
      <FormButton class="mt-6 w-full">Создать</FormButton>
    </AppForm>
  </div>
</template>
