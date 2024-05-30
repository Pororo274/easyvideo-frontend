import type { SystemNotification } from "~/interfaces/notifications/system-notification.interface"

interface AppNotificationProvide {
  pushSystemNotification(notification: SystemNotification): void
}

export const useAppNotification = () => {
  const { pushSystemNotification } = inject('appNotification') as AppNotificationProvide

  return {
    pushSystemNotification
  }
}