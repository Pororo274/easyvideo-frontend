import type { MediaStatus } from "~/enums/media/media-status.interface";
import type { VirtualMedia } from "./virtual-media.interface";

export interface Media {
  uuid: string;
  file: File;
  status: MediaStatus;
  objectURL: string;
  toVirtualMedia(): VirtualMedia
}