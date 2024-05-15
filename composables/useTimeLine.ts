export const useTimeLine = () => {
  const { LAYER_HEIGHT, LAYER_GAP } = useConstants()
  const timeLineWidth = useState<number>("timeLineWidth", () => 0)
  const startTimeLineWidth = useState("startTimeLineWidth", () => 0)
  const pxPerSecond = useState<number>("pexPerSecond", () => 0)
  const updateTimeLineWidth = (newWidth: number) => {
    timeLineWidth.value = newWidth
  }

  const setStartTimeLineWidth = (width: number) => {
    startTimeLineWidth.value = width
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
    if (longestLayerTime.value * pxPerSecond.value <= timeLineWidth.value) return

    timeLineWidth.value = longestLayerTime.value * pxPerSecond.value
  })

  watch(virtualMedias, (newVirtualMedias) => {
    const virtualMedia = newVirtualMedias[0]

    pxPerSecond.value = startTimeLineWidth.value / virtualMedia.duration
  }, { once: true })

  const pinCurrentTime = computed(() => pinXPos.value / pxPerSecond.value)
  const pinXPos = useState("pinXPos", () => 0)

  const setPinXPos = (newPinXPos: number) => {
    pinXPos.value = newPinXPos
  }

  const isAutoplay = useState("isAutoplay", () => false)
  const startAutoPlay = () => {
    isAutoplay.value = true
  }

  const stopAutoPlay = () => {
    isAutoplay.value = false
  }

  return {
    updateTimeLineWidth,
    timeLineWidth: readonly(timeLineWidth),
    yPositionsLayers,
    pxPerSecond: readonly(pxPerSecond),
    pinCurrentTime,
    setStartTimeLineWidth,
    setPinXPos,
    startAutoPlay,
    stopAutoPlay,
    isAutoplay: readonly(isAutoplay),
  }
}