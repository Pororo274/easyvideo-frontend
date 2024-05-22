import { v4 } from "uuid";
import { MediaStatus } from "~/enums/media/media-status.interface";
import type { Media } from "~/interfaces/editor/media.interface"


export const useMedias = () => {
  const { addMediafiles } = useMediaUpload()

  const medias = useState<Media[]>("medias", () => [])
  const allowedTypes = ["video/mp4", "image/png", "image/jpeg"]

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

  const setMedias = (...newMedias: Media[]) => {
    medias.value = newMedias
  }

  const addFromFiles = (...files: File[]) => {
    const addFromFilesAsync = async (...files: File[]) => {
      for (let i = 0; i < files.length; i++) {
        if (!allowedTypes.find(x => x === files[i].type) ) continue;

        const file = files[i]
        const objectURL = URL.createObjectURL(file)
        
        const uuid = v4()
        const status = MediaStatus.NOT_UPLOADED

        addMediafiles({
          mediaUuid: uuid,
          file: file
        })

        medias.value = [...medias.value , {
          originalName: file.name,
          uuid,
          type: file.type,
          status,
          objectURL,
        }];
      }
    }

    addFromFilesAsync(...files).then();
  }

  const findMediaByUuid = (uuid: string) => {
    const media = medias.value.find(x => x.uuid === uuid);
    if (!media) throw new Error('Not found media with this uuid');

    return media
  }

  const getObjectURLByUuid = (uuid: string) => {
    return findMediaByUuid(uuid).objectURL;
  }

  const getOriginalNameByUuid = (uuid: string) => {
    return findMediaByUuid(uuid).originalName;
  }

  return {
    medias: readonly(medias),
    addFromFiles,
    allowedTypesString,
    updateMediaStatusByUuid,
    setMedias,
    getObjectURLByUuid,
    getOriginalNameByUuid
  }
}