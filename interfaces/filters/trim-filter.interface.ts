import type { Time } from "../coordinate/time.interface";
import type { Filter } from "./filter.interface";

export interface TrimFilter extends Filter {
  time: Time
}