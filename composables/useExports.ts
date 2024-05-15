import type { Channel } from "laravel-echo";

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


  onMounted(() => {
    if (exportsChannel.value) return
    exportsChannel.value = $broadcast().private(`projects.${user.value.id}`).listen("RenderJobEndedEvent", (e: any) => {
      exports.value = [...exports.value, {
        projectId: e.dto.projectId,
        link: e.dto.link
      }]
      $api(e.dto.link, {
        method: 'get',
        responseType: 'blob'
      }).then((data: any) => {
        updateUploadStatus(false)
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "easyvideo.mp4");
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    }).subscribed(() => {
      isSubscribed.value = true
    })
  })

  return {
    exports: readonly(exports)
  }
}