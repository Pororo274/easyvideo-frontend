export interface VideoNode {
  type: string;
  video: HTMLVideoElement;
  videoDuration: number;
  currentVideoDuration: number;
  videoStartWith: number;
  clientId: string;
}