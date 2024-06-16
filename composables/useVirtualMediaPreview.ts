import type { VirtualMedia } from "~/interfaces/editor/virtual-media.interface";

interface VirtualMediaPreview {
  readonly isShow: Ref<boolean>,
  readonly currentTime: Ref<number>,
  readonly mediaPreviewStyle: Ref<any>,
  readonly virtualMedia: Ref<VirtualMedia>,
  readonly filterStyle: Ref<any>
}

export const useVirtualMediaPreview = () => {
  const { isShow, currentTime, mediaPreviewStyle, virtualMedia, filterStyle } = inject("virtualMediaPreview") as VirtualMediaPreview;

  return {
    isShow,
    currentTime,
    mediaPreviewStyle,
    virtualMedia,
    filterStyle
  }
}