<template>
  <div
    class="absolute w-5 h-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <span class="loader-anim"></span>
  </div>
</template>

<style scoped>
.loader-anim {
  width: 20px;
  height: 20px;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
