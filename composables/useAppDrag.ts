interface AppDragProvide {
  updatePosition(deltaX: number, deltaY: number): void
}

export const useAppDrag = () => {
  const { updatePosition } = inject("appDrag") as AppDragProvide;

  return {
    updatePosition
  }
}