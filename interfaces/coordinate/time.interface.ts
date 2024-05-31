import type { Coordinate } from "./coordinate.interface";

export interface Time extends Coordinate {
  startFrom: number;
  duration: number;
  delay: number;
}