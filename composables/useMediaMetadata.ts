interface VideoData {
  duration: number;
  height: number;
  width: number
}

interface ImageData {
  width: number;
  height: number
}

export const useMediaMetadata = () => {
  const getVideoMetadata = async (objectURL: string) => new Promise<VideoData>((resolve) => {
    const video = document.createElement('video')
    video.addEventListener('loadedmetadata', () => {
      resolve({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight
      })
    })

    video.src = objectURL
  })

  const getImageMetadata = async (objectURL: string) => new Promise<ImageData>((resolve) => {
    const img = new Image()
    img.addEventListener('load', () => {
      resolve({
        width: img.width,
        height: img.height
      })
    })

    img.src = objectURL
  })

  return {
    getVideoMetadata,
    getImageMetadata
  }
}