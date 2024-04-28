<script setup lang="ts">
import type { VideoNode } from "~/interfaces/video-node.interfaces";

const { uploadAsset } = useAssetUpload();

const videoLink = ref("");
const relay = ref<HTMLDivElement | null>(null);
const workField = ref<HTMLDivElement | null>(null);
const relayWidth = ref(0);
const video = ref<HTMLVideoElement | null>(null);
const preview = ref(false);

const timeLines = ref<VideoNode[]>([]);

const timeLineDuration = computed(() => {
  return timeLines.value.reduce((a, timeLine) => {
    return a + timeLine.videoDuration;
  }, 0);
});

onMounted(() => {
  if (!relay.value) return;

  relayWidth.value = relay.value.clientWidth;
});

const fileInputHandler = (e: Event) => {
  if (!e.target) return;
  const file = e.target.files[0] as File;
  uploadAsset(file);
  videoLink.value = URL.createObjectURL(file);

  if (!video.value) return;
  video.value.load();
};

const loadedMetadataHandler = () => {
  if (!video.value) return;

  timeLines.value.push({
    video: video.value,
    videoDuration: video.value.duration,
    currentVideoDuration: video.value.duration,
    videoStartWith: 0,
  });
};

const videoPinMoveHandler = (xPos: number) => {
  if (!video.value) return;

  for (let i = 0; i < timeLines.value.length; i++) {
    const currentTime = timeLines.value[i].videoDuration * (xPos / 100);

    if (currentTime >= timeLines.value[i].currentVideoDuration) {
      video.value.currentTime = timeLines.value[i].currentVideoDuration;
      return;
    }

    if (currentTime <= timeLines.value[i].videoStartWith) {
      video.value.currentTime = timeLines.value[i].videoStartWith;
      return;
    }

    video.value.currentTime = currentTime;
  }
};

const videoPinAutoMoveHandler = async (xPos: number) => {
  if (!video.value) return;

  const currentTime = timeLineDuration.value * (xPos / 100);

  for (let i = 0; i < timeLines.value.length; i++) {
    if (
      currentTime <= timeLines.value[i].currentVideoDuration &&
      currentTime >= timeLines.value[i].videoStartWith
    ) {
      if (!video.value.paused) return;
      await video.value.play();
      return;
    }

    video.value.pause();
    preview.value = !preview.value;
  }
};

const timeLineChangeHandler = (
  timeLine: VideoNode,
  timeLineWidth: number,
  timeLinePosX: number
) => {
  const newVideoDurationProcent = (timeLineWidth + timeLinePosX) / 100;

  timeLine.currentVideoDuration =
    timeLine.videoDuration * newVideoDurationProcent;
  timeLine.videoStartWith = timeLine.videoDuration * (timeLinePosX / 100);
};

const previewHandler = () => {
  preview.value = !preview.value;
  if (!video.value || preview.value) return;

  video.value.pause();
};
</script>

<template>
  <div ref="workField" class="p-4 w-full h-screen bg-slate-900 overflow-hidden">
    <div class="h-full grid grid-rows-6 gap-4">
      <div class="flex gap-6 row-span-5">
        <aside class="w-[350px]">
          <div class="bg-slate-700 w-full p-4">
            <input @input="fileInputHandler" type="file" name="" id="" />
          </div>
        </aside>
        <div class="flex-1 flex justify-center">
          <div class="flex flex-col gap-2 items-center">
            <video
              @loadedmetadata="loadedMetadataHandler"
              :src="videoLink"
              ref="video"
              class="flex-1 w-4/5"
            ></video>
            <div
              @click="previewHandler"
              class="bg-yellow-500 text-white font-medium px-4 py-2 rounded-lg cursor-pointer"
            >
              Запустить
            </div>
          </div>
        </div>
      </div>
      <div ref="relay" class="h-[100px]">
        <div class="h-full">
          <div class="relative w-full z-10">
            <VideoPin
              @move="videoPinMoveHandler"
              @automove="videoPinAutoMoveHandler"
              :work-field="workField"
              :relay-width="relayWidth"
              :preview="preview"
              :time-line-duration="timeLineDuration"
            />
          </div>
          <div class="relative w-full h-1/2 bg-slate-800">
            <TimeLine
              v-for="timeLine in timeLines"
              @change="
                (timeLineWidth: number, timeLinePosX: number) =>
                  timeLineChangeHandler(timeLine, timeLineWidth, timeLinePosX)
              "
              :relay="relay"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
