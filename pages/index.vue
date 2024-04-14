<script setup lang="ts">
const videoLink = ref("");
const relay = ref<HTMLDivElement | null>(null);
const workField = ref<HTMLDivElement | null>(null);
const relayWidth = ref(0);
const video = ref<HTMLVideoElement | null>(null);
const videoDuration = ref(0);

onMounted(() => {
  if (!relay.value) return;

  relayWidth.value = relay.value.clientWidth;
});

const fileInputHandler = (e: Event) => {
  if (!e.target) return;
  const file = e.target.files[0] as File;
  videoLink.value = URL.createObjectURL(file);

  if (!video.value) return;
  video.value.load();
};

const loadedMetadataHandler = () => {
  if (!video.value) return;

  videoDuration.value = Math.round(video.value.duration * 100) / 100;
};

const videoPinMoveHandler = (xPos: number) => {
  if (!video.value) return;

  video.value.currentTime = videoDuration.value * (xPos / relayWidth.value);
};
</script>

<template>
  <div ref="workField" class="p-4 w-full h-screen bg-slate-900 overflow-hidden">
    <div class="h-full flex flex-col gap-4">
      <div class="flex gap-6 flex-1">
        <aside class="w-[350px]">
          <div class="bg-slate-700 w-full p-4">
            <input @input="fileInputHandler" type="file" name="" id="" />
          </div>
        </aside>
        <div class="flex-1">
          <video
            @loadedmetadata="loadedMetadataHandler"
            :src="videoLink"
            ref="video"
          ></video>
        </div>
      </div>
      <div ref="relay" class="h-[200px]">
        <div class="h-full">
          <div class="relative w-full">
            <VideoPin
              @move="videoPinMoveHandler"
              :work-field="workField"
              :relay-width="relayWidth"
            />
          </div>
          <div class="w-full h-1/2 bg-slate-800"></div>
        </div>
      </div>
    </div>
  </div>
</template>
