import type { Media } from "~/interfaces/editor/media.interface"
import type { VirtuaImage } from "~/interfaces/editor/virtual-image.interface";
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

export const useMedias = () => {
  const { totalLayers } = useVirtualMedias()

  const medias = useState<Media[]>("medias", () => [])
  const allowedTypes = ["video/mp4", "image/png", "image/jpeg"]
  const imageAllowedTypes = ["image/png", "image/jpeg"]

  const allowedTypesString = allowedTypes
                              .slice(1)
                              .reduce((a, c) => `${a}, ${c}`, allowedTypes[0]);


  const getVideoDuration = async (objectURL: string) => new Promise<number>((resolve) => {
    const video = document.createElement('video')
    video.addEventListener('loadedmetadata', () => {
      resolve(video.duration)
    })

    video.src = objectURL
  }) 

  const addFromFiles = (...files: File[]) => {
    const addFromFilesAsync = async (...files: File[]) => {
      for (let i = 0; i < files.length; i++) {
        if (!allowedTypes.find(x => x === files[i].type) ) continue;

        const file = files[i]
        const objectURL = URL.createObjectURL(file)
        
       

        if (file.type === 'video/mp4') {
          const originalDuration = await getVideoDuration(objectURL)

          medias.value.push({
            file,
            objectURL,
            toVirtualMedia(): VirtualVideo {
              return {
                objectURL: this.objectURL,
                originalDuration,
                getContent() {
                  return this.objectURL
                },
                getName() {
                  return file.name
                },
                layer: totalLayers.value + 1,
                globalStartTime: 0,
                duration: originalDuration
              }
            }
          });
        }

        if (imageAllowedTypes.find(x => file.type === x)) {
          medias.value.push({
            file,
            objectURL,
            toVirtualMedia(): VirtuaImage {
              return {
                objectURL: this.objectURL,
                getContent() {
                  return this.objectURL
                },
                getName() {
                  return file.name
                },
                layer: totalLayers.value + 1,
                globalStartTime: 0,
                duration: 10
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
    allowedTypesString
  }
}