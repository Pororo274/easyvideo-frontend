<template>
  <div>
    <div class="p-4 border-b border-b-zinc-800">
      <div class="flex items-center justify-between">
        <h3 class="text-white font-medium text-base">Медиа</h3>
      </div>
    </div>
    <div class="overflow-y-auto">
      <div class="grid grid-cols-5">
        <div
          v-for="i in 5"
          class="p-3 rounded-md hover:bg-zinc-900 cursor-pointer"
        >
          <div class="bg-red-500 w-full aspect-video"></div>
          <h4 class="text-white text-medium mt-2">untitlsdf sdfk...</h4>
          <h4 class="text-white text-medium text-xl">.jpg</h4>
        </div>
      </div>
    </div>
  </div>
</template>
