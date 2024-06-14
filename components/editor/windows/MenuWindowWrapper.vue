<template>
  <div class="flex flex-col h-full">
    <div class="p-4 border-b border-r border-gray">
      <div class="flex items-center justify-between">
        <h3 class="text-white font-medium text-base">
          <slot name="name"></slot>
        </h3>
        <div v-if="$slots['right-side']">
          <slot name="right-side"></slot>
        </div>
      </div>
    </div>
    <div class="overflow-y-auto flex-1 border-r border-gray">
      <slot></slot>
    </div>
  </div>
</template>
