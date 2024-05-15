<template>
  <header class="py-8">
    <div class="container">
      <div class="flex justify-between items-center">
        <figure>
          <img src="~/assets/img/logo/logo.svg" alt="" />
        </figure>
        <nav>
          <ul class="flex gap-4">
            <li>
              <NuxtLink
                to="/"
                class="text-zinc-500 font-medium hover:text-indigo-500"
                >Почему мы</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-zinc-500 font-medium hover:text-indigo-500"
                >Тарифы</NuxtLink
              >
            </li>
          </ul>
        </nav>
        <NuxtLink
          to="login"
          class="bg-indigo-500 text-white font-medium py-2 inline-block px-8 rounded-md hover:bg-indigo-600"
          >Войти</NuxtLink
        >
      </div>
    </div>
  </header>
</template>
