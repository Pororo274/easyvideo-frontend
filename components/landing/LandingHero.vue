<template>
  <section class="pt-24 lg:pt-56 relative">
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
      <h1 class="text-white font-medium text-3xl text-center mt-4 relative">
        С нами создание шедевров <br />
        не займет много времени
        <StarIcon
          class="absolute w-8 h-8 left-1/2 translate-x-[200px] translate-y-[-100px]"
        />
        <img
          class="absolute left-1/2 translate-x-[-240px] translate-y-[-215px] rotate-[15deg]"
          src="~/assets/img/landing/hero/cut.svg"
          alt=""
        />
        <img
          class="absolute left-1/2 translate-x-[-440px] translate-y-[-150px] -rotate-[25deg] w-32"
          src="~/assets/img/landing/hero/cutted.png"
          alt=""
        />
        <img
          class="absolute left-1/2 translate-x-[-290px] translate-y-[-150px] rotate-[130deg] w-24"
          src="~/assets/img/landing/hero/arrow.svg"
          alt=""
        />
        <img
          class="absolute left-1/2 translate-x-[320px] translate-y-[-180px] rotate-[15deg]"
          src="~/assets/img/landing/hero/edit.svg"
          alt=""
        />
        <img
          class="absolute left-1/2 translate-x-[340px] translate-y-[-50px] rotate-[25deg] w-40"
          src="~/assets/img/landing/hero/edited.svg"
          alt=""
        />
        <img
          class="absolute left-1/2 translate-x-[280px] -scale-y-100 translate-y-[-110px] rotate-[80deg]"
          src="~/assets/img/landing/hero/arrow.svg"
          alt=""
        />
      </h1>
      <div class="flex justify-center mt-4">
        <NuxtLink
          to="sign-up"
          class="inline-block relative rounded-md border bg-blue border-blue-light py-2 px-6 font-medium text-base text-white hover:bg-blue-dark"
        >
          <img
            class="absolute -left-[100px] -scale-y-100 top-[60px]"
            src="~/assets/img/landing/hero/arrow.svg"
            alt=""
          />
          <img
            class="absolute -left-[160px] top-[30px] -rotate-[25deg] w-24"
            src="~/assets/img/landing/hero/start-now.svg"
            alt=""
          />
          Начать творить</NuxtLink
        >
      </div>
    </div>
  </section>
</template>
