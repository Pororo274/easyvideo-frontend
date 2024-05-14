<template>
  <section class="pt-48">
    <div class="container">
      <div>
        <h1 class="text-white text-8xl font-bold">
          Превратите <br />
          <span
            class="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent"
            >удивительные</span
          >
          идеи <br />
          в ваши шедевры<span class="text-indigo-600">.</span>
        </h1>
        <p class="mt-8 text-slate-400 w-[700px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          ipsum, placeat dicta natus deserunt, voluptates assumenda ut hic
          eligendi et odit dignissimos tempore soluta mollitia optio eum iste
          sapiente quas?
        </p>
        <NuxtLink
          class="mt-8 inline-block p-px bg-gradient-to-br from-zinc-600 rounded-md group"
          to="/sign-up"
        >
          <div class="py-2 pl-8 pr-6 bg-zinc-950 rounded-md">
            <div class="flex items-center gap-3">
              <p class="text-white">Начать творить</p>
              <figure class="transition-all group-hover:translate-x-1">
                <img
                  class="icon-white -rotate-90 w-3"
                  src="~/assets/img/icons/actions/arrow-down.svg"
                  alt=""
                />
              </figure>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
