export interface VirtualMedia {
  layer: number;
  getContent(): string;
  getName(): string;
  globalStartTime: number;
  duration: number
}