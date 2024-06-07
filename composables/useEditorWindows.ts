export const useEditorWindows = <T = unknown>() => {
  const currentWindow = useState("currentWindow", () => 'mediaWindow');
  const currentData = useState<T>("currentWindowData")
  const { virtualMedias } = useVirtualMedias()

  const selectedVirtualMedia = computed(() => {
    if (typeof currentData.value !== 'string') return

    return virtualMedias.value.find((media) => media.uuid === currentData.value)
  })

  return {
    currentWindow,
    currentData,
    selectedVirtualMedia
  }
}