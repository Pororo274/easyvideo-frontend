export const usePreviewWindow = () => {
  const windowWidth = useState(() => 0)
  const windowHeight = useState(() => 0)
  const resize = (newWidth: number, newHeight: number) => {
    windowWidth.value = newWidth
    windowHeight.value = newHeight
  }

  return {
    windowHeight: readonly(windowHeight),
    windowWidth: readonly(windowWidth),
    resize
  }
}