import type { Time } from "~/interfaces/coordinate/time.interface";
import type { FilterList, VirtualMedia } from "~/interfaces/editor/virtual-media.interface";

export const useVirtualMedias = () => {
  const virtualMedias = useState<VirtualMedia[]>("virtualMedias", () => []);

  const totalLayers = computed(() => {
    const copyVirtualMedias = [...virtualMedias.value]
    copyVirtualMedias.sort((mediaA, mediaB) => -(mediaA.layer - mediaB.layer))

    return copyVirtualMedias[0]?.layer || 0
  })

  const longestLayerTime = computed(() => {
    const layersTimes = virtualMedias.value.map(x => {
      return (x.filters.time as Time).duration + (x.filters.time as Time).delay
    })
    const copyLayersTimes = [...layersTimes]
    
    copyLayersTimes.sort((width1, width2) => {
      return -(width1 - width2)
    })

    return copyLayersTimes[0] || 0
  })

  const setVirtualMedias = (newVirtualMedias: VirtualMedia[]) => {
    virtualMedias.value = newVirtualMedias;
  }


  const addVirtualMedia = (media: VirtualMedia) => {
    virtualMedias.value = [...virtualMedias.value, media]
  }

  const getVirtualMediasByLayer = (layer: number) => {
    return virtualMedias.value.filter(x => x.layer === layer)
  }

  const updateLayerByUuid = (uuid: string, newLayer: number) => {
    virtualMedias.value = virtualMedias.value.map((media) => {
      if (media.uuid === uuid) {
        const { layer, ...other } = media

        return {
          ...other,
          layer: newLayer
        }
      }
      return media
    })
  }

  const updateContentByUuid = (uuid: string, newContent: string) => {
    virtualMedias.value = virtualMedias.value.map((media) => {
      if (media.uuid === uuid) {
        const { content, ...other } = media

        return {
          ...other,
          content: newContent
        }
      }
      return media
    })
  }

  const clear = () => {
    virtualMedias.value = []
  }


  const getFilterListByUuid = (uuid: string) => {
    const vm = virtualMedias.value.find(x => x.uuid === uuid);

    if (!vm) throw new Error('Cannot found virtual medil');

    return Object.assign({}, vm.filters);
  }

  const setFilterListByUuid = (uuid: string, newFilterList: FilterList) => {
    virtualMedias.value = virtualMedias.value.map((media) => {
      if (media.uuid === uuid) {
        const { filters, ...other } = media

        return {
          ...other,
          filters: newFilterList
        }
      }
      return media
    })
  }

  const mapFilterList = (uuid: string, callback: (filters: FilterList) => FilterList) => {
    const filters = getFilterListByUuid(uuid);
    setFilterListByUuid(uuid, callback(filters));
  }

  return {
    virtualMedias: readonly(virtualMedias),
    totalLayers,
    getVirtualMediasByLayer,
    addVirtualMedia,
    longestLayerTime,
    setVirtualMedias,
    clear,
    updateLayerByUuid,
    mapFilterList,
    updateContentByUuid
  }
}