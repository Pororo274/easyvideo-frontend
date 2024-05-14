<template>
  <div class="p-px rounded-lg bg-gradient-to-br from-zinc-600">
    <div
      class="bg-zinc-900 rounded-lg p-5 h-full flex flex-col gap-8 justify-between"
    >
      <div>
        <h3 class="text-slate-400 text-xl font-normal">
          <slot name="name"></slot>
        </h3>
        <h1 class="text-white text-4xl font-bold mt-2">
          <slot name="price"></slot>
        </h1>
        <p class="text-slate-400 mt-2">
          <slot name="description"></slot>
        </p>
        <div class="grid gap-4 mt-6">
          <slot name="advantages"></slot>
        </div>
      </div>
      <NuxtLink
        class="block p-px bg-gradient-to-br from-indigo-500 rounded-md group"
        to="/sign-up"
      >
        <div
          class="py-2 pl-8 pr-6 bg-zinc-900 rounded-md flex justify-center transition group-hover:bg-indigo-500"
        >
          <div class="flex items-center gap-3">
            <p class="text-white">Начать творить</p>
            <figure class="transition-all group-hover:translate-x-1">
              <img
                class="icon-white -rotate-90 w-3"
                src="~/assets/img/icons/actions/arrow-down.svg"
                alt=""
              />
            </figure>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
