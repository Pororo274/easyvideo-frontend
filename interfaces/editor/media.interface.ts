import type { MediaStatus } from "~/enums/media/media-status.interface";

export interface Media {
  uuid: string;
  originalName: string;
  type: string;
  status: MediaStatus;
  objectURL: string;
}