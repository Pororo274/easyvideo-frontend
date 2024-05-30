import type { SystemNotificationType } from "~/enums/notifications/system-notification-type.enum"

interface NotificatonIcon {
  type: ComputedRef<SystemNotificationType>
}

export const useNotificationIcon = () => {
  const { type } = inject('notificationIcon') as NotificatonIcon

  return {
    type
  }
}