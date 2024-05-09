interface LayerLine {
  yPos: number;
  isActive: boolean;
  layer: number;
}

export const useTimeLine = () => {
  const timeLineWidth = useState<number>("timeLineWidth", () => 0)
  const updateTimeLineWidth = (newWidth: number) => {
    timeLineWidth.value = newWidth
  }

  const { totalLayers } = useVirtualMedias();

  const layerHeight = ref(52)
  const layerLines = useState<LayerLine[]>("layerLines", () => [])

  const setLayerLines = (newLayerLines: LayerLine[]) => {
    layerLines.value = newLayerLines
  }

  watch(totalLayers, newTotalLayers => {
    const items = []

    for (let i = 0; i < newTotalLayers; i++) {
      items.push({
        layer: i + 1,
        yPos: i * (layerHeight.value + 8) - 4,
        isActive: false
      })
    }

    setLayerLines(items)
  })

  const setIsActiveLayerLineByYPos = (yPos: number) => {
    const copyLayerLines = [...layerLines.value]
    layerLines.value = copyLayerLines.map(x => {
      if (x.yPos === yPos) {
        return {
          yPos,
          layer: x.layer,
          isActive: true
        }
      }
      return {
        yPos: x.yPos,
        layer: x.layer,
        isActive: false
      }
    })
  }

  return {
    updateTimeLineWidth,
    layerLines: readonly(layerLines),
    setIsActiveLayerLineByYPos,
    timeLineWidth: readonly(timeLineWidth)
  }
}