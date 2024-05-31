import type { Time } from "../coordinate/time.interface";
import type { Position } from "../editor/position.interface";
import type { Filter } from "./filter.interface";

export interface OverlayFilter extends Filter
{
  position: Position;
  time: Time
}