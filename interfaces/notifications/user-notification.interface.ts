export interface UserNotification<T = unknown> {
  type: string;
  id: string;
  data: T
}