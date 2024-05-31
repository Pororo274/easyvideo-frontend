import { v4 } from "uuid"
import { FilterName } from "~/enums/editor/filter-name.enum"
import { ContentType } from "~/enums/virtual-media/content-type.enum"
import type { Time } from "~/interfaces/coordinate/time.interface"
import type { Media } from "~/interfaces/editor/media.interface"
import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface"

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

  const createVirtualImage = async (media: Media): Promise<VirtualMedia> => {
    const uuid = v4()
    const metadata = await getImageMetadata(media.objectURL)
    return {
      uuid,
      layer: totalLayers.value + 1,
      content: media.uuid,
      contentType: ContentType.Image,
      filters: {
        [FilterName.OverlayFilter]: { 
          position: {
            x: 0,
            y: 0
          },
          time: {
            startFrom: 0,
            duration: 6,
            delay: 0
          } as Time
        },
        [FilterName.ScaleFilter]: {
          size: {
            width: metadata.width,
            height: metadata.height
          }
        },
      }
    }
  }

  const createVirtualVideo = async (media: Media): Promise<VirtualMedia> => {
    const uuid = v4()
    const metadata = await getVideoMetadata(media.objectURL)
    return {
      uuid,
      layer: totalLayers.value + 1,
      content: media.uuid,
      contentType: ContentType.Video,
      filters: {
        [FilterName.OverlayFilter]: { 
          position: {
            x: 0,
            y: 0
          },
          time: {
            startFrom: 0,
            duration: metadata.duration,
            delay: 0
          } as Time
        },
        [FilterName.ScaleFilter]: {
          size: {
            width: metadata.width,
            height: metadata.height
          }
        },
        [FilterName.TrimFilter]: {
          time: {
            startFrom: 0,
            duration: metadata.duration,
            delay: 0
          } as Time
        }
      }
    }
  }

  return {
    createVirtualMedia
  }
} 