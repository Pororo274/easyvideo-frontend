<script setup lang="ts">
import type { Media } from "~/interfaces/editor/media.interface";
import type { Project } from "~/interfaces/project/project.interface";

const { $api, $broadcast } = useNuxtApp();
const route = useRoute();

const { setProject, project } = useProject();
const { setMedias } = useMedias();

const { data } = await useAsyncData(async () => {
  const [project, medias] = await Promise.all<
    [Promise<Project>, Promise<Media[]>]
  >([
    $api(`/projects/${route.params.projectId}`),
    $api(`/projects/${route.params.projectId}/media`),
  ]);

  return {
    project,
    medias,
  };
});

watchEffect(() => {
  if (!data.value) return;

  setProject(data.value.project);
  setMedias(...data.value.medias);
});

useHead({
  title: `EasyVideo - ${project.value.name}`,
});

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  $broadcast()
    .private(`projects.${project.value.id}`)
    .listen("RenderJobEndedEvent", (e: any) => {
      console.log(e);
    });
});
</script>

<template>
  <section class="w-full h-screen">
    <div class="flex h-full flex-col">
      <EditorHeader :name="project.name" />
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
