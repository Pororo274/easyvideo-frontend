<template>
  <div class="w-full h-screen grid items-center grid-cols-2 p-6">
    <div class="grid grid-cols-12 relative h-full items-center">
      <AppLogo class="absolute top-4 left-1/2 -translate-x-1/2" />
      <div class="col-start-5 col-span-5">
        <slot></slot>
      </div>
    </div>
    <div
      class="relative rounded-2xl w-full h-full overflow-hidden flex items-center justify-center"
    >
      <img
        class="w-full h-full object-cover absolute top-0 left-0 brightness-50"
        src="/auth.jpg"
        alt=""
      />
      <div class="flex flex-col gap-3 relative">
        <h1 class="text-white font-bold text-5xl">Один редактор</h1>
        <h1 class="text-white font-bold text-5xl">Один аккаунт</h1>
        <h1 class="text-white font-bold text-5xl">Много возможностей</h1>
      </div>
    </div>
  </div>
</template>
