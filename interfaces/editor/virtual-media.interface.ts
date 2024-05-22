export interface VirtualMedia {
  readonly uuid: string;
  layer: number;
  globalStartTime: number;
  startTime: number;
  duration: number;
}