<template>
  <section class="pt-56 relative">
    <div class="absolute top-0 h-full w-full left-0 blur-[220px]">
      <div
        class="w-72 h-72 bg-blue rounded-full absolute top-[300px] -left-[250px]"
      ></div>
      <div
        class="w-72 h-72 bg-blue rounded-full absolute top-[100px] -right-[250px]"
      ></div>
    </div>
    <div class="container relative">
      <h1 class="text-white font-medium text-3xl text-center">EasyVideo</h1>
      <h1 class="text-white font-medium text-3xl text-center mt-4">
        С нами создание шедевров <br />
        не займет много времени
      </h1>
      <div class="flex justify-center mt-4">
        <NuxtLink
          to="sign-up"
          class="inline-block rounded-md border bg-blue border-blue-light py-2 px-6 font-medium text-base text-white hover:bg-blue-dark"
          >Начать творить</NuxtLink
        >
      </div>
    </div>
  </section>
</template>
