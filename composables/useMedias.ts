import { v4 } from "uuid";
import { MediaStatus } from "~/enums/media/media-status.interface";
import type { Media } from "~/interfaces/editor/media.interface"
import type { VirtualImage } from "~/interfaces/editor/virtual-image.interface";
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";


export const useMedias = () => {
  const { totalLayers } = useVirtualMedias()
  const { getVideoMetadata, getImageMetadata } = useMediaMetadata()

  const medias = useState<Media[]>("medias", () => [])
  const allowedTypes = ["video/mp4", "image/png", "image/jpeg"]
  const imageAllowedTypes = ["image/png", "image/jpeg"]

  const allowedTypesString = allowedTypes
                              .slice(1)
                              .reduce((a, c) => `${a}, ${c}`, allowedTypes[0]);

  const updateMediaStatusByUuid = (uuid: string, newStatus: MediaStatus) => {
    medias.value = medias.value.map(media => {
      if (media.uuid === uuid) {
        const { status, ...other } = media
        return {
          status: newStatus,
          ...other
        }
      }
      return media;
    })
  }


  const addFromFiles = (...files: File[]) => {
    const addFromFilesAsync = async (...files: File[]) => {
      for (let i = 0; i < files.length; i++) {
        if (!allowedTypes.find(x => x === files[i].type) ) continue;

        const file = files[i]
        const objectURL = URL.createObjectURL(file)
        
        const uuid = v4()
        const status = MediaStatus.NOT_UPLOADED

        if (file.type === 'video/mp4') {
          const data = await getVideoMetadata(objectURL)

          medias.value = [...medias.value , {
            file,
            uuid,
            status,
            objectURL,
            toVirtualMedia(): VirtualVideo {
              const id = v4()

              return {
                id,
                objectURL: this.objectURL,
                originalDuration: data.duration,
                originalHeight: data.height,
                originalWidth: data.width,
                getContent() {
                  return this.objectURL
                },
                getName() {
                  return file.name
                },
                layer: totalLayers.value + 1,
                globalStartTime: 0,
                duration: data.duration,
                startTime: 0
              }
            }
          }];
        }

        if (imageAllowedTypes.find(x => file.type === x)) {
          const data = await getImageMetadata(objectURL)

          medias.value.push({
            file,
            uuid,
            status,
            objectURL,
            toVirtualMedia(): VirtualImage {
              const id = v4()
              return {
                id,
                objectURL: this.objectURL,
                getContent() {
                  return this.objectURL
                },
                getName() {
                  return file.name
                },
                layer: totalLayers.value + 1,
                globalStartTime: 0,
                duration: 10,
                startTime: 0,
                originalWidth: data.width,
                originalHeight: data.height
              }
            }
          })
        }
      }
    }

    addFromFilesAsync(...files).then();
  }

  return {
    medias: readonly(medias),
    addFromFiles,
    allowedTypesString,
    updateMediaStatusByUuid
  }
}