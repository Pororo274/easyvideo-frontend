<script setup lang="ts">
interface Position {
  x: number;
  y: number;
}

interface OnMoveEvent {
  deltaX: number;
  deltaY: number;
  xPos: number;
  yPos: number;
}

interface TeleportEvent {
  yPos: number;
}

const props = withDefaults(
  defineProps<{
    initYPos?: number;
    initXPos?: number;
    deltaXIgnore?: number;
    deltaYIgnore?: number;
    selfDrag?: boolean;
    yTeleports?: number[];
    minX?: number;
    axis?: "x" | "y";
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
  move: [event: OnMoveEvent];
  teleport: [event: TeleportEvent];
}>();

const dXFromStart = ref(0);
const dYFromStart = ref(0);
const initXPos = ref(props.initXPos);
const initYPos = ref(props.initYPos);
const xPos = ref(props.initXPos);
const yPos = ref(props.initYPos);

const axisHandle = (axis: "x" | "y", callback: () => void) => {
  if (!props.axis) callback();
  if (axis === props.axis) callback();
};

const updatePosition = (deltaX: number, deltaY: number) => {
  dYFromStart.value += deltaY;
  dXFromStart.value += deltaX;

  axisHandle("x", () => {
    let newXPos = initXPos.value + dXFromStart.value;

    if (props.minX || props.minX === 0) {
      newXPos = newXPos > props.minX ? newXPos : props.minX;
    }

    xPos.value =
      props.deltaXIgnore > Math.abs(dXFromStart.value)
        ? initXPos.value
        : newXPos;
  });

  axisHandle("y", () => {
    yPos.value =
      props.deltaYIgnore > Math.abs(dYFromStart.value)
        ? initYPos.value
        : initYPos.value + dYFromStart.value;
  });
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

  emit("move", {
    deltaX,
    deltaY,
    xPos: xPos.value,
    yPos: yPos.value,
  });
};

const setPosition = (position: Position) => {
  xPos.value = position.x;
  yPos.value = position.y;
  refreshInitPosition();
};

const item = ref<HTMLDivElement>();

const teleport = () => {
  if (!item.value) return;
  if (!props.yTeleports) return;

  const halfItemHeight = item.value.clientHeight / 2;
  const itemYCenter = yPos.value + halfItemHeight;
  const copyYTeleports = [...props.yTeleports];

  +copyYTeleports.sort(
    (y1, y2) => Math.abs(y1 - itemYCenter) - Math.abs(y2 - itemYCenter)
  );

  const newYPos = copyYTeleports[0];

  setPosition({
    x: xPos.value,
    y: newYPos - halfItemHeight,
  });

  emit("teleport", {
    yPos: newYPos,
  });
  return true;
};

const onUp = () => {
  teleport();
  refreshInitPosition();
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
  updatePosition(deltaX: number, deltaY: number) {
    updatePosition(deltaX, deltaY);
    refreshInitPosition();
  },
  xPos: readonly(xPos),
  yPos: readonly(yPos),
});
</script>

<template>
  <div
    @pointerdown="initDrag"
    @dragstart.prevent
    :style="virtualMediaStyle"
    ref="item"
  >
    <slot></slot>
  </div>
</template>
