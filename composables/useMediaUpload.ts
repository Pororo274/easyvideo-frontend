interface UploadChunkRequestBody {
  chunk: Blob;
  media_uuid: string;
  original_name: string;
  last: boolean;
  project_id: number;
}

interface Mediafile {
  mediaUuid: string;
  file: File;
}

export const useMediaUpload = () => {
  const chunkSize = 1 * 1024 * 1024

  const { $api } = useNuxtApp()
  const mediafiles = useState<Mediafile[]>("mediafiles", () => [])
  const uploadingMediafile = useState<Mediafile | null>("uploadingMediafile", () => null)
  const { project } = useProject()

  watchEffect(async () => {
    if (!mediafiles.value.length || uploadingMediafile.value) return
      uploadingMediafile.value = mediafiles.value[0]
      await uploadMediafileByChunks(uploadingMediafile.value)
      uploadingMediafile.value = null;
      mediafiles.value = [...mediafiles.value.slice(1)]
  })

  const addMediafiles = (...newMedifiles: Mediafile[]) => {
    mediafiles.value = [...mediafiles.value, ...newMedifiles]
  }

  const uploadMediafileByChunks = async (media: Mediafile) => {
    const totalChunks = Math.ceil(media.file.size / chunkSize)
    let data: any = {}
    

    for (let i = 0; i < totalChunks; i++) {
      const chunk = media.file.slice(chunkSize * i, Math.min((i + 1) * chunkSize, media.file.size), media.file.type)

      //TODO: exception handler
      data = await uploadChunk({
        chunk,
        media_uuid: media.mediaUuid,
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

  return {
    addMediafiles
  }
}