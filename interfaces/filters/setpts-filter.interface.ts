import type { Time } from "../coordinate/time.interface";
import type { Filter } from "./filter.interface";

export interface SetptsFilter extends Filter {
  time: Time;
}