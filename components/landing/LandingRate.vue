<template>
  <div
    class="bg-gray-dark rounded-xl border border-gray p-5 flex flex-col justify-between"
  >
    <div>
      <h2 class="text-white font-medium text-3xl">
        <slot name="name"></slot>
      </h2>
      <p class="text-gray-light">
        <slot name="subname"></slot>
      </p>
      <div class="h-px bg-gray mt-6"></div>
      <p class="text-white text-5xl mt-6">
        <slot name="price"></slot>
      </p>
      <p class="text-gray-light mt-6">
        <slot name="description"></slot>
      </p>
    </div>
    <LinkOutline to="/account" class="mt-6">Пробрести</LinkOutline>
  </div>
</template>
