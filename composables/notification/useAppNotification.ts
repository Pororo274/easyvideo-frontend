import type { SystemNotification } from "~/interfaces/notifications/system-notification.interface"
import type { UserNotification } from "~/interfaces/notifications/user-notification.interface"

interface AppNotificationProvide<T = unknown> {
  pushSystemNotification(notification: SystemNotification): void
  pushUserNotification<T = unknown>(notification: UserNotification<T>): void
  readonly userNotifications: Ref<UserNotification<T>[]>
  markAsReadUserNotification(id: string): void
}

export const useAppNotification = <T = unknown>() => {
  const { pushSystemNotification, pushUserNotification, userNotifications, markAsReadUserNotification } = inject('appNotification') as AppNotificationProvide<T>

  return {
    pushSystemNotification,
    pushUserNotification,
    userNotifications,
    markAsReadUserNotification
  }
}