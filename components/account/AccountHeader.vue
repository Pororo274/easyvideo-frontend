<script setup lang="ts">
const { $api } = useNuxtApp();
const { user } = useUser();

const isModalActive = ref(false);

const { data } = await useAsyncData<{ key: string; text: string }[]>(() =>
  $api("/projects/configs")
);
</script>

<template>
  <AppHeader class="fixed top-0 left-0">
    <div class="flex items-center justify-between">
      <div class="flex gap-3 items-center">
        <div
          class="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center"
        >
          <p class="text-white font-medium text-xs">
            {{ user.username[0].toUpperCase() }}
          </p>
        </div>
        <h2 class="text-white text-base">{{ user.username }}</h2>
      </div>
      <AppButton @click="isModalActive = true">
        <div class="flex gap-3 items-center">
          <p class="flex-1">Создать проект</p>
          <figure>
            <img
              style="
                filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg)
                  brightness(103%) contrast(103%);
              "
              class="w-4 h-4"
              src="~/assets/img/icons/actions/plus.svg"
              alt=""
            />
          </figure>
        </div>
      </AppButton>
    </div>
  </AppHeader>
  <Teleport to="body">
    <div
      class="w-full h-screen fixed z-50 top-0 left-0 backdrop-blur-sm"
      v-if="isModalActive"
    >
      <div
        class="w-full h-full absolute top-0 left-0 bg-black opacity-70"
      ></div>
      <div
        class="w-[30%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-lg"
      >
        <div class="p-5 border-b border-b-zinc-800">
          <div class="flex items-center justify-between">
            <h2 class="text-white text-xl font-medium">Новый проект</h2>
            <figure @click="isModalActive = false" class="cursor-pointer">
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
          <AppForm action="/projects">
            <div class="grid gap-4">
              <FormInput name="name" placeholder="Без названия"
                >Название</FormInput
              >
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
      </div>
    </div>
  </Teleport>
</template>
