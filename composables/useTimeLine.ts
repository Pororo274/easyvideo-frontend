export const useTimeLine = () => {
  const timeLineWidth = useState<number>("timeLineWidth", () => 0)

  const updateTimeLineWidth = (newWidth: number) => {
    timeLineWidth.value = newWidth
  }

  return {
    updateTimeLineWidth,
    timeLineWidth: readonly(timeLineWidth)
  }
}