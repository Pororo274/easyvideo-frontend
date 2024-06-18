import type { Channel } from "laravel-echo";
import { SystemNotificationType } from "~/enums/notifications/system-notification-type.enum";
import type { ExportNotificattionData } from "~/interfaces/notifications/data/export-notification-data.interface";
import type { UserNotification } from "~/interfaces/notifications/user-notification.interface";

interface ExportOutput {
  projectId: number;
  link: string;
}

export const useExports = () => {
  const { $broadcast, $api } = useNuxtApp()
  const { updateUploadStatus } = useMediaUpload()
  const { user } = useUser()

  const exportsChannel = useState<Channel | null>("exportsChannel", () => null)
  const isSubscribed = useState("exportsNotificationSubscribed", () => false);
  const exports = useState<ExportOutput[]>("exports", () => [])


  const { pushUserNotification } = useAppNotification()

  onMounted(() => {
    if (exportsChannel.value) return
    exportsChannel.value = $broadcast().private(`users.${user.value.id}`).notification((notification: UserNotification<ExportNotificattionData>) => {
      pushUserNotification<ExportNotificattionData>({
        type: notification.type,
        id: notification.id,
        data: {
          link: notification.data.link
        },
        read_at: null
      })
      updateUploadStatus(false)
    }).subscribed(() => {
      isSubscribed.value = true
    })
  })

  return {
    exports: readonly(exports)
  }
}