<template>
  <div>
    <h3 class="text-white font-medium text-2xl">
      <slot name="name"></slot>
    </h3>
    <p class="text-slate-400 mt-2 max-w-64">
      <slot name="description"></slot>
    </p>
    <div class="relative mt-4">
      <div
        class="relative rounded-md bg-gradient-to-br border border-zinc-700 from-zinc-800 to-zinc-900 w-72 aspect-video"
      ></div>
      <div
        class="absolute rounded-md bg-gradient-to-br border border-zinc-700 from-zinc-800 to-zinc-900 w-72 aspect-video top-0 translate-x-6 translate-y-6 shadow-md"
      ></div>
    </div>
  </div>
</template>
