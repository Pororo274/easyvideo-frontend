import type { VirtualMedia } from "./virtual-media.interface";

export interface VirtuaImage extends VirtualMedia {
  readonly objectURL: string;
}