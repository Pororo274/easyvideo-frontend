<template>
  <section class="w-full h-screen">
    <div class="flex h-full flex-col">
      <AppHeader>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <NuxtLink
              to="/account"
              class="rounded-md flex items-center justify-center w-6 h-6 hover:bg-zinc-800"
            >
              <img
                style="
                  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg)
                    brightness(103%) contrast(103%);
                "
                class="rotate-90 w-4 h-4"
                src="~/assets/img/icons/actions/arrow-down.svg"
                alt=""
              />
            </NuxtLink>
            <h2 class="text-white font-medium text-base">Без названия</h2>
          </div>
        </div>
      </AppHeader>
      <div class="flex-1">
        <div class="grid grid-cols-5 grid-rows-12 h-full">
          <PreviewWindow class="col-span-3 row-span-8" />
          <MediaWindow
            class="border-l border-l-zinc-800 col-span-2 row-span-8"
          />
          <LayerWindow
            class="border-t border-t-zinc-800 col-span-5 row-span-4"
          />
        </div>
      </div>
    </div>
  </section>
</template>
