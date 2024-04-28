import { v4 } from 'uuid'

interface UploadChunkRequestBody {
  chunk: Blob;
  clientId: string;
  originalFileName: string
}

export const useAssetUpload = () => {
  const chunkSize = 5 * 1024 * 1024
  
  const uploadAsset = async (file: File) => {
    const totalChunks = Math.ceil(file.size / chunkSize)
    const clientId = v4()

    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(chunkSize * i, (i + 1) * chunkSize)

      await uploadChunk({
        chunk,
        clientId,
        originalFileName: file.name
      })
    }
  }

  const uploadChunk = async (requestBody: UploadChunkRequestBody) => {
    const formData = new FormData();
    formData.append('chunk', requestBody.chunk, requestBody.originalFileName)
    formData.append('clientId', requestBody.clientId)

    await $fetch('http://localhost:8000/api/videos/chunk', {
      method: 'post',
      body: formData
    })
  }

  return {
    uploadAsset
  }
}