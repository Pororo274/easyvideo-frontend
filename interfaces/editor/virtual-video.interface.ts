import type { Position } from "./position.interface";
import type { Size } from "./size.interface";
import type { VirtualMedia } from "./virtual-media.interface";

export interface VirtualVideo extends VirtualMedia {
  readonly originalDuration: number;
  readonly originalWidth: number;
  readonly originalHeight: number;
  readonly mediaUuid: string;
  position: Position;
  size: Size;
}