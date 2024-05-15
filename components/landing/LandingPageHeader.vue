<template>
  <div>
    <h2 class="text-indigo-500 font-normal text-xl tracking-widest">
      <slot name="name"></slot>
    </h2>
    <h2 class="text-white font-medium text-5xl mt-2">
      <slot name="cta"></slot>
    </h2>
    <p class="text-slate-400 mt-4">
      <slot name="description"></slot>
    </p>
  </div>
</template>
