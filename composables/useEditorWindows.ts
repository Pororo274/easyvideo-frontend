export const useEditorWindows = <T = unknown>() => {
  const currentWindow = useState("currentWindow", () => 'mediaWindow');
  const currentData = useState<T>("currentWindowData")

  return {
    currentWindow,
    currentData
  }
}