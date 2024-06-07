import type { NotificationData } from "./data/notification-data.interface";

export interface UserNotification<T extends NotificationData = NotificationData> {
  type: string;
  id: string;
  data: T;
  read_at: string | null;
}