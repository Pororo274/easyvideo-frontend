import type { VirtualMedia } from "./virtual-media.interface";

export interface VirtualVideo extends VirtualMedia {
  readonly originalDuration: number;
  readonly originalWidth: number;
  readonly originalHeight: number;
  readonly mediaUuid: string;
}