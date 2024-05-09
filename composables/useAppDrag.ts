interface AppDragProvide {
  updatePosition(deltaX: number, deltaY: number): void
  refreshInitPosition(): void
}

export const useAppDrag = () => {
  const { updatePosition, refreshInitPosition } = inject("appDrag") as AppDragProvide;

  return {
    updatePosition,
    refreshInitPosition
  }
}