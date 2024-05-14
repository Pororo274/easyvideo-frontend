import { v4 } from "uuid"
import type { Media } from "~/interfaces/editor/media.interface"
import type { VirtualImage } from "~/interfaces/editor/virtual-image.interface"
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface"
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface"

export const useVirtualMediaFactory = () => {
  const videoTypes = ['video/mp4']
  const imageTypes = ['image/jpeg', 'image/png']

  const { totalLayers } = useVirtualMedias()
  const { getVideoMetadata, getImageMetadata } = useMediaMetadata()

  const isCorrectType = (type: string, types: string[]) => types.find(x => x === type) 

  const createVirtualMedia = async (media: Media): Promise<VirtualMedia> => {
    if (isCorrectType(media.type, videoTypes)) {
      return createVirtualVideo(media)
    }

    return createVirtualImage(media)
  }

  const createVirtualImage = async (media: Media): Promise<VirtualImage> => {
    const id = v4()
    const metadata = await getImageMetadata(media.objectURL)
    return {
      id,
      objectURL: media.objectURL,
      content: media.objectURL,
      layer: totalLayers.value + 1,
      globalStartTime: 0,
      duration: 10,
      startTime: 0,
      originalWidth: metadata.width,
      originalHeight: metadata.height,
      name: media.originalName,
      mediaUuid: media.uuid
    }
  }

  const createVirtualVideo = async (media: Media): Promise<VirtualVideo> => {
    const id = v4()
    const metadata = await getVideoMetadata(media.objectURL)
    return {
      id,
      objectURL: media.objectURL,
      originalDuration: metadata.duration,
      originalHeight: metadata.height,
      originalWidth: metadata.width,
      content: media.objectURL,
      layer: totalLayers.value + 1,
      globalStartTime: 0,
      duration: metadata.duration,
      startTime: 0,
      name: media.originalName,
      mediaUuid: media.uuid
    }
  }

  return {
    createVirtualMedia
  }
} 