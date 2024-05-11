import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";

export const useVirtualMedias = () => {
  const virtualMedias = useState<VirtualMedia[]>("virtualMedias", () => []);

  const totalLayers = computed(() => {
    const copyVirtualMedias = [...virtualMedias.value]
    copyVirtualMedias.sort((mediaA, mediaB) => -(mediaA.layer - mediaB.layer))

    return copyVirtualMedias[0]?.layer || 0
  })

  const longestLayerTime = computed(() => {
    const layersTimes = virtualMedias.value.map(x => x.duration + x.globalStartTime)
    const copyLayersTimes = [...layersTimes]
    
    copyLayersTimes.sort((width1, width2) => {
      return -(width1 - width2)
    })

    return layersTimes[0] || 0
  })

  const addVirtualMedia = (media: VirtualMedia) => {
    virtualMedias.value = [...virtualMedias.value, media]
  }

  const getVirtualMediasByLayer = (layer: number) => {
    return virtualMedias.value.filter(x => x.layer === layer)
  }

  const updateDurationById = (id: string, newDuration: number) => {
    virtualMedias.value = virtualMedias.value.map((media) => {
      if (media.id === id) {
        const { duration, ...other } = media
        return {
          ...other,
          duration: newDuration
        }
      }
      return media
    })
  }

  const updateGlobalStartTimeById = (id: string, newGlobalStartTime: number) => {
    virtualMedias.value = virtualMedias.value.map((media) => {
      if (media.id === id) {
        const { globalStartTime, ...other } = media
        return {
          ...other,
          globalStartTime: newGlobalStartTime < 0 ? 0 : newGlobalStartTime
        }
      }
      return media
    })
  }

  const updateStartTimeById = (id: string, newStartTime: number) => {
    virtualMedias.value = virtualMedias.value.map((media) => {
      if (media.id === id) {
        const { startTime, ...other } = media
        return {
          ...other,
          startTime: newStartTime < 0 ? 0 : newStartTime
        }
      }
      return media
    })
  }

  const updateLayerById = (id: string, newLayer: number) => {
    virtualMedias.value = virtualMedias.value.map((media) => {
      if (media.id === id) {
        const { layer, ...other } = media
        return {
          ...other,
          layer: newLayer
        }
      }
      return media
    })
  }

  return {
    virtualMedias: readonly(virtualMedias),
    totalLayers,
    getVirtualMediasByLayer,
    addVirtualMedia,
    updateDurationById,
    updateGlobalStartTimeById,
    updateStartTimeById,
    longestLayerTime,
    updateLayerById
  }
}