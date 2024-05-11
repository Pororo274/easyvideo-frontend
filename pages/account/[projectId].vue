<script setup lang="ts">
interface Project {
  name: string;
}

const { $api } = useNuxtApp();
const route = useRoute();

const { data: project } = await useAsyncData<Project>(() =>
  $api(`/projects/${route.params.projectId}`)
);

useHead({
  title: `EasyVideo - ${project.value?.name}`,
});

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <section class="w-full h-screen">
    <div class="flex h-full flex-col">
      <EditorHeader :name="(project as Project).name" />
      <div class="flex-1">
        <div class="grid grid-cols-5 grid-rows-12 h-full">
          <PreviewWindow class="col-span-3 row-span-8" />
          <MediaWindow
            class="border-l border-l-zinc-800 col-span-2 row-span-8"
          />
          <LayerWindow
            class="border-t border-t-zinc-800 col-span-5 row-span-4"
          />
        </div>
      </div>
    </div>
  </section>
</template>
