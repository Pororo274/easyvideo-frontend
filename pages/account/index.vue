<script setup lang="ts">
const { $api } = useNuxtApp();

useHead({
  title: "EasyVideo - Account",
});

definePageMeta({
  middleware: ["auth"],
});

useExports();

const { user } = useUser();

const { data } = await useAsyncData(() =>
  $api(`/users/${user.value.id}/projects`)
);
</script>

<template>
  <div>
    <AccountHeader />
    <section class="w-full h-screen pt-[85px]">
      <div
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <ProjectItem v-for="project in data" :project="project" />
      </div>
    </section>
  </div>
</template>
