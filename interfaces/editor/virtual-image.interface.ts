import type { VirtualMedia } from "./virtual-media.interface";

export interface VirtualImage extends VirtualMedia {
  readonly originalWidth: number;
  readonly originalHeight: number;
  readonly mediaUuid: string;
}