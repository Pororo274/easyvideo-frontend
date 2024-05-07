<template>
  <div
    class="absolute z-50 top-5 left-1/2 -translate-x-1/2 p-3 rounded-md bg-zinc-800 border border-zinc-700"
  >
    <div class="flex gap-3 items-center">
      <figure>
        <img
          style="
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg)
              brightness(103%) contrast(103%);
          "
          class="w-4 h-4"
          src="~/assets/img/icons/info/info.svg"
          alt=""
        />
      </figure>
      <p class="text-white">
        <slot></slot>
      </p>
    </div>
  </div>
</template>
