<script setup lang="ts">
const isDropDownMenuActive = ref(false);
</script>

<template>
  <div class="col-span-3 flex justify-end">
    <figure
      @click="isDropDownMenuActive = !isDropDownMenuActive"
      class="relative flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray"
    >
      <img
        class="icon-white h-4"
        src="~/assets/img/icons/account/menu.svg"
        alt=""
      />
      <div
        v-show="isDropDownMenuActive"
        class="-left-2 translate-y-1 top-full absolute z-10 w-[200px] border bg-black border-gray rounded-md overflow-hidden"
      >
        <DropDownButton>Активировать подписку</DropDownButton>
        <DropDownButton>Список проектов</DropDownButton>
        <DropDownButton>Забанить</DropDownButton>
      </div>
    </figure>
  </div>
</template>
