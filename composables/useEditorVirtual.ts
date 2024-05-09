import { v4 } from "uuid";
import type { Media } from "~/interfaces/editor/media.interface";

interface VirtualEntity {
  readonly id: string;
  layer: number;
  globalStartTime: number;
  duration: number;
  getName(): string
  readonly content: string;
}

interface VirtualImage extends VirtualEntity {}
interface VirtualVideo extends VirtualEntity {
  readonly originalDuration: number;
}

export const useEditorVirtual = () => {
  const virtualEntities = useState<VirtualEntity[]>("virtualEntities", () => []);

  const addVirtualVideoAfterLoad = (media: Media) => {
    const video = document.createElement('video')
    video.addEventListener('loadedmetadata', () => {
      const id = v4();

      (virtualEntities.value as VirtualVideo[]).push({
        id,
        getName() {
          return media.file.name
        },
        content: media.objectURL, 
        layer: 1,
        globalStartTime: 0,
        duration: 0,
        originalDuration: video.duration
      });
    })

    video.src = media.objectURL
  }

  const addVirtualVideo = (media: Media) => {
    addVirtualVideoAfterLoad(media)
  }

  return {
    addVirtualVideo,
    virtualEntities: readonly(virtualEntities)
  }
}