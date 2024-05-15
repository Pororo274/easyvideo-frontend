<template>
  <div class="w-full h-screen grid items-center grid-cols-2 p-6">
    <div class="grid grid-cols-12 relative h-full items-center">
      <NuxtLink to="/" class="absolute top-4 left-1/2 -translate-x-1/2">
        <img src="~/assets/img/logo/logo.svg" alt="" />
      </NuxtLink>
      <div class="col-start-4 col-span-6">
        <slot></slot>
      </div>
    </div>
    <div
      class="rounded-2xl w-full h-full bg-gradient-to-br from-indigo-700 to-indigo-500 flex items-center justify-center"
    >
      <div class="flex flex-col gap-3">
        <h1 class="text-white font-bold text-5xl">Один редактор</h1>
        <h1 class="text-white font-bold text-5xl">Один аккаунт</h1>
        <h1 class="text-white font-bold text-5xl">Много возможностей</h1>
      </div>
    </div>
  </div>
</template>
