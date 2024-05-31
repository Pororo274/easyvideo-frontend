import type { Size } from "../editor/size.interface";
import type { Filter } from "./filter.interface";

export interface ScaleFilter extends Filter
{
  size: Size;
}