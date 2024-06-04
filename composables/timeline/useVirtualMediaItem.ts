import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";

interface VirtualMediaItemProvide {
  duration: ComputedRef<number>;
  startTime: ComputedRef<number>;
  globalStartTime: ComputedRef<number>;
  setVirtualMediaWidth: (newWidth: number) => void;
  setXMargin: (newXMargin: number) => void;
  setXPos: (newXPos: number) => void;
  virtualMedia: Readonly<Ref<VirtualMedia>>
}

export const useVirtualMediaItem = () => {
  const { duration, startTime, globalStartTime, setVirtualMediaWidth, setXMargin, setXPos, virtualMedia } = inject("virtualMediaItem") as VirtualMediaItemProvide

  return {
    duration,
    startTime,
    globalStartTime,
    setVirtualMediaWidth,
    setXMargin,
    setXPos,
    virtualMedia
  };
}