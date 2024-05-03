import { v4 } from 'uuid'

interface UploadChunkRequestBody {
  chunk: Blob;
  clientId: string;
  originalFileName: string
}

export const useAssetUpload = () => {
  const chunkSize = 1 * 1024 * 1024 
  
  const uploadAsset = async (file: File) => {
    const totalChunks = Math.ceil(file.size / chunkSize)
    const clientId = v4()
    let data: any = {}

    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(chunkSize * i, Math.min((i + 1) * chunkSize, file.size), file.type)

      data = await uploadChunk({
        chunk,
        clientId,
        originalFileName: file.name
      })
    }
    
    return data
  }

  const uploadChunk = async (requestBody: UploadChunkRequestBody) => {
    const formData = new FormData();
    console.log(requestBody.originalFileName)
    formData.append('chunk', requestBody.chunk, requestBody.originalFileName)
    formData.append('clientId', requestBody.clientId)

    return $fetch('http://localhost:8000/api/videos/chunk', {
      method: 'post',
      body: formData
    })
  }

  return {
    uploadAsset
  }
}