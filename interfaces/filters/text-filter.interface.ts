import type { Filter } from "./filter.interface";

export interface TextFilter extends Filter {
  text: string;
  fontSize: number
}