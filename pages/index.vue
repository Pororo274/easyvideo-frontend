<script setup lang="ts">
useHead({
  title: "EasyVideo",
});

definePageMeta({
  layout: "auth",
  middleware: ["guest"],
});

const { refreshUserData } = useUser();

const onSuccess = async (data: any) => {
  await refreshUserData(data);
  await navigateTo("/account");
};
</script>

<template>
  <AppForm
    @success="onSuccess"
    action="/auth/sign-up"
    class="col-start-4 col-span-2 bg-zinc-900 rounded-lg p-4"
  >
    <h1 class="text-2xl font-medium text-white">Создать аккаунт</h1>
    <div class="flex flex-col gap-4 mt-4">
      <FormInput name="email" placeholder="example@mail.ru"
        >Электронная почта</FormInput
      >
      <FormInput name="username" placeholder="Биг дик дог"
        >Имя пользователя</FormInput
      >
      <FormInput name="password" placeholder="Что-то секретное" type="password"
        >Пароль</FormInput
      >
      <FormInput
        name="password_repeat"
        placeholder="Еще что-то секретное"
        type="password"
        >Повторите пароль</FormInput
      >
    </div>
    <FormButton class="mt-6 w-full">Зарегистрироваться</FormButton>
    <p class="text-white mt-4 text-center">
      Уже есть аккаунт?
      <NuxtLink to="/login" class="text-indigo-600 underline">Войти</NuxtLink>
    </p>
  </AppForm>
</template>
