import type { Channel } from "laravel-echo";

interface ExportOutput {
  projectId: number;
  link: string;
}

export const useExports = () => {
  const { $broadcast } = useNuxtApp()
  const { user } = useUser()

  const exportsChannel = useState<Channel | null>("exportsChannel", () => null)
  const isSubscribed = useState("exportsNotificationSubscribed", () => false);
  const exports = useState<ExportOutput[]>("exports", () => [])


  onMounted(() => {
    if (!exportsChannel.value) return
    exportsChannel.value = $broadcast().private(`projects.${user.value.id}`).listen("RenderJobEndedEvent", (e: any) => {
      exports.value = [...exports.value, {
        projectId: e.dto.projectId,
        link: e.dto.path
      }]
    }).subscribed(() => {
      isSubscribed.value = true
    })
  })

  return {
    exports: readonly(exports)
  }
}