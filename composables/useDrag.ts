interface OnMoveEvent {
  e: PointerEvent,
  deltaX: number
  deltaY: number
}

interface Handlers {
  onMove?(event: OnMoveEvent): void
  onDown?(): void
  onUp?(): void
}

export const useDrag = (handlers: Handlers) => {
  const initDrag = (e: PointerEvent) => {
    let lastPointerPosX = e.pageX
    let lastPointerPosY = e.pageY

    let deltaX = 0
    let deltaY = 0

    const onPointerMove = (e: PointerEvent) => {
      deltaX = e.pageX - lastPointerPosX;
      deltaY = e.pageY - lastPointerPosY
  
      lastPointerPosX = e.pageX;
      lastPointerPosY = e.pageY;
      if (!handlers.onMove) return

      handlers.onMove({
        e,
        deltaX,
        deltaY
      })
    };
    
    const onPointerUp = () => {
      lastPointerPosX = 0;
      lastPointerPosY = 0;
      if (!handlers.onUp) return

      handlers.onUp()
      document.body.removeEventListener("pointermove", onPointerMove);
    };
  
    document.body.addEventListener("pointermove", onPointerMove);
    document.body.addEventListener("pointerup", onPointerUp);
    if (!handlers.onDown) return

    handlers.onDown()
  };


  return initDrag
}