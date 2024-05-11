import type { VirtualImage } from "~/interfaces/editor/virtual-image.interface";
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

export const useTimeLine = () => {
  const { LAYER_HEIGHT, LAYER_GAP } = useConstants()
  const timeLineWidth = useState<number>("timeLineWidth", () => 0)
  const pxPerSecond = useState<number>("pexPerSecond", () => 0)
  const updateTimeLineWidth = (newWidth: number) => {
    timeLineWidth.value = newWidth
  }

  const { totalLayers, virtualMedias, longestLayerTime } = useVirtualMedias()

  const yPositionsLayers = computed(() => {
    const positions: number[] = []

    const layersCount = totalLayers.value < virtualMedias.value.length ? totalLayers.value + 1 : totalLayers.value

    for (let i = 0; i < layersCount; i++) {
      positions.push(LAYER_HEIGHT / 2 + (i * (LAYER_HEIGHT + LAYER_GAP)))
    } 

    return positions
  })

  watchEffect(() => {
    if (timeLineWidth.value > longestLayerTime.value * pxPerSecond.value) return

    updateTimeLineWidth(longestLayerTime.value * pxPerSecond.value)
  })

  watch(virtualMedias, (newVirtualMedias) => {
    const virtualMedia = newVirtualMedias[0]

    pxPerSecond.value = timeLineWidth.value / virtualMedia.duration
  }, { once: true })

  const pinCurrentTime = useState<number>("pinCurrentTime", () => 0)

  const setPinCurrentTime = (xPos: number) => {
    pinCurrentTime.value = xPos / pxPerSecond.value
  }

  return {
    updateTimeLineWidth,
    timeLineWidth: readonly(timeLineWidth),
    yPositionsLayers,
    pxPerSecond: readonly(pxPerSecond),
    setPinCurrentTime,
    pinCurrentTime: readonly(pinCurrentTime)
  }
}