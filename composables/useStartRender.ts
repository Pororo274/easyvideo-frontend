import type { Media } from "~/interfaces/media.interface";
import type { VideoNode } from "~/interfaces/video-node.interfaces"

interface RenderData {
  nodes: VideoNode[];
  medias: Media[]
}

export const useStartRender = () => {
  const startRender = async (data: RenderData) => {
    return $fetch('http://localhost:8000/api/videos/render', {
      method: 'post',
      body: data
    })
  }

  return startRender
}