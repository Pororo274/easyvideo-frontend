<script setup lang="ts">
useHead({
  title: "EasyVideo - Account",
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
