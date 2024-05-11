export interface VirtualMedia {
  id: string;
  layer: number;
  getContent(): string;
  getName(): string;
  globalStartTime: number;
  startTime: number;
  duration: number;
}