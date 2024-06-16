<script setup lang="ts">
import {
  getCorrectMinutsName,
  getCorrectDaysName,
  getCorrectHoursName,
} from "~/helpers/pluralization.helper";
import type { Project } from "~/interfaces/project/project.interface";

const props = defineProps<{
  project: Project;
}>();

const editedAgo = computed(() => {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const interval = Date.now() - new Date(props.project.createdAt).getTime();

  if (interval < day) {
    if (interval > hour) {
      const hours = Math.floor(interval / hour);
      return `Редактирован ${hours} ${getCorrectHoursName(hours)} назад`;
    }

    if (interval > minute) {
      const minuts = Math.floor(interval / minute);
      return `Редактирован ${minuts} ${getCorrectMinutsName(minuts)} назад`;
    }
    return "Редактирован только что";
  }

  return `Редактирован ${Math.floor(interval / day)} ${getCorrectDaysName(
    Math.floor(interval / day)
  )} назад`;
});

const activatedContextmenu = useState<number | null>(
  "activatedContextmenu",
  () => null
);

const contextmenuPosition = ref({
  x: 0,
  y: 0,
});

const onContextmenu = (e: MouseEvent) => {
  activatedContextmenu.value = props.project.id;
  contextmenuPosition.value.x = e.pageX - 10;
  contextmenuPosition.value.y = e.pageY + 5;
};
</script>

<template>
  <div
    @click="navigateTo(`/account/${project.id}`)"
    @contextmenu.prevent.stop="onContextmenu"
    v-out="() => (activatedContextmenu = null)"
    v-out:contextmenu="() => (activatedContextmenu = null)"
    class="relative block p-5 hover:bg-gray-dark rounded-lg cursor-default"
  >
    <DropDownProjectItemMenu
      @click.stop="activatedContextmenu = null"
      v-show="activatedContextmenu === props.project.id"
      :style="{
        top: `${contextmenuPosition.y}px`,
        left: `${contextmenuPosition.x}px`,
      }"
      :project-id="project.id"
    />
    <div class="flex flex-col gap-3">
      <figure
        v-if="project.preview"
        class="aspect-video w-full rounded-md overflow-hidden"
      >
        <img class="w-full h-full object-cover" :src="project.preview" alt="" />
      </figure>
      <div v-else class="aspect-video w-full rounded-md bg-gray"></div>
      <div>
        <h3 class="text-white text-medum text-base">{{ project.name }}</h3>
        <p class="text-gray-light text-sm">{{ editedAgo }}</p>
      </div>
    </div>
  </div>
</template>
