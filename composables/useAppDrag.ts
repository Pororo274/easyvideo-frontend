interface AppDragProvide {
  updatePosition(deltaX: number, deltaY: number): void
  setPosition({ x, y }: { x: number, y: number }): void;
  readonly xPos: Ref<number>;
  readonly yPos: Ref<number>
}

export const useAppDrag = () => {
  const { updatePosition, setPosition, xPos, yPos } = inject("appDrag") as AppDragProvide;

  return {
    updatePosition,
    xPos,
    yPos,
    setPosition
  }
}