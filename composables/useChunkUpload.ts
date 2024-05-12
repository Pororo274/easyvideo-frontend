import { MediaStatus } from "~/enums/media/media-status.interface";
import type { Media } from "~/interfaces/editor/media.interface";

interface UploadChunkRequestBody {
  chunk: Blob;
  media_uuid: string;
  original_name: string;
  last: boolean;
  project_id: number;
}

export const useChunkUpload = () => {
  const chunkSize = 1 * 1024 * 1024

  const { medias, updateMediaStatusByUuid } = useMedias()
  const { project } = useProject()
  const { $api } = useNuxtApp()

  const notUploadedMedias = computed(() => medias.value.filter(media => media.status === MediaStatus.NOT_UPLOADED))

  watch(notUploadedMedias, async (newNotUploadedMedias) => {
    if (!newNotUploadedMedias.length) return
    const media = newNotUploadedMedias[0]

    await uploadMedia(media)
    updateMediaStatusByUuid(media.uuid, MediaStatus.UPLOADED)
  })

  const uploadMedia = async (media: Media) => {
    const totalChunks = Math.ceil(media.file.size / chunkSize)
    let data: any = {}
    

    for (let i = 0; i < totalChunks; i++) {
      const chunk = media.file.slice(chunkSize * i, Math.min((i + 1) * chunkSize, media.file.size), media.file.type)

      //TODO: exception handler
      data = await uploadChunk({
        chunk,
        media_uuid: media.uuid,
        original_name: media.file.name,
        project_id: project.value.id,
        last: i + 1 === totalChunks
      })
    }
  }

  const uploadChunk = async (requestBody: UploadChunkRequestBody) => {
    const formData = new FormData();
    formData.append('chunk', requestBody.chunk, requestBody.original_name)
    formData.append('media_uuid', requestBody.media_uuid);
    formData.append('project_id', requestBody.project_id + '');
    formData.append('original_name', requestBody.original_name)
    formData.append('last', (+requestBody.last) + '')

    return $api('/media/chunk', {
      method: 'POST',
      body: formData
    })
  }
}