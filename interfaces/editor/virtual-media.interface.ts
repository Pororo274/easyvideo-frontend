export interface VirtualMedia {
  readonly id: string;
  layer: number;
  content: string;
  globalStartTime: number;
  startTime: number;
  duration: number;
  name: string;
}