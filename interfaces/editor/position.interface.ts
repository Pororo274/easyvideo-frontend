import type { Coordinate } from "../coordinate/coordinate.interface";

export interface Position extends Coordinate {
  x: number;
  y: number;
}