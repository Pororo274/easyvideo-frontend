<script setup lang="ts">
useHead({
  title: "EasyVideo - Account",
});

definePageMeta({
  middleware: ["auth"],
});

const colors = ref([
  "bg-red-500",
  "bg-green-500",
  "bg-indigo-500",
  "bg-orange-500",
]);
</script>

<template>
  <div>
    <header class="p-4 border-b border-b-zinc-800 fixed w-full top-0 left-0">
      <div class="flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div
            class="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center"
          >
            <p class="text-white font-medium text-xs">U</p>
          </div>
          <h2 class="text-white text-base">Username</h2>
        </div>
        <AppButton>
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
    </header>
    <section class="w-full h-screen pt-[85px]">
      <div class="w-full h-screen fixed z-50 top-0 left-0 backdrop-blur-sm">
        <div
          class="w-full h-full absolute top-0 left-0 bg-black opacity-70"
        ></div>
        <div
          class="w-[30%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-lg"
        >
          <div class="p-5 border-b border-b-zinc-800">
            <h2 class="text-white text-xl font-medium">Новый проект</h2>
          </div>
          <div class="p-5">
            <AppForm action="/projects">
              <div class="grid gap-4">
                <FormInput name="name" placeholder="Без названия"
                  >Название</FormInput
                >
                <FormSelect name="settings" default-value="1">
                  <template #label>Настройки</template>
                  <option value="1">640🞪360, 25 fps</option>
                  <option value="2">360🞪640, 25 fps</option>
                  <option value="3">1280🞪720, 25 fps</option>
                  <option value="4">720🞪1280, 25 fps</option>
                </FormSelect>
              </div>
              <FormButton class="mt-6 w-full">Создать</FormButton>
            </AppForm>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-6">
        <div
          v-for="i in 7"
          class="p-5 cursor-pointer hover:bg-zinc-900 rounded-lg"
        >
          <div class="flex flex-col gap-3">
            <div
              :class="[colors[Math.floor(Math.random() * 4)]]"
              class="h-[160px] w-full rounded-lg"
            ></div>
            <div>
              <h3 class="text-white text-medum text-base">Без названия</h3>
              <p class="text-zinc-500 text-sm">Редактирован 1 день назад</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
