interface AppDragProvide {
  updatePosition(deltaX: number, deltaY: number): void
  readonly xPos: Ref<number>;
  readonly yPos: Ref<number>
}

export const useAppDrag = () => {
  const { updatePosition, xPos, yPos } = inject("appDrag") as AppDragProvide;

  return {
    updatePosition,
    xPos,
    yPos
  }
}