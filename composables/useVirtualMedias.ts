import type { FilterName } from "~/enums/editor/filter-name.enum";
import type { FilterList, VirtualMedia } from "~/interfaces/editor/virtual-media.interface";
import type { Filter } from "~/interfaces/filters/filter.interface";
import type { OverlayFilter } from "~/interfaces/filters/overlay-filter.interface";

export const useVirtualMedias = () => {
  const virtualMedias = useState<VirtualMedia[]>("virtualMedias", () => []);

  const totalLayers = computed(() => {
    const copyVirtualMedias = [...virtualMedias.value]
    copyVirtualMedias.sort((mediaA, mediaB) => -(mediaA.layer - mediaB.layer))

    return copyVirtualMedias[0]?.layer || 0
  })

  const longestLayerTime = computed(() => {
    const layersTimes = virtualMedias.value.map(x => {
      if (x.filters.OverlayFilter) {
        return (x.filters.OverlayFilter as OverlayFilter).time.duration + (x.filters.OverlayFilter as OverlayFilter).time.delay
      }
      return 0
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

  const updateOrAddFilterByUuid = <T>(uuid: string, { name, filter }: { name: FilterName, filter: T }) => {
    virtualMedias.value = virtualMedias.value.map((media) => {
      if (media.uuid === uuid) {
        const { filters, ...other } = media
        filters[name] = (filter as Filter)

        return {
          ...other,
          filters
        }
      }
      return media
    })
  }

  const getFilterByUuidAndName = <T>(uuid: string, name: FilterName) => {
    const media = virtualMedias.value.find(x => x.uuid === uuid)

    if (!media) throw new Error()
    return media.filters[name] as T
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
    getFilterByUuidAndName,
    clear,
    updateOrAddFilterByUuid,
    updateLayerByUuid,
    getFilterListByUuid,
    setFilterListByUuid,
    mapFilterList
  }
}