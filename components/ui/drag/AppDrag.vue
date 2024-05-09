<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    initYPos?: number;
    initXPos?: number;
    deltaXIgnore?: number;
    deltaYIgnore?: number;
    selfDrag?: boolean;
  }>(),
  {
    initYPos: 0,
    initXPos: 0,
    deltaXIgnore: 0,
    deltaYIgnore: 0,
    selfDrag: true,
  }
);

const emit = defineEmits<{
  down: [];
  up: [];
  move: [deltaX: number, deltaY: number];
}>();

const dXFromStart = ref(0);
const dYFromStart = ref(0);
const initXPos = ref(props.initXPos);
const initYPos = ref(props.initYPos);
const xPos = ref(props.initXPos);
const yPos = ref(props.initYPos);

const updatePosition = (deltaX: number, deltaY: number) => {
  dYFromStart.value += deltaY;
  dXFromStart.value += deltaX;

  xPos.value =
    props.deltaXIgnore > Math.abs(dXFromStart.value)
      ? initXPos.value
      : initXPos.value + dXFromStart.value;
  yPos.value =
    props.deltaYIgnore > Math.abs(dYFromStart.value)
      ? initYPos.value
      : initYPos.value + dYFromStart.value;
};

const refreshInitPosition = () => {
  dYFromStart.value = 0;
  dXFromStart.value = 0;
  initXPos.value = xPos.value;
  initYPos.value = yPos.value;
};

const onMove = ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
  if (props.selfDrag) {
    updatePosition(deltaX, deltaY);
  }

  emit("move", deltaX, deltaY);
};

const onUp = () => {
  if (props.selfDrag) {
    xPos.value = yPos.value === props.initYPos ? xPos.value : initXPos.value;
    yPos.value = props.initYPos;

    refreshInitPosition();
  }
  emit("up");
};

const onDown = () => {
  emit("down");
};

const initDrag = useDrag({
  onMove,
  onUp,
  onDown,
});

const virtualMediaStyle = computed(() => ({
  transform: `translate(${xPos.value}px, ${yPos.value}px)`,
}));

provide("appDrag", {
  updatePosition,
  refreshInitPosition,
});
</script>

<template>
  <div @pointerdown="initDrag" :style="virtualMediaStyle">
    <slot></slot>
  </div>
</template>
