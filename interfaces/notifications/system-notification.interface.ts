import type { SystemNotificationType } from "~/enums/notifications/system-notification-type.enum";

export interface SystemNotification {
  type: SystemNotificationType;
  message: string;
}