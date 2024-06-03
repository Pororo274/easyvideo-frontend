import type { FilterName } from "~/enums/editor/filter-name.enum";
import type { Filter } from "../filters/filter.interface";
import type { ContentType } from "~/enums/virtual-media/content-type.enum";

export type FilterList = { [key in FilterName]?: Filter };

export interface VirtualMedia {
  readonly uuid: string;
  layer: number;
  contentType: ContentType;
  content: string;
  filters: FilterList
}