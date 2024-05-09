import type { VirtualMedia } from "./virtual-media.interface";

export interface VirtualVideo extends VirtualMedia {
  readonly objectURL: string;
  readonly originalDuration: number;
}