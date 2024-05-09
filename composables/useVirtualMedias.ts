import type { Media } from "~/interfaces/editor/media.interface";
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

export const useVirtualMedias = () => {
  const virtualMedias = useState<VirtualMedia[]>("virtualMedias", () => []);

  const totalLayers = computed(() => {
    const copyVirtualMedias = [...virtualMedias.value]
    copyVirtualMedias.sort((mediaA, mediaB) => -(mediaA.layer - mediaB.layer))

    return copyVirtualMedias[0]?.layer || 0
  })

  const addVirtualMedia = (media: VirtualMedia) => {
    virtualMedias.value.push(media)
  }

  const getVirtualMediasByLayer = (layer: number) => {
    return virtualMedias.value.filter(x => x.layer === layer)
  }

  return {
    virtualMedias: readonly(virtualMedias),
    totalLayers,
    getVirtualMediasByLayer,
    addVirtualMedia
  }
}