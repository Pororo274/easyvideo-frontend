import type { VirtualMedia } from "./virtual-media.interface";

export interface Media {
  file: File;
  objectURL: string;
  toVirtualMedia(): VirtualMedia
}