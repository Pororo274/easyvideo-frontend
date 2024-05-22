<script setup lang="ts">
import type { Account } from "~/interfaces/account/account.interface";
import type { ProjectConfig } from "~/interfaces/project/project-config.interface";
import type { Project } from "~/interfaces/project/project.interface";

const { $api } = useNuxtApp();

useHead({
  title: "EasyVideo - Account",
});

definePageMeta({
  middleware: ["auth"],
});

useExports();

const { user } = useUser();

const { data } = await useAsyncData<Account>("accountData", async () => {
  const [projects, projectConfigs] = await Promise.all([
    $api<Project[]>(`/users/${user.value.id}/projects`),
    $api<ProjectConfig[]>(`/projects/configs`),
  ]);

  return { projects, projectConfigs };
});
</script>

<template>
  <div>
    <AccountHeader />
    <section class="w-full h-screen pt-[77px]">
      <div
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <ProjectItem
          v-for="project in (data as Account).projects"
          :project="project"
        />
      </div>
    </section>
  </div>
</template>
