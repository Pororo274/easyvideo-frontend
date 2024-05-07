<script setup lang="ts">
const model = defineModel();
</script>

<template>
  <div>
    <AppLabel>
      <slot name="label"></slot>
    </AppLabel>
    <div class="relative mt-1">
      <select
        v-model="model"
        name=""
        id=""
        class="block appearance-none bg-zinc-900 text-white py-1.5 px-3 w-full border border-zinc-700 focus:outline-none focus:border-indigo-600 rounded-md"
      >
        <slot> </slot>
      </select>
      <figure>
        <img
          style="
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg)
              brightness(103%) contrast(103%);
          "
          class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2"
          src="~/assets/img/icons/actions/arrow-down.svg"
          alt=""
        />
      </figure>
    </div>
  </div>
</template>
