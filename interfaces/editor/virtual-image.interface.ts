import type { VirtualMedia } from "./virtual-media.interface";

export interface VirtualImage extends VirtualMedia {
  readonly objectURL: string;
}