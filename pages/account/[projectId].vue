<script setup lang="ts">
import type { Media } from "~/interfaces/editor/media.interface";
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";
import type { Project } from "~/interfaces/project/project.interface";

const { $api } = useNuxtApp();
useExports();
const route = useRoute();

const { setProject, project } = useProject();
const { setMedias } = useMedias();
const { setVirtualMedias } = useVirtualMedias();
useVirtualMediaSynchronizer();

const { data } = await useAsyncData(async () => {
  const [project, medias, virtualMedias] = await Promise.all<
    [Promise<Project>, Promise<Media[]>, Promise<VirtualMedia[]>]
  >([
    $api(`/projects/${route.params.projectId}`),
    $api(`/projects/${route.params.projectId}/media`),
    $api(`/projects/${route.params.projectId}/virtual-media`),
  ]);

  return {
    project,
    medias,
    virtualMedias,
  };
});

watchEffect(() => {
  if (!data.value) return;

  setProject(data.value.project);
  setMedias(...data.value.medias);
});

onMounted(() => {
  initKeyboard();
  if (!data.value) return;
  if (!data.value.virtualMedias.length) return;

  setVirtualMedias(data.value.virtualMedias);
});

useHead({
  title: `EasyVideo - ${project.value.name}`,
});

definePageMeta({
  middleware: ["auth"],
});

const { initKeyboard } = useKeyboard();
const { clear: clearVirtualMedias } = useVirtualMedias();
const { clear: clearMedias } = useMedias();

onUnmounted(() => {
  clearVirtualMedias();
  clearMedias();
});
</script>

<template>
  <section class="w-full h-screen">
    <div class="flex h-full flex-col">
      <EditorHeader :name="project.name" />
      <div class="flex-1">
        <div class="grid grid-cols-12 grid-rows-12 h-full">
          <MenuWindow class="border-l border-gray col-span-3 row-span-12" />
          <PreviewWindow class="col-span-9 row-span-7" />
          <LayerWindow class="border-t border-gray col-span-9 row-span-5" />
        </div>
      </div>
    </div>
  </section>
</template>
