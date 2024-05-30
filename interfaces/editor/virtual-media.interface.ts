import type { FilterName } from "~/enums/editor/filter-name.enum";
import type { Filter } from "../filters/filter.interface";

export interface VirtualMedia {
  readonly uuid: string;
  layer: number;
  globalStartTime: number;
  startTime: number;
  duration: number;
  filters: { [key in FilterName]?: Filter }
}